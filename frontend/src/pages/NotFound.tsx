import styles from './NotFound.module.scss'

const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <main>
        <h1>404 - Page non trouvée</h1>
        <p>Désolé, la page que vous recherchez n'existe pas.</p>
      </main>
    </div>
  );
}

export default NotFound;
