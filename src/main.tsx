import { SessionProvider } from '@/context/SessionContext.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/appRoutes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SessionProvider>
      <AppRoutes />
    </SessionProvider>
  </StrictMode>
)
