const conectarDeriv = () => {
  // LINK CERTO DO OAUTH - ESSE VOLTA
  window.location.href = `https://oauth.deriv.com/oauth2/authorize?app_id=${APP_ID}&l=pt&brand=deriv`
}

const criarConta = () => {
  // LINK DE AFILIADO - ESSE NÃO VOLTA, SÓ CADASTRA
  window.location.href = `https://deriv.com/pt?app_id=${APP_ID}`
}
