DROP DATABASE theclothez;
CREATE DATABASE theclothez WITH ENCODING 'UTF8';
\c theclothez
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE USERS (
	user_id uuid DEFAULT uuid_generate_v4(),
	first_name VARCHAR NOT NULL,
	last_name VARCHAR NOT NULL,
    user_name VARCHAR NOT NULL,
    email VARCHAR(254) NOT NULL,
    is_active BOOL DEFAULT true,
    is_enable BOOL DEFAULT true,
    phone_number VARCHAR(20),
    password VARCHAR(254) NOT NULL,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz DEFAULT CURRENT_TIMESTAMP,
    avatar VARCHAR DEFAULT '',
    gender int4,
    dob timestamp,
    permission_id int4 NOT NULL  REFERENCES PERMISSION(permission_id), 
	PRIMARY KEY (user_id)
);