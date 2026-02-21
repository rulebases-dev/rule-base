"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { signUpSchema, type SignUpInput } from "@/lib/validators/auth";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function registerUser(
  input: SignUpInput,
  turnstileToken?: string
) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (secret) {
    if (!turnstileToken) {
      return { error: { _form: ["Please complete the verification."] } };
    }
    if (!(await verifyTurnstileToken(turnstileToken))) {
      return { error: { _form: ["Verification failed. Please try again."] } };
    }
  }

  const parsed = signUpSchema.safeParse(input);

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const { name, email, password } = parsed.data;

  const existing = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existing) {
    return { error: { email: ["An account with this email already exists"] } };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await db.insert(users).values({
    name,
    email,
    passwordHash,
  });

  return { success: true };
}
