import {
  IonContent,
  IonIcon,
  IonPage,
} from '@ionic/react';

import { Link, useNavigate } from 'react-router-dom';

import {
  gridOutline,
  cubeOutline,
  peopleOutline,
  statsChartOutline,
  settingsOutline,
  notificationsOutline,
  searchOutline,
  addOutline,
  alertCircleOutline,
  checkmarkCircleOutline,
  timeOutline,
  logOutOutline,
} from 'ionicons/icons';

import './Home.css';
import StatCard from '../components/StatCard';
import ActivityItem from '../components/ActivityItem';
import { useAuth } from '../auth/AuthContext';

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const initials = user?.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <IonPage>
      <IonContent className="dashboard-content">
        <div className="dashboard-layout">

          {/* Menú lateral */}
          <aside className="sidebar">
            <div className="brand">
              <div className="brand-icon">G</div>
              <span>GestorPro</span>
            </div>

            <p className="menu-label">MENÚ PRINCIPAL</p>

            <nav className="navigation" aria-label="Menú principal">
              <Link
                to="/home"
                className="nav-link active"
                aria-current="page"
              >
                <IonIcon icon={gridOutline} />
                <span>Panel principal</span>
              </Link>

              <Link to="/products" className="nav-link">
                <IonIcon icon={cubeOutline} />
                <span>Productos</span>
              </Link>

              {user?.role === 'admin' && (
                <>
                  <a href="#" className="nav-link">
                    <IonIcon icon={peopleOutline} />
                    <span>Usuarios</span>
                  </a>

                  <a href="#" className="nav-link">
                    <IonIcon icon={statsChartOutline} />
                    <span>Informes</span>
                  </a>
                </>
              )}
            </nav>

            <div className="sidebar-bottom">
              <a href="#" className="nav-link">
                <IonIcon icon={settingsOutline} />
                <span>Configuración</span>
              </a>

              <div className="user-profile">
                <div className="avatar">{initials}</div>
                <div>
                  <strong>{user?.name}</strong>
                  <small>{user?.email}</small>
                  <small>
                    {user?.role === 'admin'
                      ? 'Administrador'
                      : 'Usuario estándar'}
                  </small>
                </div>
              </div>

              <button
                className="nav-link"
                onClick={handleLogout}
                aria-label="Cerrar sesión"
                style={{
                  width: '100%',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <IonIcon icon={logOutOutline} />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </aside>

          {/* Contenido principal */}
          <main className="main-content">
            <header className="topbar">
              <div>
                <p className="breadcrumb">GestorPro / Panel principal</p>
                <h1>Panel principal</h1>
              </div>

              <div className="topbar-actions">
                <button className="icon-button" aria-label="Buscar">
                  <IonIcon icon={searchOutline} />
                </button>

                <button className="icon-button" aria-label="Notificaciones">
                  <IonIcon icon={notificationsOutline} />
                </button>

                <Link to="/products" className="add-button">
                  <IonIcon icon={addOutline} />
                  Nuevo producto
                </Link>
              </div>
            </header>

            {/* Bienvenida */}
            <section className="welcome-section">
              <div>
                <h2>¡Bienvenido, {user?.name}!</h2>
                <p>Aquí tienes un resumen del estado de tu negocio.</p>
              </div>
            </section>

            {/* Tarjetas de resumen */}
            <section className="stats-grid" aria-label="Resumen del inventario">
              <StatCard
                title="Total de productos"
                value="248"
                icon={<IonIcon icon={cubeOutline} />}
                tone="blue"
                note="12% respecto al mes anterior"
                noteType="positive"
              />

              <StatCard
                title="Usuarios registrados"
                value="36"
                icon={<IonIcon icon={peopleOutline} />}
                tone="purple"
                note="4 nuevos este mes"
                noteType="positive"
              />

              <StatCard
                title="Stock bajo"
                value="8"
                icon={<IonIcon icon={alertCircleOutline} />}
                tone="orange"
                note="Productos que necesitan revisión"
                noteType="warning"
              />

              <StatCard
                title="Valor del inventario"
                value="18.450 €"
                icon={<IonIcon icon={statsChartOutline} />}
                tone="green"
                note="6% respecto al mes anterior"
                noteType="positive"
              />
            </section>

            {/* Actividad reciente y alertas */}
            <section className="content-grid">

              <article className="panel">
                <div className="panel-heading">
                  <div>
                    <h2>Actividad reciente</h2>
                    <p>Últimos movimientos del inventario</p>
                  </div>
                  <button className="text-button">Ver todo</button>
                </div>

                <ActivityItem
                  title="Producto añadido"
                  description="Teclado inalámbrico"
                  time="Hace 10 min"
                  icon={checkmarkCircleOutline}
                  type="success"
                />

                <ActivityItem
                  title="Stock actualizado"
                  description="Ratón óptico - quedan 3 unidades"
                  time="Hace 1 hora"
                  icon={alertCircleOutline}
                  type="warning"
                />

                <ActivityItem
                  title="Usuario registrado"
                  description="Nuevo usuario: Laura García"
                  time="Hace 3 horas"
                  icon={checkmarkCircleOutline}
                  type="success"
                />
              </article>

              <article className="panel alerts-panel">
                <div className="panel-heading">
                  <div>
                    <h2>Alertas de inventario</h2>
                    <p>Productos que requieren atención</p>
                  </div>
                </div>

                <div className="alert-item">
                  <div>
                    <strong>Ratón óptico</strong>
                    <span>3 unidades disponibles</span>
                  </div>
                  <span className="stock-badge critical">Crítico</span>
                </div>

                <div className="alert-item">
                  <div>
                    <strong>Monitor 24 pulgadas</strong>
                    <span>5 unidades disponibles</span>
                  </div>
                  <span className="stock-badge low">Bajo</span>
                </div>

                <div className="alert-item">
                  <div>
                    <strong>Teclado mecánico</strong>
                    <span>7 unidades disponibles</span>
                  </div>
                  <span className="stock-badge low">Bajo</span>
                </div>

                <div className="alert-footer">
                  <IonIcon icon={timeOutline} />
                  Datos de ejemplo para la demostración
                </div>
              </article>

            </section>

            <footer className="dashboard-footer">
              GestorPro · Gestión sencilla de inventario
            </footer>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
