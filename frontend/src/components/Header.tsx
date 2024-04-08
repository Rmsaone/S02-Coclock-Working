import NavBar from './NavBar';
import styles from './Header.module.scss'
import { useLocation } from 'react-router-dom';


const Header = () => {
    // Récupération de l'URL courante avec le router
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    
    return (
        <header className={styles.header}>
            
            {!isHomePage &&
                <a href="/" className={styles.logo}>
                    <img src="/assets/logos/CW-header-logo.png" alt="Logo Coworking" />
                </a>
            }
            
            <NavBar />
        </header>
    );
};

export default Header;
