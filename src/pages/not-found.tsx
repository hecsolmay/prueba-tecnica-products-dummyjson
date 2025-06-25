import { Link } from 'react-router'

export default function NotFound () {
  return (
    <main className='flex h-dvh flex-col items-center justify-center'>
      <h1>404</h1>
      <Link to='/'>Volver a la página principal</Link>
    </main>
  )
}
