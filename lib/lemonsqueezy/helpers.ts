import {
  createCheckout,
  getSubscription,
  updateSubscription,
  type NewCheckout,
} from "@lemonsqueezy/lemonsqueezy.js";
import { eq } from "drizzle-orm";

import { configureLemonSqueezy } from "@/lib/lemonsqueezy";
import { db } from "@/lib/db";
import { users, subscriptions } from "@/lib/db/schema";

export async function createCheckoutUrl(userId: string, email: string) {
  configureLemonSqueezy();

  const storeId = process.env.LEMON_SQUEEZY_STORE_ID!;
  const variantId = process.env.LEMON_SQUEEZY_PRO_VARIANT_ID!;

  const checkout: NewCheckout = {
    productOptions: {
      redirectUrl: `${process.env.AUTH_URL}/dashboard`,
    },
    checkoutData: {
      email,
      custom: {
        userId,
      },
    },
  };

  const { data, error } = await createCheckout(storeId, variantId, checkout);

  if (error) throw new Error("Failed to create checkout");

  return data?.data.attributes.url;
}

export async function getSubscriptionUrls(subscriptionId: string) {
  configureLemonSqueezy();

  const { data, error } = await getSubscription(subscriptionId);
  if (error) throw new Error("Failed to get subscription");

  const attrs = data?.data.attributes;
  return {
    updatePaymentMethod: attrs?.urls.update_payment_method,
    customerPortal: attrs?.urls.customer_portal,
  };
}

export async function cancelSubscription(subscriptionId: string) {
  configureLemonSqueezy();

  const { error } = await updateSubscription(subscriptionId, {
    cancelled: true,
  });
  if (error) throw new Error("Failed to cancel subscription");
}

export async function resumeSubscription(subscriptionId: string) {
  configureLemonSqueezy();

  const { error } = await updateSubscription(subscriptionId, {
    cancelled: false,
  });
  if (error) throw new Error("Failed to resume subscription");
}
