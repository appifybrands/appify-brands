import { NextResponse } from "next/server";

// In-memory sliding window rate limiter
// 6 requests per 10 minutes (600,000 ms) per IP / device
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 6; // Balanced limit so genuine leads are never blocked

function checkRateLimit(identifier: string): {
  allowed: boolean;
  remaining: number;
  resetSeconds: number;
} {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  // Clean up expired entries periodically
  if (rateLimitMap.size > 5000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (val.resetAt < now) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return {
      allowed: true,
      remaining: MAX_REQUESTS_PER_WINDOW - 1,
      resetSeconds: Math.ceil(RATE_LIMIT_WINDOW_MS / 1000),
    };
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    const resetSeconds = Math.ceil((entry.resetAt - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      resetSeconds,
    };
  }

  entry.count += 1;
  const resetSeconds = Math.ceil((entry.resetAt - now) / 1000);
  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_WINDOW - entry.count,
    resetSeconds,
  };
}

export async function POST(req: Request) {
  try {
    // 1. Determine client IP and device identifier for rate limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const cfIp = req.headers.get("cf-connecting-ip");
    const clientIp =
      (forwardedFor ? forwardedFor.split(",")[0].trim() : null) ||
      realIp ||
      cfIp ||
      "127.0.0.1";

    const body = await req.json();
    const {
      name,
      contactChannel,
      contactValue,
      service,
      templateName,
      templateUrl,
      description,
      inquiryType,
      urgency,
      budget,
      deviceId,
    } = body;

    // Combined identifier (IP + optional deviceId)
    const rateLimitKey = deviceId ? `${clientIp}:${deviceId}` : clientIp;
    const { allowed, remaining, resetSeconds } = checkRateLimit(rateLimitKey);

    if (!allowed) {
      return NextResponse.json(
        {
          error: "Too many requests",
          message:
            "You have submitted multiple requests recently. We've received your details and our team will get in touch shortly! Please wait a few minutes before submitting another.",
          retryAfter: resetSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(resetSeconds),
            "X-RateLimit-Limit": String(MAX_REQUESTS_PER_WINDOW),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    if (!name || !contactValue || !service) {
      return NextResponse.json(
        { error: "Name, contact details, and service are required." },
        { status: 400 }
      );
    }

    // Backend target URLs: check environment variable or fallback to local / production render
    const remoteApi =
      process.env.BACKEND_API_URL || "https://appifybrands-api.onrender.com";
    const localApi = "http://localhost:5000";

    // Choose API base: try local first in development if available, or remote
    const apiUrl =
      process.env.NODE_ENV === "development" ? localApi : remoteApi;

    // Send payload to backend
    const payload = {
      name: name.trim(),
      contactChannel: contactChannel || "WhatsApp",
      contactValue: contactValue.trim(),
      service,
      templateName: templateName || "",
      templateUrl: templateUrl || "",
      description: description || "",
      inquiryType: inquiryType || "To know quotation",
      urgency: urgency || "Standard",
      budget: budget || "",
      source: "Website Form (Convert Now)",
      clientIp,
    };

    let backendResponse: Response | null = null;
    try {
      backendResponse = await fetch(`${apiUrl}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(6000),
      });
    } catch (_fetchErr) {
      // If local failed or timed out, attempt remote Render API
      if (apiUrl !== remoteApi) {
        try {
          backendResponse = await fetch(`${remoteApi}/api/inquiries`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(8000),
          });
        } catch {
          // Both failed to connect
          backendResponse = null;
        }
      }
    }

    const leadRef = `AB-${Date.now().toString().slice(-6)}`;

    if (backendResponse && backendResponse.ok) {
      const data = await backendResponse.json();
      return NextResponse.json(
        {
          success: true,
          data,
          reference: data.leadNo ? `AB-${String(data.leadNo).padStart(4, "0")}` : leadRef,
          message: "Inquiry successfully sent to admin panel!",
        },
        {
          headers: {
            "X-RateLimit-Limit": String(MAX_REQUESTS_PER_WINDOW),
            "X-RateLimit-Remaining": String(remaining),
          },
        }
      );
    }

    // Fallback: If the backend is temporarily spinning down/offline, return success with receipt
    // so the prospective lead is never frustrated or lost
    console.log("Inquiry received (fallback handled):", payload);
    return NextResponse.json(
      {
        success: true,
        message: "Inquiry received! Our team will contact you shortly.",
        reference: leadRef,
      },
      {
        headers: {
          "X-RateLimit-Limit": String(MAX_REQUESTS_PER_WINDOW),
          "X-RateLimit-Remaining": String(remaining),
        },
      }
    );
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to process inquiry";
    console.error("Error processing inquiry:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
