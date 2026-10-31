import {
  IonContent,
  IonIcon,
  IonPage,
} from '@ionic/react';

import {
  gridOutline,
  cubeOutline,
  peopleOutline,
  statsChartOutline,
  settingsOutline,
  notificationsOutline,
  searchOutline,
  addOutline,
  arrowUpOutline,
  alertCircleOutline,
  checkmarkCircleOutline,
  timeOutline,
} from 'ionicons/icons';

import './Home.css';

const Home: React.FC = () => {
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
              <a href="/home" className="nav-link active" aria-current="page">
                <IonIcon icon={gridOutline} />
                <span>Panel principal</span>
              </a>

              <a href="#" className="nav-link">
                <IonIcon icon={cubeOutline} />
                <span>Productos</span>
              </a>

              <a href="#" className="nav-link">
                <IonIcon icon={peopleOutline} />
                <span>Usuarios</span>
              </a>

              <a href="#" className="nav-link">
                <IonIcon icon={statsChartOutline} />
                <span>Informes</span>
              </a>
            </nav>

            <div className="sidebar-bottom">
              <a href="#" className="nav-link">
                <IonIcon icon={settingsOutline} />
                <span>Configuración</span>
              </a>

              <div className="user-profile">
                <div className="avatar">AD</div>
                <div>
                  <strong>Administrador</strong>
                  <small> admin@gestorpro.com</small>
                </div>
              </div>
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

                <button className="add-button">
                  <IonIcon icon={addOutline} />
                  Nuevo producto
                </button>
              </div>
            </header>

            <section className="welcome-section">
              <div>
                <h2>¡Bienvenido a GestorPro!</h2>
                <p>Aquí tienes un resumen del estado de tu negocio.</p>
              </div>
            </section>

            {/* Tarjetas de resumen */}
            <section className="stats-grid" aria-label="Resumen del inventario">
              <article className="stat-card">
                <div className="stat-heading">
                  <span>Total de productos</span>
                  <div className="stat-icon blue">
                    <IonIcon icon={cubeOutline} />
                  </div>
                </div>
                <strong className="stat-number">248</strong>
                <p className="stat-note positive">
                  <IonIcon icon={arrowUpOutline} />
                  12% respecto al mes anterior
                </p>
              </article>

              <article className="stat-card">
                <div className="stat-heading">
                  <span>Usuarios registrados</span>
                  <div className="stat-icon purple">
                    <IonIcon icon={peopleOutline} />
                  </div>
                </div>
                <strong className="stat-number">36</strong>
                <p className="stat-note positive">
                  <IonIcon icon={arrowUpOutline} />
                  4 nuevos este mes
                </p>
              </article>

              <article className="stat-card">
                <div className="stat-heading">
                  <span>Stock bajo</span>
                  <div className="stat-icon orange">
                    <IonIcon icon={alertCircleOutline} />
                  </div>
                </div>
                <strong className="stat-number">8</strong>
                <p className="stat-note warning">Productos que necesitan revisión</p>
              </article>

              <article className="stat-card">
                <div className="stat-heading">
                  <span>Valor del inventario</span>
                  <div className="stat-icon green">
                    <IonIcon icon={statsChartOutline} />
                  </div>
                </div>
                <strong className="stat-number">18.450 €</strong>
                <p className="stat-note positive">
                  <IonIcon icon={arrowUpOutline} />
                  6% respecto al mes anterior
                </p>
              </article>
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

                <div className="activity-item">
                  <div className="activity-icon success">
                    <IonIcon icon={checkmarkCircleOutline} />
                  </div>
                  <div className="activity-description">
                    <strong>Producto añadido</strong>
                    <span>Teclado inalámbrico</span>
                  </div>
                  <time>Hace 10 min</time>
                </div>

                <div className="activity-item">
                  <div className="activity-icon warning">
                    <IonIcon icon={alertCircleOutline} />
                  </div>
                  <div className="activity-description">
                    <strong>Stock actualizado</strong>
                    <span>Ratón óptico - quedan 3 unidades</span>
                  </div>
                  <time>Hace 1 hora</time>
                </div>

                <div className="activity-item">
                  <div className="activity-icon success">
                    <IonIcon icon={checkmarkCircleOutline} />
                  </div>
                  <div className="activity-description">
                    <strong>Usuario registrado</strong>
                    <span>Nuevo usuario: Laura García</span>
                  </div>
                  <time>Hace 3 horas</time>
                </div>
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