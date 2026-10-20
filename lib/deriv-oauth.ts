export const DERIV_APP_ID = process.env.NEXT_PUBLIC_DERIV_APP_ID ?? '1089'
export const DERIV_REDIRECT_URI =
  process.env.NEXT_PUBLIC_DERIV_REDIRECT_URI ?? 'http://localhost:3000/oauth/callback'

const OAUTH_STATE_KEY = 'deriv_oauth_state'
const DERIV_TOKEN_KEY = 'deriv_api_token'

export function getStoredDerivToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(DERIV_TOKEN_KEY)
}

export function saveDerivToken(token: string) {
  if (typeof window === 'undefined') return
  localStorage.setItem(DERIV_TOKEN_KEY, token.trim())
}

export function clearDerivToken() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(DERIV_TOKEN_KEY)
}

export function buildDerivOAuthUrl() {
  const state = crypto.randomUUID()

  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem(OAUTH_STATE_KEY, state)
  }

  const params = new URLSearchParams({
    app_id: DERIV_APP_ID,
    redirect_uri: DERIV_REDIRECT_URI,
    scope: 'read',
    state,
  })

  return `https://oauth.deriv.com/oauth2/authorize?${params.toString()}`
}

export function validateDerivOAuthState(state: string | null) {
  if (typeof window === 'undefined') return false

  const stored = window.sessionStorage.getItem(OAUTH_STATE_KEY)
  const valid = Boolean(state && stored && state === stored)

  if (valid) {
    window.sessionStorage.removeItem(OAUTH_STATE_KEY)
  }

  return valid
}

export function readDerivTokenFromSearch(search: string) {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
  const token = params.get('token1') ?? params.get('token') ?? params.get('access_token')

  return token ? token.trim() : null
}
