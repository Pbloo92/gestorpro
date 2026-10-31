
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

import './Products.css';

const Products: React.FC = () => {
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

        <div className="products-empty">
          <IonIcon icon={cubeOutline} />
          <h2>Tu inventario está preparado</h2>
          <p>Próximamente podrás consultar y gestionar tus productos.</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Products;
