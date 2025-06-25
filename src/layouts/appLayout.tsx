import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Outlet } from 'react-router'

export default function AppLayout () {
  return (
    <div className='flex min-h-screen flex-col'>
      <header>
        <Navbar />
      </header>

      <main className='flex-1 px-6 py-8'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
