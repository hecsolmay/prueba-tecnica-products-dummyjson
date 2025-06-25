import type { User } from '@/types/user'

const USER_LOCAL_STORAGE_KEY = 'user'

export function getUser (): User | null {
  const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY)

  if (!user) {
    return null
  }

  // Para mejoras en el futuro se validará el formato del objeto
  return JSON.parse(user)
}

export function saveLocalStorageUser (user: User) {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user))
}

export function removeLocalStorageUser () {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY)
}
