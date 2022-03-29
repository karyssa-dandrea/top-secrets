-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS secrets CASCADE;

CREATE TABLE users (
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
email TEXT NOT NULL,
password_hash TEXT NOT NULL,
first_name TEXT NOT NULL,
last_name TEXT NOT NULL
);

DROP TABLE IF EXISTS secrets;

CREATE TABLE secrets (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)