import { useState } from 'react'
import useSession from './useSession'
import { useNavigate } from 'react-router'

interface FormData {
  username: string
  password: string
}

export function useLoginForm () {
  const [formData, setFormData] = useState<FormData>({ username: '', password: '' })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const { login } = useSession()
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }

    if (serverError) setServerError(null)
  }

  const validate = () => {
    const newErrors: Partial<FormData> = {}

    if (!formData.username) {
      newErrors.username = 'El username es requerido'
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Debe tener al menos 6 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setServerError(null)

    const isValid = validate()

    if (!isValid) return
    setIsSubmitting(true)

    try {
      await login({ username: formData.username, password: formData.password })
      navigate('/')
    } catch (error: unknown) {
      if (error instanceof Error) {
        setServerError(error.message)
      }

      setServerError('Error al iniciar sesión')
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formData,
    errors,
    handleInputChange,
    isSubmitting,
    serverError,
    handleSubmit
  }
}
