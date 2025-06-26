import { Home } from 'lucide-react'
import { NavLink } from 'react-router'

export default function NotFound () {
  return (
    <main className='flex h-dvh items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-amber-50 p-4'>
      <div className='mx-auto max-w-2xl text-center'>

        <div className='mb-8'>
          <h1
            className={`
              bg-gradient-to-r from-blue-900 to-amber-500 bg-clip-text text-9xl leading-none font-black text-transparent
              md:text-[12rem]
            `}
          >
            404
          </h1>
        </div>

        <div
          className={`
            mb-8 rounded-2xl border border-white/20 bg-white/60 p-8 shadow-lg backdrop-blur-sm
            md:p-12
          `}
        >
          <h2
            className={`
              mb-4 text-3xl font-bold text-gray-800
              md:text-4xl
            `}
          >
            ¡Oops! Página no encontrada
          </h2>

          <p className='mb-8 text-lg leading-relaxed text-gray-600'>
            La página que estás buscando no existe o ha sido movida. No te
            preocupes, esto le pasa a los mejores exploradores digitales.
          </p>

          <div className='inline-flex items-center'>
            <NavLink
              to='/'
              className={`
                flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-blue-900 to-blue-800 px-8 py-3 font-medium text-white shadow-md transition-all duration-200
                hover:from-blue-800 hover:to-blue-700 hover:shadow-lg
              `}
            >
              <Home className='h-5 w-5' />
              <span>Ir al inicio</span>
            </NavLink>
          </div>
        </div>
      </div>
    </main>
  )
}
