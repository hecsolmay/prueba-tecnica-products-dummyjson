import { useSessionContext } from '@/context/SessionContext'

// USADO COMO HOOK PARA NO DEPENDER DEL CONTEXT
export default function useSession () {
  const { user, login, logout } = useSessionContext()

  return { user, login, logout }
}
