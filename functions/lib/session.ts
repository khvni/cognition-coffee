const SESSION_TTL_SECONDS = 86400

const b64url = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")

async function hmac(message: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message))
  return b64url(new Uint8Array(sig))
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function createAdminSession(secret: string): Promise<string> {
  const nonce = b64url(crypto.getRandomValues(new Uint8Array(24)))
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  const sig = await hmac(`${nonce}.${exp}`, secret)
  return `${nonce}.${exp}.${sig}`
}

export async function verifyAdminSession(value: string, secret: string): Promise<boolean> {
  const [nonce, exp, sig] = value.split(".")
  if (!nonce || !exp || !sig || !/^\d+$/.test(exp)) return false
  if (Number(exp) < Math.floor(Date.now() / 1000)) return false
  return timingSafeEqual(sig, await hmac(`${nonce}.${exp}`, secret))
}
