
import { useEffect, useState } from 'react';

import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
  IonText,
  IonSpinner
} from '@ionic/react';

import {
  addOutline,
  createOutline,
  trashOutline
} from 'ionicons/icons';

import type { Product } from './productsData';

import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
} from './productsService';

import {
  exportProductsCSV,
  exportProductsPDF
} from '../../utils/exportUtils';

import './Products.css';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [serviceError, setServiceError] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const [error, setError] = useState('');

  // Cargar los productos al entrar en la página.
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch {
        setServiceError('No se han podido cargar los productos.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Limpiar los campos del formulario.
  const resetForm = () => {
    setName('');
    setCategory('');
    setPrice('');
    setStock('');
    setError('');
    setEditingId(null);
    setShowForm(false);
  };

  // Abrir el formulario para añadir un producto.
  const openNewProductForm = () => {
    resetForm();
    setShowForm(true);
  };

  // Guardar un producto nuevo o sus modificaciones.
  const handleSaveProduct = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !category || !price.trim() || !stock.trim()) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const productPrice = Number(price);
    const productStock = Number(stock);

    if (!Number.isFinite(productPrice) || productPrice <= 0) {
      setError('El precio debe ser mayor que cero.');
      return;
    }

    if (!Number.isInteger(productStock) || productStock < 0) {
      setError('El stock debe ser un número entero igual o superior a cero.');
      return;
    }

    const productData: Product = {
      id: editingId ?? Date.now(),
      name: name.trim(),
      category,
      price: productPrice,
      stock: productStock
    };

    try {
      if (editingId !== null) {
        const updatedProduct = await updateProduct(productData);

        setProducts((currentProducts) =>
          currentProducts.map((product) =>
            product.id === editingId ? updatedProduct : product
          )
        );
      } else {
        const newProduct = await addProduct(productData);

        setProducts((currentProducts) => [
          ...currentProducts,
          newProduct
        ]);
      }

      resetForm();
      setServiceError('');
    } catch {
      setServiceError('No se ha podido guardar el producto.');
    }
  };

  // Cargar los datos de un producto para editarlo.
  const handleEditProduct = (product: Product) => {
    setEditingId(product.id);
    setName(product.name);
    setCategory(product.category);
    setPrice(String(product.price));
    setStock(String(product.stock));
    setError('');
    setShowForm(true);
  };

  // Eliminar un producto.
  const handleDeleteProduct = async (id: number) => {
    const confirmed = window.confirm(
      '¿Estás seguro de que quieres eliminar este producto?'
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProduct(id);

      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== id)
      );

      setServiceError('');
    } catch {
      setServiceError('No se ha podido eliminar el producto.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gestión de productos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="products-header">
          <div>
            <h1>Productos</h1>
            <p>Administra el inventario de tu negocio.</p>
          </div>

          <div className="products-header-actions">
            <IonButton onClick={openNewProductForm}>
              <IonIcon slot="start" icon={addOutline} />
              Añadir producto
            </IonButton>

            <IonButton
              fill="outline"
              color="success"
              onClick={() => exportProductsCSV(products)}
              disabled={products.length === 0}
            >
              Exportar CSV
            </IonButton>

            <IonButton
              fill="outline"
              color="tertiary"
              onClick={() => exportProductsPDF(products)}
              disabled={products.length === 0}
            >
              Exportar PDF
            </IonButton>
          </div>
        </div>

        {serviceError && (
          <IonText color="danger">
            <p role="alert">{serviceError}</p>
          </IonText>
        )}

        {loading ? (
          <div className="ion-text-center ion-padding">
            <IonSpinner name="crescent" />
            <p>Cargando productos...</p>
          </div>
        ) : (
          <>
            {/* Formulario de productos */}
            {showForm && (
              <div className="product-form-container">
                <h2>
                  {editingId !== null ? 'Editar producto' : 'Nuevo producto'}
                </h2>

                <form onSubmit={handleSaveProduct}>
                  <IonItem>
                    <IonLabel position="stacked">Nombre del producto</IonLabel>
                    <IonInput
                      value={name}
                      placeholder="Ej. Teclado inalámbrico"
                      onIonInput={(event) =>
                        setName(String(event.detail.value ?? ''))
                      }
                    />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">Categoría</IonLabel>
                    <IonSelect
                      value={category}
                      placeholder="Selecciona una categoría"
                      onIonChange={(event) => setCategory(event.detail.value)}
                    >
                      <IonSelectOption value="Periféricos">Periféricos</IonSelectOption>
                      <IonSelectOption value="Monitores">Monitores</IonSelectOption>
                      <IonSelectOption value="Ordenadores">Ordenadores</IonSelectOption>
                      <IonSelectOption value="Accesorios">Accesorios</IonSelectOption>
                    </IonSelect>
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">Precio (€)</IonLabel>
                    <IonInput
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={price}
                      placeholder="Ej. 49.99"
                      onIonInput={(event) =>
                        setPrice(String(event.detail.value ?? ''))
                      }
                    />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">Unidades en stock</IonLabel>
                    <IonInput
                      type="number"
                      min="0"
                      step="1"
                      value={stock}
                      placeholder="Ej. 10"
                      onIonInput={(event) =>
                        setStock(String(event.detail.value ?? ''))
                      }
                    />
                  </IonItem>

                  {error && (
                    <IonText color="danger">
                      <p className="form-error" role="alert">{error}</p>
                    </IonText>
                  )}

                  <div className="form-actions">
                    <IonButton type="submit">
                      {editingId !== null ? 'Guardar cambios' : 'Guardar producto'}
                    </IonButton>

                    <IonButton
                      type="button"
                      fill="outline"
                      color="medium"
                      onClick={resetForm}
                    >
                      Cancelar
                    </IonButton>
                  </div>
                </form>
              </div>
            )}

            {/* Resumen */}
            <div className="products-summary">
              <div className="summary-box">
                <span>Total de productos</span>
                <strong>{products.length}</strong>
              </div>

              <div className="summary-box">
                <span>Stock disponible</span>
                <strong>
                  {products.reduce(
                    (total, product) => total + product.stock,
                    0
                  )}
                </strong>
              </div>
            </div>

            {/* Tabla */}
            <div className="products-table-container">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.price.toFixed(2)} €</td>
                      <td>{product.stock}</td>
                      <td>
                        <span
                          className={
                            product.stock === 0
                              ? 'product-status unavailable'
                              : product.stock <= 5
                              ? 'product-status low'
                              : 'product-status available'
                          }
                        >
                          {product.stock === 0
                            ? 'Sin stock'
                            : product.stock <= 5
                            ? 'Stock bajo'
                            : 'Disponible'}
                        </span>
                      </td>
                      <td>
                        <div className="product-actions">
                          <IonButton
                            fill="clear"
                            size="small"
                            aria-label={`Editar ${product.name}`}
                            onClick={() => handleEditProduct(product)}
                          >
                            <IonIcon icon={createOutline} />
                          </IonButton>

                          <IonButton
                            fill="clear"
                            color="danger"
                            size="small"
                            aria-label={`Eliminar ${product.name}`}
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <IonIcon icon={trashOutline} />
                          </IonButton>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {products.length === 0 && (
                    <tr>
                      <td colSpan={6}>No hay productos registrados.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Products;
