import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function GET() {
  const state = crypto.randomUUID();
  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);

  const cookieStore = cookies();

  cookieStore.set("deriv_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });

  cookieStore.set("deriv_code_verifier", verifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });

  const params = new URLSearchParams({
    client_id: process.env.DERIV_CLIENT_ID!,
    response_type: "code",
    redirect_uri: process.env.DERIV_REDIRECT_URI!,
    scope: "openid profile",
    state,
    code_challenge: challenge,
    code_challenge_method: "S256",
  });

  const authUrl = `https://oauth.deriv.com/oauth2/authorize?${params.toString()}`;

  return NextResponse.redirect(authUrl);
}

function generateCodeVerifier() {
  return base64UrlEncode(crypto.randomBytes(32));
}

async function generateCodeChallenge(verifier: string) {
  const digest = crypto.createHash("sha256").update(verifier).digest();
  return base64UrlEncode(digest);
}

function base64UrlEncode(value: Buffer) {
  return value
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}
