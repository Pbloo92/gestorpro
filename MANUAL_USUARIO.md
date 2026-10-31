# MANUAL DE USUARIO – GESTORPRO

## 1. Introducción

GestorPro es una aplicación web para gestionar productos e inventario de una empresa. Permite consultar productos, añadir nuevos registros, modificar información, eliminar productos y exportar los datos.

La aplicación dispone de dos tipos de usuarios: administrador y usuario estándar.

## 2. Acceso a la aplicación

Accede desde el navegador a:

https://gestorpro-jet.vercel.app

Para entrar, introduce las credenciales correspondientes.

### Usuarios de prueba

**Administrador**
- Correo: admin@gestorpro.com
- Contraseña: Admin123

**Usuario estándar**
- Correo: usuario@gestorpro.com
- Contraseña: Usuario123

Estas credenciales son exclusivamente para pruebas y demostración.

## 3. Inicio de sesión

1. Abre la aplicación.
2. Introduce tu correo electrónico.
3. Introduce tu contraseña.
4. Pulsa el botón de inicio de sesión.

Una vez autenticado, accederás a la pantalla principal.

Para salir de la aplicación, utiliza la opción de cerrar sesión.

## 4. Pantalla principal

La pantalla principal permite acceder a las distintas funcionalidades de GestorPro.

Las opciones disponibles dependen del rol del usuario.

- **Administrador:** puede acceder a la gestión de productos, usuarios y estadísticas.
- **Usuario estándar:** puede acceder a las funcionalidades generales permitidas, como la consulta y gestión de productos.

## 5. Gestión de productos

Desde el apartado de productos se puede administrar el inventario.

### Consultar productos
Se muestra un listado con los productos registrados y su información.

### Añadir un producto
1. Accede a la sección de productos.
2. Pulsa la opción para añadir un producto.
3. Introduce la información solicitada.
4. Guarda el formulario.

### Modificar un producto
1. Localiza el producto.
2. Selecciona la opción de edición.
3. Modifica los campos necesarios.
4. Guarda los cambios.

### Eliminar un producto
1. Localiza el producto que deseas eliminar.
2. Selecciona la opción de eliminar.
3. Confirma la operación si se solicita.

## 6. Exportación de datos

La aplicación permite exportar el listado de productos en dos formatos:

- **CSV:** permite abrir y tratar los datos mediante hojas de cálculo.
- **PDF:** permite obtener un documento con la información de los productos.

Selecciona el formato de exportación correspondiente desde la sección de productos.

## 7. Panel de administración

Los usuarios con rol de administrador pueden acceder al panel de estadísticas.

En él se muestran indicadores del inventario, entre ellos:

- Número total de productos.
- Productos con stock bajo.
- Unidades disponibles.
- Valor total del inventario.

También se incluyen gráficos para facilitar la interpretación de los datos.

## 8. Gestión de usuarios

El administrador puede acceder al apartado de usuarios para consultar los usuarios registrados y sus roles.

Los usuarios estándar no tienen permiso para acceder a esta sección.

## 9. Seguridad y permisos

GestorPro incorpora control de acceso según el rol del usuario.

- Es necesario iniciar sesión para acceder a las secciones protegidas.
- Los usuarios estándar no pueden acceder al apartado de administración de usuarios.
- Al cerrar sesión, se pierde el acceso a las secciones protegidas hasta volver a autenticarse.

## 10. Almacenamiento de datos

Esta versión de demostración utiliza el almacenamiento local del navegador (`localStorage`) para conservar los productos.

Por este motivo, los datos están asociados al navegador utilizado y no constituyen una base de datos compartida entre dispositivos.

Los usuarios y contraseñas incluidos son datos ficticios de demostración.

## 11. Recomendaciones

- Utilizar las credenciales correspondientes a cada rol.
- Comprobar los datos antes de guardar un producto.
- Exportar los datos periódicamente si se necesitan conservar fuera de la aplicación.
- No utilizar esta versión de demostración para almacenar información real o confidencial.

---

**Proyecto:** GestorPro  
**Tecnología:** Ionic, React y TypeScript  
**Tipo de aplicación:** Gestión de productos e inventario  
**URL:** https://gestorpro-jet.vercel.app