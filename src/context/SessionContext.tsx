import { createContext, useContext, useState, useEffect } from 'react'
import { getUser, saveLocalStorageUser, removeLocalStorageUser } from '@/lib/auth'
import type { User } from '@/types/user'
import { AuthService } from '@/services/auth'

interface SessionContextProps {
  user: User | null
  login: (credentials: { username: string; password: string }) => Promise<void>
  logout: () => void
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined)

export function SessionProvider ({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(getUser())

  useEffect(() => {
    const stored = getUser()
    if (stored) setUserState(stored)
  }, [])

  const login = async (credentials: { username: string; password: string }) => {
    const data = await AuthService.login(credentials)
    // Para mejoras en el futuro se guarda el token y se actualizaría cuando expire
    saveLocalStorageUser(data)
    setUserState(data)
  }

  const logout = () => {
    removeLocalStorageUser()
    setUserState(null)
  }

  return (
    <SessionContext.Provider value={{ user, login, logout }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSessionContext () {
  const context = useContext(SessionContext)
  if (!context) throw new Error('useSessionContext debe usarse dentro del SessionProvider')
  return context
}
