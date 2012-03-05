#!/usr/bin/env groovy

import groovy.sql.Sql;
import java.util.Random

// Description: Generate default sample rows for the following tables:
//              - HOLDING
//              - ACCOUNTPROFILE
//              - QUOTE
//              - ACCOUNT
//              - order

// assuming postgres jdbc jar is downloaded
// Usage: groovy -cp ~/Downloads/postgresql-9.1-901.jdbc4.jar configdb.groovy

defaultUser = "user"
defaultQuote = "s"

defaultNumberOfQuotes = 500
defaultNumberOfUsers = 50000
defaultNumberOfOrders = 10
defaultNumberOfHoldings = 10

BATCH_SIZE = 5000

sqlFile = "configdb.sql"

quoteSymbolList = []

sqlList = [][]

def sql = Sql.newInstance("jdbc:postgresql://localhost:" + "5432/nanotrader", "wkoh", "", "org.postgresql.Driver")

def generateDefaultOrders(sql) {
  Random rand = new Random()
  int orderCount = 0
  int quoteIndex = 0
  sqlList.clear()
  defaultNumberOfUsers.times { count ->
    accountId = count + 1
    defaultNumberOfOrders.times {
      orderCount++
      float orderFee = 9.99
      def completionDate = "03/03/2012"
      def orderType = ""
      def orderStatus = ""
      def toggle = rand.nextInt(10)
      if (toggle <= 5) {
        orderType = "Buy"
      }
      else {
        orderType = "Sell"
      }
      toggle = rand.nextInt(5)
      if (toggle == 0) {
        orderStatus = "Open"
      }
      else if (toggle == 1) {
        orderStatus = "Closed"
      }
      else {
        orderStatus = "Completed"
      }
      float price = rand.nextInt(200) + Float.parseFloat(String.format("%.2f", rand.nextFloat()))
      price = Float.parseFloat(String.format("%.2f", price))
      int quantity = rand.nextInt(5000)
      if (quantity <= 100) { quantity += 100 }
      def openDate = "03/03/2012"
      defaultOrderRow = []
      defaultOrderRow << orderFee
      defaultOrderRow << completionDate
      defaultOrderRow << orderType
      defaultOrderRow << orderStatus
      defaultOrderRow << price
      defaultOrderRow << quantity
      defaultOrderRow << openDate
      defaultOrderRow << 1
      defaultOrderRow << accountId
      defaultOrderRow << quoteSymbolList[quoteIndex++]
      defaultOrderRow << orderCount

      if (quoteIndex >= defaultNumberOfQuotes) {
        quoteIndex = 0
      }

      insertOrderSQL = insertOrderSQLTemplate
      insertOrderSQL = insertOrderSQL.replace("ORDERFEE", defaultOrderRow[0]+"")
      insertOrderSQL = insertOrderSQL.replace("COMPLETIONDATE", defaultOrderRow[1]+"")
      insertOrderSQL = insertOrderSQL.replace("ORDERTYPE", defaultOrderRow[2]+"")
      insertOrderSQL = insertOrderSQL.replace("ORDERSTATUS", defaultOrderRow[3]+"")
      insertOrderSQL = insertOrderSQL.replace("PRICE", defaultOrderRow[4]+"")
      insertOrderSQL = insertOrderSQL.replace("QUANTITY", defaultOrderRow[5]+"")
      insertOrderSQL = insertOrderSQL.replace("OPENDATE", defaultOrderRow[6]+"")
      //insertOrderSQL = insertOrderSQL.replace("ORDERID", defaultOrderRow[7]+"")
      insertOrderSQL = insertOrderSQL.replace("ACCOUNT_ACCOUNTID", defaultOrderRow[8]+"")
      insertOrderSQL = insertOrderSQL.replace("QUOTE_SYMBOL", defaultOrderRow[9]+"")
      insertOrderSQL = insertOrderSQL.replace("HOLDING_HOLDINGID", defaultOrderRow[10]+"")

      sqlList << insertOrderSQL
      //sql.executeInsert insertOrderSQL

      if (sqlList.size() == BATCH_SIZE) {
        sql.connection.autoCommit = false
        sql.withBatch(BATCH_SIZE) { stmt ->
          sqlList.size().times { i ->
            stmt.addBatch(sqlList[i])
          }
        }
        sql.connection.commit()
        sqlList.clear()
      }
      //writer.write(insertOrderSQL + "\n")
    }
  }
  if (sqlList.size() > 0) {
    sql.connection.autoCommit = false
    sql.withBatch(BATCH_SIZE) { stmt ->
      sqlList.size().times { i ->
        stmt.addBatch(sqlList[i])
      }
    }
    sql.connection.commit()
    sqlList.clear()
  }
}

