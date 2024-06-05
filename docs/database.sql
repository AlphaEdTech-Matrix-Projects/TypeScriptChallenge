CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(80) NOT NULL,
    last_name VARCHAR(80) NOT NULL,
    email VARCHAR(80) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    fk_squad_id UUID,
    is_admin BOOLEAN DEFAULT false
);

CREATE TABLE squad (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    name VARCHAR(80) UNIQUE NOT NULL,
    fk_leader_id UUID NOT NULL REFERENCES users (id)
);

ALTER TABLE users
ADD CONSTRAINT fk_squad_id FOREIGN KEY (fk_squad_id) REFERENCES squad (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE SET NULL NOT VALID;