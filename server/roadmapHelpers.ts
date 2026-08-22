const ALLOWED_UPLOAD_TYPES = new Set([
  "application/json",
  "application/pdf",
  "application/zip",
  "text/markdown",
  "text/plain",
]);

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

export function sanitizeUploadFilename(filename: string): string {
  const safe = filename.trim().replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
  return safe.slice(0, 180) || "roadmap-resource";
}

export function isAllowedUpload(contentType: string, sizeBytes: number): boolean {
  return ALLOWED_UPLOAD_TYPES.has(contentType) && sizeBytes > 0 && sizeBytes <= MAX_UPLOAD_BYTES;
}
