
-- Run as POSTGRES/administrator user
-- Creates database an user
DROP DATABASE IF EXISTS nanotrader;
DROP USER IF EXISTS nanotrader;

CREATE USER nanotrader WITH 
	CREATEDB 
	CREATEUSER 
	PASSWORD 'nanotrader';
CREATE DATABASE nanotrader OWNER nanotrader;
