import { NavLink } from 'react-router'
import UserDropdown from './UserDropdown'

export default function Navbar () {
  return (
    <nav className='sticky top-0 z-40 border-b border-gray-200 bg-white/80 px-4 py-3 backdrop-blur-sm'>
      <div className='mx-auto flex max-w-7xl items-center justify-between'>
        {/* Logo y nombre */}
        <div className='flex items-center space-x-3'>
          <NavLink to='/'>
            <img src='/assets/images/app-logo.webp' alt='Logo' className='h-10 w-14 rounded-lg object-cover' />
          </NavLink>
          <span className='bg-gradient-to-r from-blue-900 to-amber-500 bg-clip-text text-xl font-bold text-transparent'>
            Productos Dummy
          </span>
        </div>

        <UserDropdown />
      </div>
    </nav>
  )
}
