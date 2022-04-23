REVOKE ALL ON SCHEMA PUBLIC FROM PUBLIC;

CREATE DATABASE example;
\c example

CREATE USER migration_user LOGIN PASSWORD 'migration_user';
GRANT ALL PRIVILEGES ON DATABASE example TO migration_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO migration_user;

CREATE USER app_user LOGIN PASSWORD 'app_user';
GRANT CONNECT ON DATABASE example to app_user;
GRANT USAGE ON SCHEMA public TO app_user;

ALTER DEFAULT PRIVILEGES FOR USER migration_user IN SCHEMA PUBLIC GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_user;
ALTER DEFAULT PRIVILEGES FOR USER migration_user IN SCHEMA PUBLIC GRANT SELECT, UPDATE ON SEQUENCES TO app_user;
ALTER DEFAULT PRIVILEGES FOR USER migration_user IN SCHEMA PUBLIC GRANT EXECUTE ON FUNCTIONS TO app_user;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";