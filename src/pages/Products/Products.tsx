
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon
} from '@ionic/react';

import { addOutline, cubeOutline } from 'ionicons/icons';

import { useState } from 'react';
import { initialProducts, Product } from './productsData';

import './Products.css';

const Products: React.FC = () => {
  const [products] = useState<Product[]>(initialProducts);

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

          <IonButton>
            <IonIcon slot="start" icon={addOutline} />
            Añadir producto
          </IonButton>
        </div>

        <div className="products-summary">
          <div className="summary-box">
            <span>Total de productos</span>
            <strong>{products.length}</strong>
          </div>

          <div className="summary-box">
            <span>Stock disponible</span>
            <strong>
              {products.reduce((total, product) => total + product.stock, 0)}
            </strong>
          </div>
        </div>

        <div className="products-table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Products;
