import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secretKey = process.env.JWT_SECRET || 'super-secret-steel-key-2026'
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(key)
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  })
  return payload
}

export async function setAdminSession(user: { id: string, email: string, role: string }) {
  // Await cookies() in Next.js 15+
  const cookieStore = await cookies();
  
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const session = await encrypt({ user, expires })

  cookieStore.set('admin_session', session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session')?.value
  if (!session) return null
  
  try {
    return await decrypt(session)
  } catch (error) {
    return null
  }
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set('admin_session', '', {
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
}
