import { Link } from 'react-router-dom';

import styles from './WorkspaceCard.module.scss'
import type { WorkspaceCardProps } from '../@types/workspace';


const WorkspaceCard = ({ workspace }: WorkspaceCardProps) => {
  return (
    <article className={styles.card} style={{ 
      backgroundImage: "url(" + "/directusfiles/assets/" + workspace.thumbnail + ")"
    }}>
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{workspace.name}</h2>
        <ul className={styles.cardInfosList}>
          <li className={styles.cardInfosElt}>
            <img src="/assets/icons/euro-icon.png" alt="Prix" />{workspace.price}€<span />
          </li>
          <li className={styles.cardInfosElt}>
            <img src="/assets/icons/people-icon.png" alt="Capacité" /><span>{workspace.capacity}</span>
          </li>
          <li className={styles.cardInfosElt}>
            <img src="/assets/icons/equipment-icon.png" alt="Équipements disponibles" />
            <span>Accès
              sans-fil,
              projecteur
            </span>
          </li>
        </ul>
      </div>
      <Link to={`/workspaces/${workspace.id}`} className={styles.cardButton} aria-label="Accéder à l'espace de coworking">Voir l'espace</Link>
    </article>
  );
}

export default WorkspaceCard;
