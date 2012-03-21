ALTER TABLE "order"
    DROP CONSTRAINT fk_ord_acct;

ALTER TABLE "order"
    DROP CONSTRAINT fk_ord_hold;

ALTER TABLE account
    DROP CONSTRAINT fk_acct_prof;

-- ----------------------------------------------------------------------- 
-- quote 
-- ----------------------------------------------------------------------- 

DROP TABLE quote;

-- ----------------------------------------------------------------------- 
-- order 
-- ----------------------------------------------------------------------- 

DROP TABLE "order";

-- ----------------------------------------------------------------------- 
-- holding 
-- ----------------------------------------------------------------------- 

DROP TABLE holding;

-- ----------------------------------------------------------------------- 
-- accountprofile 
-- ----------------------------------------------------------------------- 

DROP TABLE accountprofile;

-- ----------------------------------------------------------------------- 
-- account 
-- ----------------------------------------------------------------------- 

DROP TABLE account;

-- ----------------------------------------------------------------------- 
-- account 
-- ----------------------------------------------------------------------- 

CREATE TABLE account
(
    creationdate DATE,
    openbalance NUMERIC(14,2),
    logoutcount INTEGER NOT NULL,
    balance NUMERIC(14,2),
    accountid INTEGER NOT NULL,
    lastlogin DATE,
    logincount INTEGER NOT NULL,
    profile_profileid INTEGER,
    PRIMARY KEY (accountid)
);

-- ----------------------------------------------------------------------- 
-- accountprofile 
-- ----------------------------------------------------------------------- 

CREATE TABLE accountprofile
(
    profileid INTEGER NOT NULL,
    address VARCHAR(250),
    passwd VARCHAR(250),
    userid VARCHAR(250) NOT NULL,
    email VARCHAR(250),
    creditcard VARCHAR(250),
    fullname VARCHAR(250),
    authtoken VARCHAR(100),
    PRIMARY KEY (profileid)
);

CREATE UNIQUE INDEX accountprofile_uniq_accountprofile ON accountprofile (userid);

-- ----------------------------------------------------------------------- 
-- holding 
-- ----------------------------------------------------------------------- 

CREATE TABLE holding
(
    purchaseprice NUMERIC(14,2),
    holdingid INTEGER NOT NULL,
    quantity NUMERIC(14,2) NOT NULL,
    purchasedate DATE,
    account_accountid INTEGER,
    quote_symbol VARCHAR(250),
    PRIMARY KEY (holdingid)
);

CREATE INDEX holding_accountid ON holding (account_accountid);

-- ----------------------------------------------------------------------- 
-- order 
-- ----------------------------------------------------------------------- 

CREATE TABLE "order"
(
    orderfee NUMERIC(14,2),
    completiondate DATE,
    ordertype VARCHAR(250),
    orderstatus VARCHAR(250),
    price NUMERIC(14,2),
    quantity NUMERIC(14,2) NOT NULL,
    opendate DATE,
    orderid INTEGER NOT NULL,
    account_accountid INTEGER,
    quote_symbol VARCHAR(250),
    holding_holdingid INTEGER,
    PRIMARY KEY (orderid)
);

CREATE INDEX order_closed_orders ON "order" (account_accountid, orderstatus);

-- ----------------------------------------------------------------------- 
-- quote 
-- ----------------------------------------------------------------------- 

CREATE TABLE quote
(
    quoteid INTEGER NOT NULL,
    low NUMERIC(14,2),
    open1 NUMERIC(14,2),
    volume NUMERIC(14,2) NOT NULL,
    price NUMERIC(14,2),
    high NUMERIC(14,2),
    companyname VARCHAR(250),
    symbol VARCHAR(250) NOT NULL,
    change1 NUMERIC(14,2) NOT NULL,
    PRIMARY KEY (quoteid)
);

CREATE UNIQUE INDEX quote_uniq_quote ON quote (symbol);

ALTER TABLE account
    ADD CONSTRAINT fk_acct_prof FOREIGN KEY (profile_profileid) REFERENCES accountprofile (profileid);

ALTER TABLE "order"
    ADD CONSTRAINT fk_ord_acct FOREIGN KEY (account_accountid) REFERENCES account (accountid);

ALTER TABLE "order"
    ADD CONSTRAINT fk_ord_hold FOREIGN KEY (holding_holdingid) REFERENCES holding (holdingid);

