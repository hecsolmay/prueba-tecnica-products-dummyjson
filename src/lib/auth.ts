import type { User } from '@/types/user'

export function getUser (): User | null {
  const user = localStorage.getItem('user')

  if (!user) {
    return null
  }

  // TODO: validar el formato del objeto
  return JSON.parse(user)
}
