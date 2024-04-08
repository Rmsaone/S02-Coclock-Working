import { Comment } from '../@types/comment';
import { Workspace } from '../@types/workspace';
import CommentForm from '../components/CommentForm';
import CommentComponent from '../components/CommentComponent';
import styles from './WorkspaceDetailPage.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/auth-context';
import MapComponent from '../components/MapComponent';

const WorkspaceDetailPage: React.FC = () => {
    const { id } = useParams();
    const [workspace, setWorkspace] = useState<Workspace | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [buttonMessage, setButtonMessage] = useState("Chargement...");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const { isAuthenticated, user } = useAuth();

    const handleNewComment = (comment:Comment) => {
        setComments([...comments, comment]);
    };

    useEffect(() => {
        const fetchWorkspace = async () => {
            try {
                const response = await fetch(`/api/items/workspace/${id}`);
                const json = await response.json();
    
                if ( !response.ok ) {
                    setError(json.errors[0].message);
                    return;
                }
    
                setWorkspace(json.data);
    
                if (json.data && !json.data.available) {
                    setButtonMessage('Espace non disponible');
                } else if (json.data.available && !isAuthenticated) {
                    setButtonMessage('Connectez-vous pour réserver');
                } else {
                    setButtonMessage('Réserver cet espace');
                }
            } catch (error) {
                setError('Erreur lors de la récupération du workspace');
            } 
            finally {
                setLoading(false);
            }
        };
    
        const fetchComments = async () => {
            try {
              const response = await fetch(`/api/items/comment?filter[workspace_id][_eq]=${id}`);
              const json = await response.json();
              setComments(json.data);
            } catch (error) {
              console.error('Erreur lors de la récupération des commentaires:', error);
            }
        };

        fetchWorkspace();
        fetchComments();
    }, [id, isAuthenticated]);

    return (
        <>
            {loading && <p>Chargement en cours...</p>}
            {error && <p className="error">{error}</p>}

            {workspace && (
                <div className={styles.container}>
                    <section className={styles.spaceHeader} style={{ 
                        background: `linear-gradient(
                            to bottom,
                            rgba(255, 255, 255, 0.4),
                            rgba(255, 255, 255, 0.6)
                        ), url(/directusfiles/assets/${workspace.image}) center/cover`
                    }}>
                        <h1>{workspace.name}</h1>

                        <button
                            disabled={!workspace.available || !isAuthenticated}
                        >
                            {buttonMessage}
                        </button>
                    </section>

                    <section className={styles.spaceInformation}>
                        <ul>
                            <li>
                                <img src="/assets/icons/euro-icon.png" alt="Prix" /><span>{workspace.price}€ / jour</span>
                            </li>
                            <li>
                                <img src="/assets/icons/people-icon.png" alt="Capacité maximale" /><span>{workspace.capacity} personnes</span>
                            </li>
                            <li>
                                <img src="/assets/icons/equipment-icon.png" alt="Équipements disponibles" />
                                <span>
                                    Borne Wi-Fi,
                                    projecteur sans-fil
                                </span>
                            </li>
                        </ul>
                    </section>

                    <p>{workspace.description }</p>

                    <section className={styles.spaceMap}>
                        <MapComponent workspace={workspace} />
                    </section>

                    <section className={styles.spaceComments}>
                        <h2>Commentaires</h2>
                        {comments.map(comment => (
                            <CommentComponent key={comment.id} comment={comment} />
                        ))}
                    </section>

                    {user && <CommentForm workspaceId={workspace.id} userId={user.id} onCommentAdded={handleNewComment}/>}
                </div>
            )}
        </>
    );
};


export default WorkspaceDetailPage;