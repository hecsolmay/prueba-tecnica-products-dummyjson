import { cn } from '@/lib/cn'
import { File, Upload, X } from 'lucide-react'
import { useRef } from 'react'

interface FileInputProps {
  accept?: string
  multiple?: boolean
  onChange?: (files: FileList | null) => void
  placeholder?: string
  files?: FileList | null
  error?: string
}

export default function FileInput ({
  accept,
  multiple,
  onChange,
  placeholder,
  files,
  error
}: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (files: FileList | null) => {
    onChange?.(files)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(event.target.files)
  }

  const clearFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    handleFileSelect(null)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className='w-full max-w-md'>
      <div className='relative'>
        <input
          ref={fileInputRef}
          type='file'
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className='absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0'
        />

        <div
          className={cn(`
            group cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-3 transition-colors duration-200
            hover:border-gray-400
          `, error && 'border-red-500')}
        >
          <div className='flex items-center space-x-3'>
            <div className='flex-shrink-0'>
              <Upload
                className={`
                  h-5 w-5 text-gray-400 transition-colors duration-200
                  group-hover:text-gray-600
                `}
              />
            </div>
            <div className='min-w-0 flex-1'>
              {files && files.length > 0
                ? (
                  <div className='space-y-1'>
                    {Array.from(files)
                      .slice(0, 2)
                      .map((file, index) => (
                        <div
                          key={index}
                          className='flex items-center justify-between'
                        >
                          <div className='flex min-w-0 items-center space-x-2'>
                            <File className='h-4 w-4 flex-shrink-0 text-blue-500' />
                            <span className='truncate text-sm font-medium text-gray-700'>
                              {file.name}
                            </span>
                          </div>
                          <span className='ml-2 flex-shrink-0 text-xs text-gray-500'>
                            {formatFileSize(file.size)}
                          </span>
                        </div>
                      ))}
                    {files.length > 2 && (
                      <p className='text-xs text-gray-500'>
                        +{files.length - 2} archivo
                        {files.length - 2 > 1 ? 's' : ''} más
                      </p>
                    )}
                  </div>
                  )
                : (
                  <p
                    className={`
                      text-sm text-gray-600 transition-colors duration-200
                      group-hover:text-gray-800
                    `}
                  >
                    {placeholder}
                  </p>
                  )}
            </div>
            {files && files.length > 0 && (
              <button
                onClick={e => {
                  e.stopPropagation()
                  clearFiles()
                }}
                className={`
                  z-20 flex-shrink-0 rounded-full p-1 text-gray-400 transition-colors duration-200
                  hover:bg-red-50 hover:text-red-500
                `}
                type='button'
              >
                <X className='h-4 w-4' />
              </button>
            )}
          </div>
        </div>
      </div>

      {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}

      {files && files.length > 0 && (
        <div className='mt-2 text-xs text-gray-500'>
          {files.length} archivo{files.length > 1 ? 's' : ''}{' '}
          seleccionado{files.length > 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}
