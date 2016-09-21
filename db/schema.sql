DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS scripts;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password_digest VARCHAR(255)
);

CREATE TABLE scripts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  project VARCHAR(255),
  script_line VARCHAR(255)
)
