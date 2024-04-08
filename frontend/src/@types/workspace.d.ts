export type Workspace = {
    id: number;
    name: string;
    price: number;
    capacity: number;
    description: string;
    available: boolean;
    thumbnail: string;
    image: string
    location: string;
};


export type WorkspaceCardProps = {
    workspace: Workspace;
};