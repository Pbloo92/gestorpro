
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Teclado mecánico',
    category: 'Periféricos',
    price: 59.99,
    stock: 12,
  },
  {
    id: 2,
    name: 'Ratón inalámbrico',
    category: 'Periféricos',
    price: 24.50,
    stock: 3,
  },
  {
    id: 3,
    name: 'Monitor 24 pulgadas',
    category: 'Monitores',
    price: 149.99,
    stock: 5,
  },
  {
    id: 4,
    name: 'Portátil profesional',
    category: 'Ordenadores',
    price: 749.99,
    stock: 18,
  },
  {
    id: 5,
    name: 'Webcam HD',
    category: 'Accesorios',
    price: 39.99,
    stock: 0,
  },
];
