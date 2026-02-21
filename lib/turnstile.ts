"use server";

export async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn("TURNSTILE_SECRET_KEY not set, skipping verification");
    return true; // Allow in dev when not configured
  }

  if (!token || typeof token !== "string") {
    return false;
  }

  try {
    const formData = new FormData();
    formData.append("secret", secret);
    formData.append("response", token);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = (await res.json()) as {
      success?: boolean;
      "error-codes"?: string[];
    };

    return data.success === true;
  } catch {
    return false;
  }
}
