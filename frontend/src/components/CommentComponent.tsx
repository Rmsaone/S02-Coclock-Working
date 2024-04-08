import React from 'react';

import styles from './CommentComponent.module.scss'
import type { CommentCardProps } from '../@types/comment';


const CommentComponent: React.FC<CommentCardProps> = ({ comment }) => (
  <article key={comment.id} className={styles.themeComment}>
    <h3 className={styles.themeCommentTitle}>{comment.title}</h3>
    <span className={styles.themeCommentTimestamp}>
      Posté le {comment.date_time}
    </span>
    <p className={styles.themeCommentContain}>{comment.content}</p>
  </article>
);

export default CommentComponent;
