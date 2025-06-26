# 🛠️ Prueba técnica - Gestión de productos con React + DummyJSON

Este proyecto es una prueba técnica realizada en React utilizando la API pública de [DummyJSON](https://dummyjson.com) para implementar una interfaz básica de autenticación, listado y gestión de productos.

---

## 🚀 Funcionalidades implementadas

### ✅ 1. Login de usuario
- Validación de campos (`username`, `password`)
- Consumo del endpoint `https://dummyjson.com/auth/login`
- Manejo de sesión con `localStorage`
- Rutas protegidas usando `react-router`
- Navbar con nombre del usuario logueado y opción de cerrar sesión

🖼️ *Demostración del flujo de inicio de sesión con validación y sesión persistente:*
![demo - login](https://github.com/user-attachments/assets/46205787-2392-462c-9c11-207f04b29c66)

### ✅ 2. Lista de productos
- Visualización en tarjetas con datos de cada producto
- Paginación sincronizada con la URL usando `searchParams`
- Filtro por búsqueda con `debounce`
- Diseño responsive: grid dinámico con `minmax(350px, 1fr)`
- Botón "Editar" para cada producto

🖼️ *Visualización de productos con búsqueda, filtros y paginación sincronizada con la URL:*
![demo - paginacion- filtros](https://github.com/user-attachments/assets/c86bc396-1ec2-4fde-acf6-21e55b4f99b6)

### ✅ 3. Crear o editar producto
- Modal único controlado por contexto (`ProductFormContext`)
- Formulario reutilizable que soporta:
  - Creación (`POST`)
  - Edición (`PATCH`)
  - Carga de imagen local con previsualización (`URL.createObjectURL`)
- Validaciones manuales en el formulario
- Modal bloqueado durante el envío (`isSubmitting`)
- Pre-carga de valores para edición

🖼️ *Creación de un nuevo producto desde el modal:*
![Demo - create](https://github.com/user-attachments/assets/ddce28b1-00f5-476b-b6e0-d8dcc621ef86)

🖼️ *Actualización de producto existente con valores precargados:*
![Demo - update](https://github.com/user-attachments/assets/2ede432d-1a30-4463-a312-f0096918ae23)

### ✅ 4. Notificaciones
- Mensajes de éxito o error usando `sonner`
- Validación visual de errores en campos

---

## 🧪 Tecnología usada

- **React 19** con Vite + TypeScript
- **React Router v7 declarativo**
- **TailwindCSS v4**
- **Lucide React** para íconos
- **Sonner** para notificaciones
- `URLSearchParams` para sincronización de filtros con la URL
- Arquitectura modular con `context`, `hooks`, `services`, `components`


