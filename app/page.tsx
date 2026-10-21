"use client";

export default function LoginPage() {
  async function loginWithDeriv() {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    sessionStorage.setItem("deriv_code_verifier", codeVerifier);

    const params = new URLSearchParams({
      client_id: "SEU_CLIENT_ID",
      response_type: "code",
      redirect_uri: "https://seuapp.com/oauth/callback",
      scope: "openid profile",
      state: crypto.randomUUID(),
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    });

    const authUrl = `https://oauth.deriv.com/oauth2/authorize?${params.toString()}`;

    window.location.href = authUrl;
  }

  return (
    <button onClick={loginWithDeriv}>
      Entrar com Deriv
    </button>
  );
}

function generateCodeVerifier() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);

  return base64UrlEncode(array);
}

function base64UrlEncode(value: Uint8Array | ArrayBuffer) {
  const bytes = value instanceof Uint8Array ? value : new Uint8Array(value);

  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

async function generateCodeChallenge(verifier: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);

  const digest = await crypto.subtle.digest("SHA-256", data);

  return base64UrlEncode(digest);
}
