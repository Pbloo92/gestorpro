# DOCUMENTACIÓN TÉCNICA – GESTORPRO

## 1. Descripción del proyecto

GestorPro es una aplicación web de gestión de productos e inventario desarrollada con Ionic, React y TypeScript.

Su objetivo es facilitar la administración de productos mediante una interfaz intuitiva, adaptable a distintos dispositivos y con control de acceso según el tipo de usuario.

## 2. Tecnologías utilizadas

- **Ionic:** componentes e interfaz de aplicación.
- **React:** construcción de componentes y gestión de la interfaz.
- **TypeScript:** tipado estático y organización del código.
- **React Router:** navegación entre páginas y protección de rutas.
- **Chart.js:** representación gráfica de estadísticas.
- **jsPDF:** generación de documentos PDF.
- **LocalStorage:** almacenamiento local de los productos.
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

**Nota:** esta implementación es de demostración. No debe considerarse un sistema de autenticación seguro para producción, ya que utiliza almacenamiento local y credenciales de prueba.

## 6. Gestión de productos

La funcionalidad de productos permite:

- Consultar el inventario.
- Añadir productos.
- Modificar productos existentes.
- Eliminar productos.
- Validar los datos introducidos.

La lógica de acceso a los datos se encuentra separada en `productsService.ts`.

El servicio utiliza operaciones asíncronas y `localStorage` para simular la persistencia de datos.

## 7. Panel de estadísticas

El panel administrativo utiliza Chart.js para representar información del inventario.

Se calculan los siguientes indicadores:

- Total de productos.
- Productos con stock bajo.
- Total de unidades disponibles.
- Valor económico del inventario.

Se incluyen gráficos de barras y de tipo doughnut.

## 8. Exportación de información

La aplicación permite exportar los productos en dos formatos:

- CSV, para trabajar con los datos en hojas de cálculo.
- PDF, mediante la biblioteca jsPDF.

Las funciones de exportación se encuentran en `src/utils/exportUtils.ts`.

## 9. Almacenamiento y servicios

Los datos de productos se gestionan mediante un servicio asíncrono que utiliza almacenamiento local del navegador.

Esta solución permite probar las operaciones de gestión sin necesidad de configurar un servidor externo.

**Limitación técnica:** esta versión no integra una API REST conectada a SQL ni una base de datos NoSQL en tiempo real. El almacenamiento local es una simulación para la demostración del funcionamiento de la aplicación.

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

- Comando de construcción: `npm run build`
- Directorio de salida: `dist`
- Comando de instalación: `npm install`

URL de producción:

https://gestorpro-jet.vercel.app

