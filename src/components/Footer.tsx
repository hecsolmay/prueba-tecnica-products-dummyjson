import GitHub from '@/components/icons/Github'
import LinkedIn from '@/components/icons/Linkedin'
import { socials } from '@/constants/socials'

export default function Footer () {
  return (
    <footer className='mt-auto border-t border-gray-200 bg-white/80 py-8 backdrop-blur-sm'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='flex flex-col items-center space-y-6'>
          <div className='flex space-x-8'>
            <a
              href={socials.github}
              target='_blank'
              rel='noopener noreferrer'
              className={`
                group flex items-center space-x-2 transition-all duration-200
                hover:text-blue-600
              `}
            >
              <GitHub
                className={`
                  size-5 bg-[#191919] transition-transform duration-200
                  group-hover:scale-110
                `}
              />
              <span className='text-sm font-medium'>GitHub</span>
            </a>
            <a
              href={socials.linkedin}
              target='_blank'
              rel='noopener noreferrer'
              className={`
                group flex items-center space-x-2 transition-all duration-200
                hover:text-blue-400
              `}
            >
              <LinkedIn
                className={`
                  size-5 transition-transform duration-200
                  group-hover:scale-110
                `}
              />
              <span className='text-sm font-medium'>Linkedin</span>
            </a>
          </div>

          {/* Línea divisoria */}
          <div className='h-px w-24 bg-gradient-to-r from-blue-900 to-amber-500' />

          {/* Copyright */}
          <p className='text-center text-sm text-gray-500'>
            © 2025 Prueba Técnica Productos. Ningún derecho reservado.
          </p>
        </div>
      </div>
    </footer>
  )
}