def generateDefaultHoldings(sql) {
  Random rand = new Random()
  int quoteIndex = 0
  sqlList.clear()
  defaultNumberOfUsers.times { count ->
    accountId = count + 1
    defaultNumberOfHoldings.times {
      float purchasePrice = rand.nextInt(200) + Float.parseFloat(String.format("%.2f", rand.nextFloat()))
      purchasePrice = Float.parseFloat(String.format("%.2f", purchasePrice))
      def purchaseDate = "03/03/2012"
      int quantity = rand.nextInt(5000)
      if (quantity <= 100) { quantity += 100 }
      defaultHoldingRow = []
      defaultHoldingRow << purchasePrice
      defaultHoldingRow << 1
      defaultHoldingRow << quantity
      defaultHoldingRow << purchaseDate
      defaultHoldingRow << accountId
      defaultHoldingRow << quoteSymbolList[quoteIndex++]

      if (quoteIndex >= defaultNumberOfQuotes) {
        quoteIndex = 0
      }

      insertHoldingSQL = insertHoldingSQLTemplate
      insertHoldingSQL = insertHoldingSQL.replace("PURCHASEPRICE", defaultHoldingRow[0]+"")
      //insertHoldingSQL = insertHoldingSQL.replace("HOLDINGID", defaultHoldingRow[1]+"")
      insertHoldingSQL = insertHoldingSQL.replace("QUANTITY", defaultHoldingRow[2]+"")
      insertHoldingSQL = insertHoldingSQL.replace("PURCHASEDATE", defaultHoldingRow[3]+"")
      insertHoldingSQL = insertHoldingSQL.replace("ACCOUNT_ACCOUNTID", defaultHoldingRow[4]+"")
      insertHoldingSQL = insertHoldingSQL.replace("QUOTE_SYMBOL", defaultHoldingRow[5]+"")

      sqlList << insertHoldingSQL
      //writer.write(insertHoldingSQL + "\n")
      //sql.executeInsert insertHoldingSQL
      //sql.withBatch(BATCH_SIZE) { stmt ->
       // stmt.addBatch(insertHoldingSQL)
      //}
      if (sqlList.size() == BATCH_SIZE) {
        sql.connection.autoCommit = false
        sql.withBatch(BATCH_SIZE) { stmt ->
          sqlList.size().times { i ->
            stmt.addBatch(sqlList[i])
          }
        }
        sql.connection.commit()
        sqlList.clear()
      }
    }
  }
  if (sqlList.size() > 0) {
    sql.connection.autoCommit = false
    sql.withBatch(BATCH_SIZE) { stmt ->
      sqlList.size().times { i ->
        stmt.addBatch(sqlList[i])
      }
    }
    sql.connection.commit()
    sqlList.clear()
  }
}

def generateDefaultAccounts(sql) {
  int balance = 1000000
  int count = 0
  Random rand = new Random()
  sqlList.clear()

  defaultNumberOfUsers.times {
    float openBalance = rand.nextInt(balance) + Float.parseFloat(String.format("%.2f", rand.nextFloat()))
    float currentBalance = openBalance + rand.nextInt(1000) + Float.parseFloat(String.format("%.2f", rand.nextFloat()))
    openBalance = Float.parseFloat(String.format("%.2f", openBalance))
    currentBalance = Float.parseFloat(String.format("%.2f", currentBalance))
    defaultAccountRow = []
    defaultAccountRow << "2011/03/03"
    defaultAccountRow << openBalance
    defaultAccountRow << rand.nextInt(10)
    defaultAccountRow << currentBalance
    defaultAccountRow << 1
    defaultAccountRow << "2011/03/15"
    defaultAccountRow << rand.nextInt(10)
    defaultAccountRow << ++count

    insertAccountSQL = insertAccountSQLTemplate
    insertAccountSQL = insertAccountSQL.replace("CREATIONDATE", defaultAccountRow[0]+"")
    insertAccountSQL = insertAccountSQL.replace("OPENBALANCE", defaultAccountRow[1]+"")
    insertAccountSQL = insertAccountSQL.replace("LOGOUTCOUNT", defaultAccountRow[2]+"")
    insertAccountSQL = insertAccountSQL.replace("BALANCE", defaultAccountRow[3]+"")
    //insertAccountSQL = insertAccountSQL.replace("ACCOUNTID", defaultAccountRow[4]+"")
    insertAccountSQL = insertAccountSQL.replace("LASTLOGIN", defaultAccountRow[5]+"")
    insertAccountSQL = insertAccountSQL.replace("LOGINCOUNT", defaultAccountRow[6]+"")
    insertAccountSQL = insertAccountSQL.replace("PROFILE_PROFILEID", defaultAccountRow[7]+"")

    sqlList << insertAccountSQL

    if (sqlList.size() == BATCH_SIZE) {
      sql.connection.autoCommit = false
      sql.withBatch(BATCH_SIZE) { stmt ->
        sqlList.size().times { i ->
          stmt.addBatch(sqlList[i])
        }
      }
      sql.connection.commit()
      sqlList.clear()
    }
    //writer.write(insertAccountSQL + "\n")
    //sql.executeInsert insertAccountSQL
    //sql.withBatch(BATCH_SIZE) { stmt ->
     // stmt.addBatch(insertAccountSQL)
    //}
  }
  if (sqlList.size() > 0) {
    sql.connection.autoCommit = false
    sql.withBatch(BATCH_SIZE) { stmt ->
      sqlList.size().times { i ->
        stmt.addBatch(sqlList[i])
      }
    }
    sql.connection.commit()
    sqlList.clear()
  }
}

