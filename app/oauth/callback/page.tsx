"use client";

import { useEffect, useState } from "react";

export default function OAuthCallbackPage() {
  const [status, setStatus] = useState("Autenticando...");

  useEffect(() => {
    async function handleCallback() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state");

      if (!code) {
        setStatus("Erro: código de autorização não retornado.");
        return;
      }

      const codeVerifier = sessionStorage.getItem("deriv_code_verifier");

      if (!codeVerifier) {
        setStatus("Erro: verifier não encontrado.");
        return;
      }

      try {
        const response = await fetch("https://oauth.deriv.com/oauth2/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: "SEU_CLIENT_ID",
            code,
            redirect_uri: "https://seuapp.com/oauth/callback",
            code_verifier: codeVerifier,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          console.error(data);
          setStatus("Falha ao trocar código por token.");
          return;
        }

        console.log("Token recebido:", data);

        // ex.: salvar em cookie/localStorage ou enviar para backend
        localStorage.setItem("deriv_access_token", data.access_token);

        setStatus("Autenticado com sucesso!");
      } catch (error) {
        console.error(error);
        setStatus("Erro ao processar autenticação.");
      }
    }

    handleCallback();
  }, []);

  return <div>{status}</div>;
}
