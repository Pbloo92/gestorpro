
import type { Product } from './productsData';
import { supabase } from '../../lib/supabase';

// Obtener todos los productos desde Supabase.
export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }

  return data as Product[];
};

// Añadir un producto.
export const addProduct = async (
  product: Product
): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .insert({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
    })
    .select()
    .single();

  if (error) {
    console.error('Error al añadir producto:', error);
    throw error;
  }

  return data as Product;
};

// Actualizar un producto.
export const updateProduct = async (
  updatedProduct: Product
): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .update({
      name: updatedProduct.name,
      category: updatedProduct.category,
      price: updatedProduct.price,
      stock: updatedProduct.stock,
    })
    .eq('id', updatedProduct.id)
    .select()
    .single();

  if (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }

  return data as Product;
};

// Eliminar un producto.
export const deleteProduct = async (
  productId: number
): Promise<number> => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);

  if (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }

  return productId;
};

// Escuchar cambios en tiempo real de la tabla products.
export const subscribeToProducts = (onChange: () => void) => {
  const channel = supabase
    .channel('products-realtime')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'products',
      },
      () => {
        onChange();
      }
    )
    .subscribe((status) => {
      if (status === 'CHANNEL_ERROR') {
        console.error('Error al conectar con Supabase Realtime.');
      }
    });

  // Cancelar la suscripción cuando deje de utilizarse.
  return () => {
    void supabase.removeChannel(channel);
  };
};
