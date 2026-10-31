import { useState, type FormEvent } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonInput,
  IonPage,
  IonText
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../auth/AuthContext';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const success = login(email, password);

    if (success) {
      setError('');
      navigate('/home', { replace: true });
    } else {
      setError('El correo o la contraseña no son correctos.');
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div
          style={{
            maxWidth: '420px',
            margin: '80px auto'
          }}
        >
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>GestorPro</IonCardTitle>
              <IonText color="medium">
                <p>Inicia sesión para acceder a tu cuenta</p>
              </IonText>
            </IonCardHeader>

            <IonCardContent>
              <form onSubmit={handleSubmit}>
                <IonInput
                  label="Correo electrónico"
                  labelPlacement="floating"
                  type="email"
                  value={email}
                  onIonInput={(event) =>
                    setEmail(event.detail.value ?? '')
                  }
                  required
                  className="ion-margin-bottom"
                />

                <IonInput
                  label="Contraseña"
                  labelPlacement="floating"
                  type="password"
                  value={password}
                  onIonInput={(event) =>
                    setPassword(event.detail.value ?? '')
                  }
                  required
                  className="ion-margin-bottom"
                />

                {error && (
                  <IonText color="danger">
                    <p role="alert">{error}</p>
                  </IonText>
                )}

                <IonButton
                  expand="block"
                  type="submit"
                  className="ion-margin-top"
                >
                  Iniciar sesión
                </IonButton>
              </form>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;