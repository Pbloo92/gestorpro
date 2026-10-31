
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBadge
} from '@ionic/react';

import { useNavigate } from 'react-router-dom';

import { testUsers } from '../../auth/users';
import { useAuth } from '../../auth/AuthContext';

const Users: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gestión de usuarios</IonTitle>

          <IonButtons slot="end">
            <IonButton onClick={() => navigate('/home')}>
              Volver
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Usuarios registrados</h2>

        <p>
          Bienvenido, {user?.name}. Desde aquí puedes consultar
          los usuarios y sus permisos.
        </p>

        <IonList>
          {testUsers.map((item) => (
            <IonItem key={item.id}>
              <IonLabel>
                <h2>{item.name}</h2>
                <p>{item.email}</p>
              </IonLabel>

              <IonBadge color={item.role === 'admin' ? 'primary' : 'success'}>
                {item.role === 'admin' ? 'Administrador' : 'Usuario'}
              </IonBadge>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Users;
