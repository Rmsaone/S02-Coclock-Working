import { useNavigate, Link } from 'react-router-dom'

import styles from './LoginPage.module.scss';
import { useState } from 'react';
import { useAuth } from '../context/auth-context';


const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('admin@example.com');
    const [password, setPassword] = useState('d1r3ctu5');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {login} = useAuth();

    const handleSubmit = async (event: React.FormEvent) => {
        setLoading(true);
        event.preventDefault();
    
        try {
            const success = await login(email, password);
        
            if (success) {
                console.log('Connecté avec succès !');
                navigate('/workspaces');
            } else {
                setError('Erreur lors de la connexion.');
            }
        } catch (err) {
            console.log('Erreur lors de la connexion. Veuillez vérifier vos identifiants.');
        }

        setLoading(false);
    };

    return (
        <main className={`${styles.container} ${styles.LoginPage}`}>
            <h1>Se connecter</h1>
            <form className={styles.themeForm} onSubmit={handleSubmit}>
                <div className={styles.themeFormInput}>
                    <input
                        className={styles.themeInput}
                        type="email"
                        id="email"
                        aria-label="adresse email"
                        placeholder="example@mail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label className={styles.themeLabel} htmlFor="email">Adresse email</label>
                </div>
                <div className={styles.themeFormInput}>
                    <input
                        className={styles.themeInput}
                        type="password"
                        id="password"
                        aria-label="mot de passe"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label className={styles.themeLabel} htmlFor="password">Mot de passe</label>
                </div>
                <input
                    type="submit"
                    className={styles.themeButton}
                    value={loading ? 'Chargement...' : 'Envoyer le formulaire'}
                    aria-label="soumission formulaire"
                    disabled={loading}
                />
            </form>
            <Link className={styles.themeMinorLink} to="/register" aria-label="Créez-vous un compte">
                Vous n'avez pas de compte ?
            </Link>
            {error && <p>{error}</p>}
        </main>
    );
};

export default LoginPage;