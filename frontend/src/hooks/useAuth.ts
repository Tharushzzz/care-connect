import { useState, useEffect } from 'react'

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true'
  })

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true')
    }

    window.addEventListener('storage', handleAuthChange)
    window.addEventListener('authChange', handleAuthChange)

    return () => {
      window.removeEventListener('storage', handleAuthChange)
      window.removeEventListener('authChange', handleAuthChange)
    }
  }, [])

  const login = () => {
    localStorage.setItem('isLoggedIn', 'true')
    setIsLoggedIn(true)
    window.dispatchEvent(new Event('authChange'))
  }

  const logout = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
    window.dispatchEvent(new Event('authChange'))
  }

  return { isLoggedIn, login, logout }
}
