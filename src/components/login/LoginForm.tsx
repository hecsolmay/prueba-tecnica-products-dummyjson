import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useLoginForm } from '@/hooks/useLoginForm'
import { Link } from 'react-router'

export default function LoginForm () {
  const { formData, errors, handleInputChange, isSubmitting, serverError, handleSubmit } = useLoginForm()

  return (
    <form className='space-y-6' onSubmit={handleSubmit}>
      <Input
        label='Nombre de usuario'
        type='text'
        name='username'
        placeholder='tu nombre de usuario'
        error={errors.username}
        value={formData.username}
        onChange={handleInputChange}
      />

      <Input
        label='Contraseña'
        type='password'
        name='password'
        placeholder='••••••••'
        error={errors.password}
        value={formData.password}
        allowShowPassword
        onChange={handleInputChange}
      />

      <div className='flex items-center justify-between text-sm'>
        <label className='flex items-center'>
          <input
            type='checkbox'
            className={`
              h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-800
              focus:ring-1 focus:ring-blue-800
            `}
          />
          <span className='ml-2 text-slate-600'>Recordarme</span>
        </label>
        <Link
          to='/reset-password'
          className={`
            font-medium text-blue-900
            hover:text-blue-700
          `}
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <Button
        type='submit'
        variant='primary'
        isLoading={isSubmitting}
        size='md'
        className={`
          w-full duration-150 ease-in-out
          hover:-translate-y-0.5
        `}
      >
        Iniciar Sesión
      </Button>

      {serverError && (
        <p className='text-center text-sm text-red-500'>{serverError}</p>
      )}
    </form>
  )
}
