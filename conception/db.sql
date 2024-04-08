CREATE TABLE Workspace (
    id uuid DEFAULT uuid_generate_v4(),
    name text NOT NULL,
    price INT NOT NULL,
    capacity INT NOT NULL,
    description TEXT NOT NULL,
    available BOOLEAN NOT NULL,
    thumbnail text NOT NULL,
    image text NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE Comment (
    id uuid DEFAULT uuid_generate_v4(),
    content TEXT NOT NULL,
    date_time TIMESTAMP NOT NULL,
    workspace_id uuid NOT NULL,
    user_id uuid NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_workspace_id 
        FOREIGN KEY (workspace_id) 
        REFERENCES Workspace(id)
        ON DELETE CASCADE;
    CONSTRAINT fk_user_id 
        FOREIGN KEY (user_id)
        REFERENCES User(id)
        ON DELETE SET NULL;
);

CREATE TABLE User (
    id uuid DEFAULT uuid_generate_v4(),
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT unique_email UNIQUE (email)
);

CREATE TABLE Booking (
    id uuid DEFAULT uuid_generate_v4(),
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    workspace_id uuid NOT NULL,
    user_id uuid NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_workspace_id
        FOREIGN KEY (workspace_id)
        REFERENCES Workspace(id)
        ON DELETE CONSTRAINT;
    CONSTRAINT fk_user_id 
        FOREIGN KEY (user_id) 
        REFERENCES User(id)
        ON DELETE CONSTRAINT;
);
