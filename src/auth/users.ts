
export type UserRole = 'admin' | 'user';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

// Usuarios ficticios para las pruebas de GestorPro.
export const testUsers: User[] = [
  {
    id: 1,
    name: 'Administrador',
    email: 'admin@gestorpro.com',
    password: 'Admin123',
    role: 'admin'
  },
  {
    id: 2,
    name: 'Usuario estándar',
    email: 'usuario@gestorpro.com',
    password: 'Usuario123',
    role: 'user'
  }
];
