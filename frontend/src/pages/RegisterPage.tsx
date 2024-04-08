import { useNavigate, Link } from 'react-router-dom'

import styles from './RegisterPage.module.scss'
import { useContext, useState } from 'react';
import { AuthContext, useAuth } from '../context/auth-context';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        last_name: '',
        first_name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {register} = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        setLoading(true);
        event.preventDefault();
    
        try {
            const success = await register(
                formData.last_name,
                formData.first_name,
                formData.email,
                formData.password
            );
        
            if (success) {
                console.log('Inscription réussie !');
                navigate('/login');
            } else {
                setError("Erreur lors de l'inscription.");
            }
        } catch (err) {
            console.error("Erreur lors de l'envoi du formulaire: ", err);
        }

        setLoading(false);
    };
    
    return (
        <main className={styles.container}>
            <h1>Créer un compte</h1>

            <form className={styles.themeForm} onSubmit={handleSubmit}>
                <div className={styles.themeFormInput}>
                    <input
                        className={`${styles.themeInput} ${styles.themeInputSmall}`}
                        type="text"
                        id="lastname"
                        name="last_name"
                        aria-label="nom"
                        placeholder="ex : Deray"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                    <label className={styles.themeLabel} htmlFor="lastname">Nom</label>
                </div>

                <div className={styles.themeFormInput}>
                    <input
                        className={`${styles.themeInput} ${styles.themeInputSmall}`}
                        type="text"
                        id="firstname"
                        name="first_name"
                        aria-label="prénom"
                        placeholder="ex : Odile"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                    <label className={styles.themeLabel} htmlFor="firstname">Prénom</label>
                </div>

                <div className={styles.themeFormInput}>
                    <input
                        className={styles.themeInput}
                        type="email"
                        id="email"
                        name="email"
                        aria-label="adresse email"
                        placeholder="Odile.Deray@redisdead.com"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <label className={styles.themeLabel} htmlFor="email">Adresse email</label>
                </div>

                <div className={styles.themeFormInput}>
                    <input
                        className={styles.themeInput}
                        type="password"
                        id="password"
                        name="password"
                        aria-label="mot de passe"
                        placeholder="********"
                        value={formData.password}
                        onChange={handleChange}
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

            <Link className={styles.themeMinorLink} to="/login" aria-label="Connectez-vous à votre compte">Déjà un compte ?</Link>
            {error && <p>{error}</p>}
        </main>
    );
};


export default RegisterPage;