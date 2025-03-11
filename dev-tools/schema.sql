-- Create a new database schema
create database if not exists isitwet_db;

-- Use the created database
use isitwet_db;

-- Create tables
create table if not exists location (
    latitude float(23) not null,
    longitude float(23) not null,
    id bigint not null,
    name varchar(255) not null unique,
    primary key (id)
);
create table if not exists location_seq (
    next_val bigint
);
insert into location_seq values ( 1 );