def generateDefaultAccountProfiles(sql) {
  long creditCardNumber = 1111222233330000
  sqlList.clear()

  defaultNumberOfUsers.times { count ->
    name = defaultUser + count
    Random rand = new Random()
    newCreditCardNumber = creditCardNumber + rand.nextInt(1000)
    defaultAccountProfileRow = []
    defaultAccountProfileRow << 1
    defaultAccountProfileRow << name + " Street"
    defaultAccountProfileRow << name
    defaultAccountProfileRow << name
    defaultAccountProfileRow << name + "@company.com"
    defaultAccountProfileRow << newCreditCardNumber
    defaultAccountProfileRow << name

    insertAccountProfileSQL = insertAccountProfileSQLTemplate
    //insertAccountProfileSQL = insertAccountProfileSQL.replace("PROFILEID", defaultAccountProfileRow[0]+"")
    insertAccountProfileSQL = insertAccountProfileSQL.replace("ADDRESS", defaultAccountProfileRow[1]+"")
    insertAccountProfileSQL = insertAccountProfileSQL.replace("PASSWD", defaultAccountProfileRow[2]+"")
    insertAccountProfileSQL = insertAccountProfileSQL.replace("USERID", defaultAccountProfileRow[3]+"")
    insertAccountProfileSQL = insertAccountProfileSQL.replace("EMAIL", defaultAccountProfileRow[4]+"")
    insertAccountProfileSQL = insertAccountProfileSQL.replace("CREDITCARD", defaultAccountProfileRow[5]+"")
    insertAccountProfileSQL = insertAccountProfileSQL.replace("FULLNAME", defaultAccountProfileRow[6]+"")

    sqlList << insertAccountProfileSQL

    //writer.write(insertAccountProfileSQL + "\n")
    //sql.executeInsert insertAccountProfileSQL
    //sql.withBatch(BATCH_SIZE) { stmt ->
      //stmt.addBatch(insertAccountProfileSQL)
    //}
     if (sqlList.size() == BATCH_SIZE) {
       sql.connection.autoCommit = false
       sql.withBatch(BATCH_SIZE) { stmt ->
         sqlList.size().times { i ->
           stmt.addBatch(sqlList[i])
         }
       }
       sql.connection.commit()
       sqlList.clear()
     }
  }
  if (sqlList.size() > 0) {
    sql.connection.autoCommit = false
    sql.withBatch(BATCH_SIZE) { stmt ->
      sqlList.size().times { i ->
        stmt.addBatch(sqlList[i])
      }
    }
    sql.connection.commit()
    sqlList.clear()
  }
}

