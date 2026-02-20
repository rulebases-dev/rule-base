import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

export function configureLemonSqueezy() {
  lemonSqueezySetup({
    apiKey: process.env.LEMON_SQUEEZY_API_KEY!,
    onError(error) {
      throw new Error(`LemonSqueezy API error: ${error.message}`);
    },
  });
}
