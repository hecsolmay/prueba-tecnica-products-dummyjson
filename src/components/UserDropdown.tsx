import { useState, useRef, useEffect } from 'react'
import { ChevronDown, LogOut } from 'lucide-react'
import useSession from '@/hooks/useSession'
import { useNavigate } from 'react-router'

export default function UserDropdown () {
  const navigate = useNavigate()
  const { user, logout } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside (event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleLogoutClick = () => {
    setIsOpen(false)
    logout()
    navigate('/login')
  }

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`
          flex items-center space-x-2 rounded-lg px-3 py-2 transition-colors duration-200
          hover:bg-blue-50
        `}
      >
        <span className='font-medium text-gray-700'>
          {user?.username ?? 'Anónimo'}
        </span>
        <ChevronDown
          className={`
            h-4 w-4 text-gray-500 transition-transform duration-200
            ${isOpen ? 'rotate-180' : ''}
          `}
        />
      </button>

      {isOpen && (
        <div className='absolute right-0 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg'>
          <button
            onClick={handleLogoutClick}
            className={`
              flex w-full items-center px-4 py-2 text-sm text-red-600 transition-colors duration-200
              hover:bg-red-50
            `}
          >
            <LogOut className='mr-3 h-4 w-4' />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}
