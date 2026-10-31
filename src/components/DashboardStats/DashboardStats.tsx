import { useEffect, useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonSpinner,
  IonText
} from '@ionic/react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { Bar, Doughnut } from 'react-chartjs-2';

import { getProducts } from '../../pages/Products/productsService';
import type { Product } from '../../pages/Products/productsData';

import './DashboardStats.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardStats: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        setError('No se pudieron cargar las estadísticas.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="stats-loading">
        <IonSpinner name="crescent" />
        <p>Cargando estadísticas...</p>
      </div>
    );
  }

  if (error) {
    return <IonText color="danger">{error}</IonText>;
  }

  const totalProducts = products.length;

  const lowStock = products.filter(
    (product) => product.stock <= 5
  ).length;

  const totalUnits = products.reduce(
    (total, product) => total + product.stock,
    0
  );

  const inventoryValue = products.reduce(
    (total, product) => total + product.price * product.stock,
    0
  );

  const barData = {
    labels: ['Productos', 'Unidades', 'Stock bajo'],
    datasets: [
      {
        label: 'Cantidad',
        data: [totalProducts, totalUnits, lowStock],
        backgroundColor: ['#3880ff', '#2dd36f', '#ffc409'],
        borderRadius: 6
      }
    ]
  };

  const doughnutData = {
    labels: ['Stock normal', 'Stock bajo'],
    datasets: [
      {
        data: [totalProducts - lowStock, lowStock],
        backgroundColor: ['#2dd36f', '#eb445a'],
        borderWidth: 0
      }
    ]
  };

  return (
    <section className="dashboard-stats">
      <div className="stats-summary">
        <IonCard>
          <IonCardContent>
            <p>Total de productos</p>
            <h2>{totalProducts}</h2>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <p>Unidades en inventario</p>
            <h2>{totalUnits}</h2>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <p>Productos con stock bajo</p>
            <h2>{lowStock}</h2>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <p>Valor del inventario</p>
            <h2>
              {inventoryValue.toLocaleString('es-ES', {
                style: 'currency',
                currency: 'EUR'
              })}
            </h2>
          </IonCardContent>
        </IonCard>
      </div>

      <div className="stats-charts">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Resumen del inventario</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }}
            />
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Estado del stock</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <Doughnut
              data={doughnutData}
              options={{
                responsive: true,
                maintainAspectRatio: true
              }}
            />
          </IonCardContent>
        </IonCard>
      </div>
    </section>
  );
};

export default DashboardStats;