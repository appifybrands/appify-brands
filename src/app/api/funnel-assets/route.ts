import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const logosDir = path.join(process.cwd(), "public", "client_logos");
    const webAppDir = path.join(process.cwd(), "public", "client_web_app_images");

    const isImage = (filename: string) =>
      /\.(png|jpe?g|webp|svg|gif|avif)$/i.test(filename) && !filename.startsWith(".");

    let logos: { url: string; name: string }[] = [];
    let webApps: { url: string; name: string }[] = [];

    if (fs.existsSync(logosDir)) {
      logos = fs
        .readdirSync(logosDir)
        .filter(isImage)
        .map((filename) => ({
          url: `/client_logos/${encodeURI(filename)}`,
          name: filename.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " "),
        }));
    }

    if (fs.existsSync(webAppDir)) {
      webApps = fs
        .readdirSync(webAppDir)
        .filter(isImage)
        .map((filename) => ({
          url: `/client_web_app_images/${encodeURI(filename)}`,
          name: filename.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " "),
        }));
    }

    return NextResponse.json({
      success: true,
      logos,
      webApps,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Error fetching funnel assets:", error);
    return NextResponse.json(
      {
        success: false,
        logos: [],
        webApps: [],
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
