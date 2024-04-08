import { Link, useNavigate } from 'react-router-dom';

import styles from './NavBar.module.scss';
import { useState } from 'react';
import { useAuth } from '../context/auth-context';
import { toast } from 'react-toastify';

const NavBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {isAuthenticated, user, logout} = useAuth()

  async function handleLogout() {
    try {
      await logout();
      toast.success("A plus dans le 🚌");
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  }
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.burgerMenu}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <nav className={`${styles.navbar} ${isMenuOpen ? styles.open : ''}`}>
        <li className={styles.closeMenu}>
          <button onClick={toggleMenu}>
            <span></span>
            <span></span>
          </button>
        </li>

        <ul className={styles.links}>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/workspaces">Nos espaces</Link></li>

          {isAuthenticated ? (
            <>
              <li>{user?.first_name} {user?.last_name}</li>
              <li>
                <button onClick={handleLogout}>Se déconnecter</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Se connecter</Link></li>
              <li><Link to="/register">S'enregistrer</Link></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
