import Button from '@/components/ui/Button'
import FileInput from '@/components/ui/FileInput'
import Input from '@/components/ui/Input'
import useProductForm from '@/hooks/useProductForm'
import { ProductsService } from '@/services/products'
import type { ProductCreateDto } from '@/types/product'
import { useEffect, useState } from 'react'
import { toast } from '@/lib/toast'

export default function ProductForm () {
  const { defaultValues, mode, close, setSubmitting, isSubmitting } =
    useProductForm()
  const [files, setFiles] = useState<FileList | null>(null)

  const [formData, setFormData] = useState<Partial<ProductCreateDto>>({
    title: '',
    description: '',
    price: 0,
    imageUrl: undefined
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Inicializar con los defaultValues del contexto
  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues)
    }

    if (defaultValues?.imageUrl) {
      setFiles(null)
    }
  }, [defaultValues])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.title) newErrors.title = 'El título es obligatorio'
    if (!formData.description) {
      newErrors.description = 'La descripción es obligatoria'
    }
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Precio inválido'
    }

    if (!formData.imageUrl) {
      newErrors.imageUrl = 'La imagen es obligatoria'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    try {
      setSubmitting(true)
      if (mode === 'create') {
        // POST a /products/add
        const randomId = Math.floor(Math.random() * 1000)
        const newProduct = {
          ...formData,
          id: randomId
        }

        await ProductsService.createProduct(newProduct as ProductCreateDto)
      } else {
        // PUT a /products/:id
        const { id, ...formDataWithoutId } = formData
        const formattedId = id ? Number(id) : 1
        await ProductsService.updateProduct(formattedId, formDataWithoutId)
      }
      close()
      const text =
        mode === 'create'
          ? 'Producto creado exitosamente'
          : 'Producto actualizado exitosamente'
      toast.success(text)
    } catch (err) {
      // mostrar notificación de error
      const text =
        mode === 'create'
          ? 'Error al crear producto'
          : 'Error al actualizar producto'
      console.error(text, err)
      toast.error(text)
    } finally {
      setSubmitting(false)
    }
  }

  const handleImageChange = (files: FileList | null) => {
    setFiles(files)
    if (files === null || files?.length === 0) return
    setErrors(prev => ({ ...prev, imageUrl: '' }))
    const file = files[0]

    // Mejora a futuro UPLOAD IMAGE

    const url = URL.createObjectURL(file)
    setFormData(prev => ({
      ...prev,
      imageUrl: url
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='space-y-4'>
        <div className='space-y-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Imagen
          </label>

          <div className='relative h-48 w-full'>
            {formData.imageUrl
              ? (
                <img
                  src={formData.imageUrl}
                  alt='Producto actual'
                  className='h-48 w-full object-contain'
                />
                )
              : (
                <div className='flex h-48 w-full items-center justify-center rounded-lg bg-gray-100'>
                  <span className='text-sm text-gray-500'>
                    Previsualización de la imagen
                  </span>
                </div>
                )}
          </div>

          <FileInput
            placeholder='Selecciona una imagen'
            accept='image/*'
            files={files}
            onChange={handleImageChange}
            error={errors.imageUrl}
          />
        </div>

        <Input
          type='text'
          name='title'
          value={formData.title ?? ''}
          onChange={handleChange}
          error={errors.title}
          label='Título'
        />

        <Input
          type='text'
          name='description'
          value={formData.description ?? ''}
          onChange={handleChange}
          error={errors.description}
          label='Descripción'
        />

        <Input
          type='number'
          name='price'
          value={formData.price ?? ''}
          onChange={handleChange}
          error={errors.price}
          label='Precio'
        />

        <div className='flex justify-end'>
          <Button
            type='submit'
            variant={mode === 'create' ? 'primary' : 'warning'}
            size='md'
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {mode === 'create' ? 'Crear' : 'Actualizar'}
          </Button>
        </div>
      </div>
    </form>
  )
}
