import LoginForm from '@/components/login/LoginForm'
import { LockKeyhole } from 'lucide-react'

export default function LoginPage () {
  return (
    <main
      className='flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-amber-50 p-4'
    >
      <div className='relative w-full max-w-md'>
        {/* Login Card */}
        <div
          className='rounded-2xl border border-white/20 bg-white/70 p-8 shadow-2xl backdrop-blur-lg'
        >
          {/* Header */}
          <div className='mb-8 text-center'>
            <div
              className='mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-900 to-amber-500'
            >
              <LockKeyhole className='size-7 text-white' />
            </div>
            <h1 className='mb-2 text-3xl font-bold text-slate-800'>
              Bienvenido
            </h1>
            <p className='text-slate-600'>Inicia sesión en tu cuenta</p>
          </div>

          {/* Login Form */}
          <LoginForm />
        </div>

        {/* Decorative elements */}
        <div
          className='absolute top-4 left-4 -z-10 h-72 w-72 rounded-full bg-gradient-to-r from-blue-900/20 to-amber-500/20 blur-3xl'
        />
      </div>
    </main>
  )
}
