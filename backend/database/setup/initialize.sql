CREATE DATABASE example;
\c example

CREATE USER app_user LOGIN PASSWORD 'app_user';
GRANT ALL PRIVILEGES ON DATABASE example to app_user;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";