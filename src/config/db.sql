CREATE DATABASE exam;
\c exam;


CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    age INT CHECK (age > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS boards (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
    board_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_board FOREIGN KEY (board_id)
        REFERENCES boards(id)
        ON DELETE CASCADE
);

INSERT INTO users (username, email, password, age)
VALUES
('Ali', 'ali@example.com', 'hashedpass1', 25),
('Gulnoza', 'gulnoza@example.com', 'hashedpass2', 22),
('Sardor', 'sardor@example.com', 'hashedpass3', 28);

INSERT INTO boards (title, description, user_id)
VALUES
('Frontend Tasks', 'Tasks related to frontend development', 1),
('Personal Goals', 'My 2025 personal goals', 2),
('Backend Tasks', 'Node.js and database tasks', 3);

INSERT INTO tasks (title, description, status, board_id)
VALUES
('Create login page', 'Build the login page using React', 'in_progress', 1),
('Fix navbar bug', 'Resolve mobile navbar collapse issue', 'pending', 1),
('Learn Docker', 'Watch YouTube tutorials about Docker', 'completed', 2),
('Workout', 'Go to the gym 3 times a week', 'pending', 2),
('Setup PostgreSQL', 'Install and connect PostgreSQL with Node.js', 'in_progress', 3),
('Write CRUD API', 'Implement dynamic CRUD for all models', 'pending', 3);
