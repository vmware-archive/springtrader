ALTER TABLE ORDERS
    DROP CONSTRAINT FKC3DF62E518A618B8;

ALTER TABLE ORDERS
    DROP CONSTRAINT FKC3DF62E5D2E54D7A;

ALTER TABLE ACCOUNT
    DROP CONSTRAINT FKE49F160D2BA34895;

-- ----------------------------------------------------------------------- 
-- QUOTE 
-- ----------------------------------------------------------------------- 

DROP TABLE QUOTE;

-- ----------------------------------------------------------------------- 
-- ORDERS 
-- ----------------------------------------------------------------------- 

DROP TABLE ORDERS;

-- ----------------------------------------------------------------------- 
-- HOLDING 
-- ----------------------------------------------------------------------- 

DROP TABLE HOLDING;

-- ----------------------------------------------------------------------- 
-- HIBERNATE_SEQUENCES 
-- ----------------------------------------------------------------------- 

DROP TABLE HIBERNATE_SEQUENCES;

-- ----------------------------------------------------------------------- 
-- ACCOUNTPROFILE 
-- ----------------------------------------------------------------------- 

DROP TABLE ACCOUNTPROFILE;

-- ----------------------------------------------------------------------- 
-- ACCOUNT 
-- ----------------------------------------------------------------------- 

DROP TABLE ACCOUNT;

-- ----------------------------------------------------------------------- 
-- PROCEDURE CHAOSFUNCTION 
-- ----------------------------------------------------------------------- 

DROP PROCEDURE CHAOSFUNCTION;

-- ----------------------------------------------------------------------- 
-- ACCOUNT 
-- ----------------------------------------------------------------------- 

CREATE TABLE ACCOUNT
(
    ACCOUNTID INTEGER NOT NULL,
    BALANCE NUMERIC(14,2),
    CREATIONDATE DATE,
    LASTLOGIN DATE,
    LOGINCOUNT INTEGER NOT NULL,
    LOGOUTCOUNT INTEGER NOT NULL,
    OPENBALANCE NUMERIC(14,2),
    PROFILE_PROFILEID INTEGER,
    VERSION INTEGER,
    PRIMARY KEY (ACCOUNTID)
)
PERSISTENT SYNCHRONOUS
REDUNDANCY 1
PARTITION BY PRIMARY KEY;

-- ----------------------------------------------------------------------- 
-- ACCOUNTPROFILE 
-- ----------------------------------------------------------------------- 

CREATE TABLE ACCOUNTPROFILE
(
    PROFILEID INTEGER NOT NULL,
    ADDRESS VARCHAR(250),
    AUTHTOKEN VARCHAR(100),
    CREDITCARD VARCHAR(250),
    EMAIL VARCHAR(250),
    FULLNAME VARCHAR(250),
    PASSWD VARCHAR(250),
    USERID VARCHAR(250) NOT NULL,
    PRIMARY KEY (PROFILEID)
)
REDUNDANCY 1
PERSISTENT SYNCHRONOUS;

CREATE UNIQUE INDEX ACCOUNTPROFILE_USERID_KEY ON ACCOUNTPROFILE (USERID);

-- ----------------------------------------------------------------------- 
-- HIBERNATE_SEQUENCES 
-- ----------------------------------------------------------------------- 

CREATE TABLE HIBERNATE_SEQUENCES
(
    SEQUENCE_NAME VARCHAR(255),
    SEQUENCE_NEXT_HI_VALUE INTEGER
)PERSISTENT SYNCHRONOUS ;
REDUNDANCY 1
-- ----------------------------------------------------------------------- 
-- HOLDING 
-- ----------------------------------------------------------------------- 

CREATE TABLE HOLDING
(
    HOLDINGID INTEGER NOT NULL,
    ACCOUNT_ACCOUNTID INTEGER,
    PURCHASEDATE DATE,
    PURCHASEPRICE NUMERIC(14,2),
    QUANTITY NUMERIC(14,0) NOT NULL,
    QUOTE_SYMBOL VARCHAR(250),
    PRIMARY KEY (HOLDINGID)
)
REDUNDANCY 1
PERSISTENT SYNCHRONOUS
PARTITION BY COLUMN (ACCOUNT_ACCOUNTID)
COLOCATE WITH (ACCOUNT);

-- ----------------------------------------------------------------------- 
-- ORDERS 
-- ----------------------------------------------------------------------- 

CREATE TABLE ORDERS
(
    ORDERID INTEGER NOT NULL,
    COMPLETIONDATE DATE,
    OPENDATE DATE,
    ORDERFEE NUMERIC(14,2),
    ORDERSTATUS VARCHAR(250),
    ORDERTYPE VARCHAR(250),
    PRICE NUMERIC(14,2),
    QUANTITY NUMERIC(19,2) NOT NULL,
    ACCOUNT_ACCOUNTID INTEGER,
    HOLDING_HOLDINGID INTEGER,
    QUOTE_SYMBOL VARCHAR(250),
    PRIMARY KEY (ORDERID)
)
REDUNDANCY 1
PERSISTENT SYNCHRONOUS
PARTITION BY COLUMN (ACCOUNT_ACCOUNTID)
COLOCATE WITH (ACCOUNT);

-- ----------------------------------------------------------------------- 
-- QUOTE 
-- ----------------------------------------------------------------------- 

CREATE TABLE QUOTE
(
    QUOTEID INTEGER NOT NULL,
    LOW NUMERIC(14,2),
    OPEN1 NUMERIC(14,2),
    VOLUME NUMERIC(19,2) NOT NULL,
    PRICE NUMERIC(14,2),
    HIGH NUMERIC(14,2),
    COMPANYNAME VARCHAR(250),
    SYMBOL VARCHAR(250) NOT NULL,
    CHANGE1 NUMERIC(19,2) NOT NULL,
    VERSION INTEGER,
    PRIMARY KEY (QUOTEID)
)
PERSISTENT SYNCHRONOUS
REDUNDANCY 1;
--PARTITION BY COLUMN (SYMBOL);
--PARTITION BY RANGE (SYMBOL)
--(
--  VALUES BETWEEN 'A' AND 'H',
--  VALUES BETWEEN 'I' AND 'P',
--  VALUES BETWEEN 'Q' AND 'Z'
--);

CREATE UNIQUE INDEX QUOTE_SYMBOL_KEY ON QUOTE (SYMBOL);

ALTER TABLE ACCOUNT
    ADD CONSTRAINT FKE49F160D2BA34895 FOREIGN KEY (PROFILE_PROFILEID) REFERENCES ACCOUNTPROFILE (PROFILEID);

ALTER TABLE ORDERS
    ADD CONSTRAINT FKC3DF62E518A618B8 FOREIGN KEY (ACCOUNT_ACCOUNTID) REFERENCES ACCOUNT (ACCOUNTID);

ALTER TABLE ORDERS
    ADD CONSTRAINT FKC3DF62E5D2E54D7A FOREIGN KEY (HOLDING_HOLDINGID) REFERENCES HOLDING (HOLDINGID);
    
    
CREATE PROCEDURE CHAOSFUNCTION ()
    
    LANGUAGE JAVA 
    PARAMETER STYLE JAVA 
    READS SQL DATA 
EXTERNAL NAME 'org.springframework.nanotrader.chaos.sqlfire.ChaosFunction.killProcess';
