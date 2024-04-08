export type Comment = {
    id: number;
    title: string;
    date_created: string;
    content: string;
    date_time: string
};

export type CommentCardProps = {
    comment: Comment;
};

export type CommentFormProps = {
    workspaceId: number;
    userId: number;
    onCommentAdded: (comment:Comment) => void;
};