import type { Product } from './productsData';
import { initialProducts } from './productsData';

const STORAGE_KEY = 'gestorpro-products';

// Simulamos el tiempo de respuesta de una API.
const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Obtenemos los productos guardados.
const readProducts = (): Product[] => {
  const savedProducts = localStorage.getItem(STORAGE_KEY);

  if (savedProducts) {
    return JSON.parse(savedProducts) as Product[];
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
  return initialProducts;
};

// Guardamos los productos.
const saveProducts = (products: Product[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

// Obtener todos los productos.
export const getProducts = async (): Promise<Product[]> => {
  await delay(500);
  return readProducts();
};

// Añadir un producto.
export const addProduct = async (
  product: Product
): Promise<Product> => {
  await delay(500);

  const products = readProducts();
  const updatedProducts = [...products, product];

  saveProducts(updatedProducts);

  return product;
};

// Actualizar un producto.
export const updateProduct = async (
  updatedProduct: Product
): Promise<Product> => {
  await delay(500);

  const products = readProducts();

  const updatedProducts = products.map((product) =>
    product.id === updatedProduct.id ? updatedProduct : product
  );

  saveProducts(updatedProducts);

  return updatedProduct;
};

// Eliminar un producto.
export const deleteProduct = async (
  productId: number
): Promise<number> => {
  await delay(500);

  const products = readProducts();

  const updatedProducts = products.filter(
    (product) => product.id !== productId
  );

  saveProducts(updatedProducts);

  return productId;
};