def generateDefaultStockQuotes(sql) {
  int stockPrice = 200
  int stockVolume = 5000000
  sqlList.clear()

  defaultNumberOfQuotes.times { count ->
    quote = defaultQuote + count
    companyName = quote + " Company"
    quoteSymbolList << quote
    Random rand = new Random()
    float lowStockPrice = rand.nextInt(stockPrice)
    float decimalPoint = Float.parseFloat(String.format("%.2f", rand.nextFloat()))
    lowStockPrice += decimalPoint
    lowStockPrice = Float.parseFloat(String.format("%.2f", lowStockPrice))
    float openStockPrice = lowStockPrice + rand.nextInt(20)
    openStockPrice = Float.parseFloat(String.format("%.2f", openStockPrice))
    float currentStockPrice = lowStockPrice + rand.nextInt(20)
    currentStockPrice = Float.parseFloat(String.format("%.2f", currentStockPrice))
    float highStockPrice = lowStockPrice + rand.nextInt(20)
    highStockPrice = Float.parseFloat(String.format("%.2f", highStockPrice))
    int changeStockPrice = rand.nextInt(20)
    defaultQuoteRow = []
    defaultQuoteRow << 1
    defaultQuoteRow << lowStockPrice
    defaultQuoteRow << openStockPrice
    defaultQuoteRow << rand.nextInt(stockVolume)
    defaultQuoteRow << currentStockPrice
    defaultQuoteRow << highStockPrice
    defaultQuoteRow << companyName
    defaultQuoteRow << quote
    defaultQuoteRow << changeStockPrice

    insertQuoteSQL = insertQuoteSQLTemplate
    //insertQuoteSQL = insertQuoteSQL.replace("QUOTEID", defaultQuoteRow[0]+"")
    insertQuoteSQL = insertQuoteSQL.replace("LOW", defaultQuoteRow[1]+"")
    insertQuoteSQL = insertQuoteSQL.replace("OPEN1", defaultQuoteRow[2]+"")
    insertQuoteSQL = insertQuoteSQL.replace("VOLUME", defaultQuoteRow[3]+"")
    insertQuoteSQL = insertQuoteSQL.replace("PRICE", defaultQuoteRow[4]+"")
    insertQuoteSQL = insertQuoteSQL.replace("HIGH", defaultQuoteRow[5]+"")
    insertQuoteSQL = insertQuoteSQL.replace("COMPANYNAME", defaultQuoteRow[6]+"")
    insertQuoteSQL = insertQuoteSQL.replace("SYMBOL", defaultQuoteRow[7]+"")
    insertQuoteSQL = insertQuoteSQL.replace("CHANGE1", defaultQuoteRow[8]+"")

    sqlList << insertQuoteSQL

    //writer.write(insertQuoteSQL + "\n")
    //sql.executeInsert insertQuoteSQL
    //sql.withBatch(BATCH_SIZE) { stmt ->
      //stmt.addBatch(insertQuoteSQL)
    //}
    if (sqlList.size() == BATCH_SIZE) {
      sql.connection.autoCommit = false
      sql.withBatch(BATCH_SIZE) { stmt ->
        sqlList.size().times { i ->
          stmt.addBatch(sqlList[i])
        }
      }
      sql.connection.commit()
      sqlList.clear()
    }
  }
  if (sqlList.size() > 0) {
    sql.connection.autoCommit = false
    sql.withBatch(BATCH_SIZE) { stmt ->
      sqlList.size().times { i ->
        stmt.addBatch(sqlList[i])
      }
    }
    sql.connection.commit()
    sqlList.clear()
  }
}

def p(myList) {
 for (item in myList) {
   println item
 }
}

insertHoldingSQLTemplate = "INSERT INTO HOLDING VALUES(PURCHASEPRICE, nextval('holding_sequence'), QUANTITY, 'PURCHASEDATE', ACCOUNT_ACCOUNTID, 'QUOTE_SYMBOL');"
insertAccountProfileSQLTemplate = "INSERT INTO ACCOUNTPROFILE VALUES(nextval('accountprofile_sequence'), 'ADDRESS', 'PASSWD', 'USERID', 'EMAIL', 'CREDITCARD', 'FULLNAME');"
insertQuoteSQLTemplate = "INSERT INTO QUOTE VALUES(nextval('quote_sequence'), LOW, OPEN1, VOLUME, PRICE, HIGH, 'COMPANYNAME', 'SYMBOL', CHANGE1);"
insertAccountSQLTemplate = "INSERT INTO ACCOUNT VALUES('CREATIONDATE', OPENBALANCE, LOGOUTCOUNT, BALANCE, nextval('account_sequence'), 'LASTLOGIN', LOGINCOUNT, PROFILE_PROFILEID);"
insertOrderSQLTemplate = "INSERT INTO \"order\" VALUES(ORDERFEE, 'COMPLETIONDATE', 'ORDERTYPE', 'ORDERSTATUS', PRICE, QUANTITY, 'OPENDATE', nextval('order_sequence'), ACCOUNT_ACCOUNTID, 'QUOTE_SYMBOL', HOLDING_HOLDINGID);"

writer = new File(sqlFile).newWriter("UTF-8", false)

generateDefaultStockQuotes(sql)
generateDefaultAccountProfiles(sql)
generateDefaultAccounts(sql)
generateDefaultHoldings(sql)
generateDefaultOrders(sql)

writer.close()



