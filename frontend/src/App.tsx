import { Routes, Route, useLocation } from 'react-router-dom';

import styles from './App.module.scss';

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import WorkspaceListPage from './pages/WorkspaceListPage';
import WorkspaceDetailPage from './pages/WorkspaceDetailPage';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';


const App: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={`${styles.app} ${isHomePage?styles.homepage:''}`}>
      <Header />

      {isHomePage &&
        <section className={`${styles.brand}`}>
          <img src="/assets/logos/CW-logo.svg" alt="Logo Coworking" />
        </section>
      }

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workspaces" element={<WorkspaceListPage />} />
          <Route path="/workspaces/:id" element={<WorkspaceDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App;
