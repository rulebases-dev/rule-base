"use server";

import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users, verificationTokens } from "@/lib/db/schema";
import { signUpSchema, resetPasswordSchema, type SignUpInput } from "@/lib/validators/auth";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { sendVerificationEmail, sendPasswordResetEmail, getPasswordResetIdentifier } from "@/lib/email";

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
    emailVerified: null,
  });

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await db.delete(verificationTokens).where(eq(verificationTokens.identifier, email));
  await db.insert(verificationTokens).values({
    identifier: email,
    token,
    expires,
  });

  const emailResult = await sendVerificationEmail(email, token);
  if (!emailResult.ok) {
    return { error: { _form: ["Failed to send verification email. Please try again."] } };
  }

  return { success: true };
}

export async function verifyEmailToken(token: string, email: string) {
  const record = await db.query.verificationTokens.findFirst({
    where: and(
      eq(verificationTokens.identifier, email),
      eq(verificationTokens.token, token)
    ),
  });

  if (!record || new Date() > record.expires) {
    return { error: "Invalid or expired link" };
  }

  await db
    .update(users)
    .set({ emailVerified: new Date() })
    .where(eq(users.email, email));

  await db
    .delete(verificationTokens)
    .where(
      and(
        eq(verificationTokens.identifier, email),
        eq(verificationTokens.token, token)
      )
    );

  return { success: true };
}

export async function resendVerificationEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
    columns: { emailVerified: true },
  });

  if (!user) {
    return { error: "User not found" };
  }
  if (user.emailVerified) {
    return { error: "Email already verified" };
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await db.delete(verificationTokens).where(eq(verificationTokens.identifier, email));
  await db.insert(verificationTokens).values({
    identifier: email,
    token,
    expires,
  });

  const result = await sendVerificationEmail(email, token);
  if (!result.ok) {
    return { error: "Failed to send email" };
  }
  return { success: true };
}

export async function requestPasswordReset(email: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
    columns: { id: true },
  });

  if (!user) {
    return { error: "No account found with this email" };
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 60 * 60 * 1000);
  const identifier = getPasswordResetIdentifier(email);

  await db.delete(verificationTokens).where(eq(verificationTokens.identifier, identifier));
  await db.insert(verificationTokens).values({
    identifier,
    token,
    expires,
  });

  const result = await sendPasswordResetEmail(email, token);
  if (!result.ok) {
    return { error: "Failed to send email" };
  }
  return { success: true };
}

export async function validateResetToken(token: string, email: string) {
  const identifier = getPasswordResetIdentifier(email);
  const record = await db.query.verificationTokens.findFirst({
    where: and(
      eq(verificationTokens.identifier, identifier),
      eq(verificationTokens.token, token)
    ),
    columns: { expires: true },
  });
  if (!record || new Date() > record.expires) {
    return { valid: false };
  }
  return { valid: true };
}

export async function resetPassword(token: string, email: string, password: string) {
  const parsed = resetPasswordSchema.safeParse({ password });
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors.password?.[0] ?? "Invalid password" };
  }

  const identifier = getPasswordResetIdentifier(email);
  const record = await db.query.verificationTokens.findFirst({
    where: and(
      eq(verificationTokens.identifier, identifier),
      eq(verificationTokens.token, token)
    ),
  });

  if (!record || new Date() > record.expires) {
    return { error: "Invalid or expired link" };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  await db
    .update(users)
    .set({
      passwordHash,
      emailVerified: new Date(),
    })
    .where(eq(users.email, email));

  await db
    .delete(verificationTokens)
    .where(
      and(
        eq(verificationTokens.identifier, identifier),
        eq(verificationTokens.token, token)
      )
    );

  return { success: true };
}
