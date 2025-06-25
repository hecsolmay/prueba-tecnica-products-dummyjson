import { useState } from 'react'

// Hook para manejar el modal, puede ser por contexto o por useState, Es lógica extraída para poder reutilizarla
export default function useModal () {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return { isOpen, openModal, closeModal }
}
