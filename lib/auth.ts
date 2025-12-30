// Simple authentication utilities
// In production, use proper authentication (NextAuth.js, etc.)

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123' // Change this in production!

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD
}

export function isAuthenticated(request: Request): boolean {
  const cookieHeader = request.headers.get('cookie')
  if (!cookieHeader) return false
  
  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=')
    acc[key] = value
    return acc
  }, {} as Record<string, string>)
  
  return cookies['admin-auth'] === 'true'
}

