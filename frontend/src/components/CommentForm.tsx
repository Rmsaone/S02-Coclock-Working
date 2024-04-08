import { FormEvent, useState } from 'react';
import styles from './CommentForm.module.scss';
import { CommentFormProps } from '../@types/comment';


const CommentForm: React.FC<CommentFormProps> = ({ workspaceId, userId, onCommentAdded  }) => {
  const [commentTitle, setCommentTitle] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const postComment = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('.')[0];

    const response = await fetch('/api/items/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: commentTitle,
        content: commentContent,
        date_time: formattedDate,
        workspace_id: workspaceId,
        user_id: userId
      }),
    });

    if ( !response.ok ) {
      throw new Error("Erreur lors de l'ajout du commentaire");
    }

    return await response.json();
  }

  const handleCommentSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const comment = await postComment();

      onCommentAdded(comment.data);
      setCommentTitle('');
      setCommentContent('');
    } 
    catch (error) {
      setError("Erreur lors de l'ajout du commentaire");
    }
  };

  return (
    <section className={styles.container}>
      <h2>Ajouter un commentaire</h2>
      <form className={styles.themeForm} onSubmit={handleCommentSubmit}>
        <div className={styles.themeFormInput}>
          <input
            className={styles.themeInput}
            type="text"
            id="comment-title"
            name="comment-title"
            aria-label="Titre du commentaire"
            placeholder="ex : Mon commentaire"
            value={commentTitle}
            onChange={(e) => setCommentTitle(e.target.value)}
          />
          <label htmlFor="comment-title">Titre</label>
        </div>

        <div className={styles.themeFormTextarea}>
          <textarea
            className={styles.themeTextarea}
            name="add-comment"
            id="add-comment"
            cols={30}
            rows={10}
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          ></textarea>
          <label htmlFor="add-comment">Écrivez un commentaire</label>
        </div>

        {error && <p className="error">{error}</p>}

        <input
          type="submit"
          className={styles.themeButton}
          value="Ajouter un commentaire"
          aria-label="Ajouter un commentaire"
        />
      </form>
    </section>
  );
}

export default CommentForm;
