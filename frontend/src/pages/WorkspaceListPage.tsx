import styles from './WorkspaceListPage.module.scss'
import Title from '../components/Title'
import WorkspaceCard from '../components/WorkspaceCard';
import type { Workspace } from '../@types/workspace';
import { useEffect, useState } from 'react';

const WorkspaceListPage: React.FC = () => {
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWorkspaces = async () => {
            try {
                const response = await fetch('/api/items/workspace');
                const json = await response.json();
                
                if (response.ok) {
                    setWorkspaces(json.data);
                } else {
                    setError(json.errors[0].message);
                }
            } catch (err) {
                setError('Erreur lors de la récupération des espaces de travail.');
            } finally {
                setLoading(false);
            }
        };
    
        fetchWorkspaces();
    }, []);

    return (
        <div>
            <Title alignment="center">Liste des espaces de travail</Title>
            
            {loading && <p>Chargement en cours...</p>}
            {error && <p className="error">{error}</p>}

            <section className={styles.spacesGrid}>
                {workspaces.map(workspace => (
                    <WorkspaceCard workspace={workspace} key={workspace.id} />
                ))}
            </section>
        </div>
    );
};


export default WorkspaceListPage;