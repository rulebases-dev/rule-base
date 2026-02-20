import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { getSubscriptionUrls } from "@/lib/lemonsqueezy/helpers";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { subscriptionId } = await req.json();
    const urls = await getSubscriptionUrls(subscriptionId);
    return NextResponse.json({ url: urls.customerPortal });
  } catch {
    return NextResponse.json(
      { error: "Failed to get portal URL" },
      { status: 500 },
    );
  }
}
