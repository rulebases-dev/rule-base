import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { createCheckoutUrl } from "@/lib/lemonsqueezy/helpers";

export async function POST() {
  const session = await auth();

  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = await createCheckoutUrl(session.user.id, session.user.email);
    return NextResponse.json({ url });
  } catch {
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 },
    );
  }
}
