import type { LoginResponse } from '@/types/response'

export class AuthService {
  static async login (credentials: {
    username: string
    password: string
  }): Promise<LoginResponse> {
    const res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })

    if (!res.ok) throw new Error('Credenciales inválidas')

    const data = await res.json()
    return data
  }
}
