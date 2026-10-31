# DOCUMENTACIÓN TÉCNICA – GESTORPRO

## 1. Descripción del proyecto

GestorPro es una aplicación web de gestión de productos e inventario desarrollada con Ionic, React y TypeScript.

Su objetivo es facilitar la administración de productos mediante una interfaz intuitiva, adaptable a distintos dispositivos y con control de acceso según el tipo de usuario.

La aplicación permite consultar, crear, modificar y eliminar productos, así como visualizar estadísticas del inventario y exportar información.

## 2. Tecnologías utilizadas

- **Ionic:** componentes e interfaz de aplicación.
- **React:** construcción de componentes y gestión de la interfaz.
- **TypeScript:** tipado estático y organización del código.
- **React Router:** navegación entre páginas y protección de rutas.
- **Chart.js:** representación gráfica de estadísticas.
- **jsPDF:** generación de documentos PDF.
- **Supabase:** servicio backend para la gestión de productos.
- **PostgreSQL:** base de datos relacional utilizada por Supabase.
- **@supabase/supabase-js:** biblioteca para conectar la aplicación con Supabase.
- **Vercel:** despliegue de la aplicación.
- **Git y GitHub:** control de versiones y alojamiento del repositorio.

## 3. Arquitectura de la aplicación

La aplicación está organizada por páginas, componentes reutilizables, servicios y contexto de autenticación.

### Páginas principales

- **Home:** pantalla principal y navegación.
- **Products:** gestión del inventario.
- **Users:** consulta de usuarios, disponible para administradores.
- **Dashboard:** estadísticas y gráficos del inventario.
- **Login:** autenticación de usuarios.

### Componentes reutilizables

- **StatCard:** muestra indicadores y estadísticas.
- **ActivityItem:** representa elementos de actividad.
- **DashboardStats:** calcula y representa estadísticas del inventario.

Los componentes permiten separar responsabilidades y reutilizar elementos de interfaz.

## 4. Navegación y control de acceso

La navegación se implementa mediante React Router.

Se utilizan rutas protegidas para impedir el acceso a determinadas páginas cuando el usuario no ha iniciado sesión.

La aplicación contempla dos roles:

- **Admin:** puede acceder a las funcionalidades administrativas.
- **Standard User:** dispone de acceso a las funcionalidades generales permitidas.

El control de permisos se realiza mediante el contexto de autenticación y las comprobaciones de rol.

## 5. Autenticación

La autenticación se gestiona mediante un contexto de React (`AuthContext`).

Este contexto permite mantener el estado del usuario autenticado y controlar el acceso a las páginas protegidas.

Los usuarios de prueba son ficticios y se utilizan exclusivamente para demostrar el funcionamiento de los roles.

**Nota de seguridad:** la autenticación implementada es una solución de demostración. No utiliza actualmente Supabase Auth y no debe considerarse un sistema de autenticación seguro para producción. Las credenciales de prueba y la sesión se gestionan en el lado del cliente.

## 6. Gestión de productos

La funcionalidad de productos permite:

- Consultar el inventario.
- Añadir productos.
- Modificar productos existentes.
- Eliminar productos.
- Validar los datos introducidos.

La lógica de acceso a los datos se encuentra separada en `src/pages/Products/productsService.ts`.

Este servicio utiliza Supabase para realizar operaciones asíncronas sobre la tabla `products` de PostgreSQL.

Se implementan las siguientes operaciones:

- `getProducts()`: obtiene los productos registrados.
- `addProduct()`: añade un producto nuevo.
- `updateProduct()`: modifica un producto existente.
- `deleteProduct()`: elimina un producto.

Las operaciones gestionan los posibles errores devueltos por el servicio.

## 7. Panel de estadísticas

El panel administrativo utiliza Chart.js para representar información del inventario.

Se calculan los siguientes indicadores:

- Total de productos.
- Productos con stock bajo.
- Total de unidades disponibles.
- Valor económico del inventario.

Se incluyen gráficos de barras y de tipo doughnut.

Los datos utilizados para calcular las estadísticas se obtienen mediante el servicio de productos conectado a Supabase.

## 8. Exportación de información

La aplicación permite exportar los productos en dos formatos:

- **CSV:** para trabajar con los datos en hojas de cálculo.
- **PDF:** mediante la biblioteca jsPDF.

Las funciones de exportación se encuentran en `src/utils/exportUtils.ts`.

## 9. Almacenamiento y conexión con Supabase

GestorPro utiliza Supabase como servicio backend para almacenar y gestionar los productos.

La base de datos utiliza PostgreSQL y contiene una tabla denominada `products` con los siguientes campos:

- `id`: identificador del producto.
- `name`: nombre del producto.
- `category`: categoría.
- `price`: precio.
- `stock`: unidades disponibles.
- `created_at`: fecha de creación.

La conexión se centraliza en el archivo `src/lib/supabase.ts`, utilizando la biblioteca `@supabase/supabase-js`.

La configuración se realiza mediante variables de entorno:

- `VITE_SUPABASE_URL`: dirección del proyecto Supabase.
- `VITE_SUPABASE_ANON_KEY`: clave pública de acceso.

El archivo `.env` contiene estas variables y debe permanecer excluido del repositorio.

La tabla utiliza Row Level Security (RLS) y políticas para permitir las operaciones de consulta, inserción, modificación y eliminación configuradas para la demostración.

**Limitaciones técnicas actuales:**

- La base de datos implementada es relacional (PostgreSQL).
- No se ha integrado un servicio NoSQL independiente.
- No se ha implementado todavía la recepción de cambios en tiempo real mediante Supabase Realtime.
- Las políticas de acceso actuales son permisivas y deben restringirse antes de utilizar la aplicación en un entorno real.

## 10. Control de versiones

El proyecto utiliza Git y GitHub para gestionar los cambios.

Se han creado las siguientes ramas:

- `main`: rama principal.
- `develop`: rama de desarrollo.
- `feature/layout-inicial`: estructura inicial.
- `feature/gestion-productos`: gestión de productos.
- `feature/autenticacion`: autenticación y permisos.
- `feature/dashboard-admin`: panel administrativo.
- `feature/gestion-usuarios`: gestión de usuarios.

Los cambios se desarrollan en ramas de funcionalidad y se integran en la rama de desarrollo.

Repositorio:

https://github.com/Pbloo92/gestorpro

## 11. Despliegue

La aplicación se despliega mediante Vercel, conectado al repositorio de GitHub.

Configuración del despliegue:

- **Comando de instalación:** `npm install`
- **Comando de construcción:** `npm run build`
- **Directorio de salida:** `dist`
- **Rama de producción:** `develop`

Las variables de entorno de Supabase deben configurarse también en el panel de Vercel para que la aplicación pueda conectarse a la base de datos en producción.

URL de producción:

https://gestorpro-jet.vercel.app

## 12. Mejoras futuras

Entre las posibles mejoras futuras del proyecto se encuentran:

- Integrar Supabase Auth para gestionar la autenticación de forma segura.
- Implementar políticas RLS basadas en usuarios y roles.
- Incorporar Supabase Realtime para recibir actualizaciones de productos en tiempo real.
- Integrar un servicio NoSQL para completar la arquitectura de datos solicitada.
- Generar documentación automática del código mediante TypeDoc.
- Ampliar las pruebas de funcionamiento y accesibilidad.