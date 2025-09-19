-- Initialize the database with a users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (id, name, age, email, phone) VALUES
    (1, 'John Doe', 25, 'john.doe@example.com', '123-456-7890'),
    (2, 'Jane Smith', 30, 'jane.smith@example.com', '098-765-4321'),
    (4, 'Bob Johnson', 35, 'bob.johnson@example.com', '555-123-4567')
ON CONFLICT (email) DO NOTHING;

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'user_id') THEN
        ALTER TABLE posts ADD COLUMN user_id INTEGER NOT NULL DEFAULT 1 REFERENCES users(id) ON DELETE CASCADE;
    END IF;
END $$;

INSERT INTO posts (id, user_id, title, body, created_at, updated_at) VALUES
    -- Posts by John Doe (user_id: 1)
    (1, 1, 'Getting Started with Rust', 'An introduction to Rust programming, covering installation, basic syntax, and your first program. This post walks you through setting up your environment and writing your first Hello World. You will also learn about Rust''s package manager Cargo and how to run and build projects.', '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
    (2, 1, 'Understanding Ownership', 'A deep dive into Rust''s ownership model, borrowing, and lifetimes, with practical code examples. We explain why ownership is central to Rust''s safety guarantees and how to avoid common pitfalls. By the end, you''ll be comfortable with references, borrowing, and the rules that keep your code safe.', '2025-01-02 14:30:00', '2025-01-02 14:30:00'),
    (3, 1, 'Building Web APIs', 'Learn how to build fast and safe web APIs in Rust using popular frameworks and libraries. This article covers setting up routing, handling requests and responses, and connecting to a database. You''ll also see how to structure your project for maintainability and scalability.', '2025-01-03 09:15:00', '2025-01-03 09:15:00'),
    
    -- Posts by Jane Smith (user_id: 2)
    (4, 2, 'GraphQL vs REST', 'A comparison of GraphQL and REST API architectures, their strengths, weaknesses, and use cases. We discuss when to choose one over the other and how to migrate between them. Real-world examples illustrate the trade-offs in flexibility, performance, and developer experience.', '2025-01-01 16:20:00', '2025-01-01 16:20:00'),
    (5, 2, 'Database Design Patterns', 'Explore common database design patterns, normalization, and best practices for scalable systems. The post includes tips for avoiding common anti-patterns and ensuring data integrity. You''ll also learn about indexing, denormalization, and when to use NoSQL solutions.', '2025-01-02 11:45:00', '2025-01-02 11:45:00'),
    (6, 2, 'Frontend State Management', 'An overview of state management strategies in modern frontend frameworks like React and Vue. We cover local state, global state, and popular libraries such as Redux and Pinia. Practical examples show how to choose the right approach for your app''s complexity.', '2025-01-04 13:10:00', '2025-01-04 13:10:00'),
    
    -- Posts by Bob Johnson (user_id: 4)
    (7, 4, 'Docker Containerization', 'A practical guide to containerizing applications with Docker, including tips for efficient images. Learn how to write effective Dockerfiles, manage multi-stage builds, and debug containers. The post also covers best practices for security and resource usage.', '2025-01-01 08:30:00', '2025-01-01 08:30:00'),
    (8, 4, 'Kubernetes Deployment', 'Step-by-step instructions for deploying and managing applications on Kubernetes clusters. Topics include writing deployment manifests, scaling pods, and rolling updates. You''ll also learn how to monitor your cluster and troubleshoot common issues.', '2025-01-03 15:45:00', '2025-01-03 15:45:00'),
    (9, 4, 'CI/CD Best Practices', 'Best practices for implementing continuous integration and continuous deployment pipelines. This post explains how to automate testing, build, and deployment for faster feedback and safer releases. We also discuss popular CI/CD tools and how to integrate them into your workflow.', '2025-01-05 10:20:00', '2025-01-05 10:20:00'),
    (10, 4, 'Monitoring and Observability', 'How to monitor applications and gain observability using modern tools and techniques. Learn about metrics, logging, and distributed tracing to quickly identify and resolve issues. The post includes recommendations for open-source tools and setting up alerting for production systems.', '2025-01-06 12:00:00', '2025-01-06 12:00:00')
ON CONFLICT (id) DO NOTHING;