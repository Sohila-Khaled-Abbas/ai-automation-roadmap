const MANAGED_PUBLIC_API_ORIGIN = "https://airoadmap-yzczrdqq.manus.space";

export function resolvePublicApiUrl(origin: string): string {
  try {
    const hostname = new URL(origin).hostname;
    if (hostname === "ai-automation-roadmap-psi.vercel.app" || hostname.endsWith("-sohila-khaled-abbas-projects.vercel.app")) {
      return `${MANAGED_PUBLIC_API_ORIGIN}/api/trpc`;
    }
  } catch {
    // Keep same-origin routing for malformed or non-browser origins.
  }

  return "/api/trpc";
}

export function shouldOmitCredentials(apiUrl: string): boolean {
  return apiUrl.startsWith("https://");
}
