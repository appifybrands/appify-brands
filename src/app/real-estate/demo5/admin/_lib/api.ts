export const API_BASE =
  process.env.NEXT_PUBLIC_DEMO5_API_BASE ||
  "http://localhost:3001/real-estate/demo5/api";

export interface ApiResult<T> {
  success: boolean;
  data: T;
  error?: string;
  details?: unknown;
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...options,
  });

  let json: ApiResult<T> | null = null;
  try {
    json = (await res.json()) as ApiResult<T>;
  } catch {
    /* non-json response */
  }

  if (!res.ok || (json && json.success === false)) {
    const message = json?.error || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return (json?.data as T) ?? (null as T);
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body ?? {}) }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body ?? {}) }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body ?? {}) }),
  del: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};

/** Uploads an image file and returns its public URL. */
export async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${API_BASE}/uploads`, {
    method: "POST",
    credentials: "include",
    body: form,
  });

  let json: ApiResult<{ url: string }> | null = null;
  try {
    json = (await res.json()) as ApiResult<{ url: string }>;
  } catch {
    /* non-json response */
  }

  if (!res.ok || (json && json.success === false)) {
    throw new Error(json?.error || `Upload failed (${res.status})`);
  }
  return json?.data?.url ?? "";
}
