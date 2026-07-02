import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const protectedRoutes = ['/dashboard', '/data', '/ask-ai', '/integrations']
const authRoutes = ['/login', '/signup']

export function useAuthGuard() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

    // If authenticated and trying to access auth routes, redirect to dashboard
    if (isAuthenticated && authRoutes.includes(pathname)) {
      router.replace('/dashboard')
      return
    }

    // If not authenticated and trying to access protected routes, redirect to login
    if (!isAuthenticated && protectedRoutes.some(route => pathname.startsWith(route))) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`)
      return
    }
  }, [pathname, router])
}
