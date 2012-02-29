#!/usr/bin/env groovy

import java.util.Random

// Description: Generate default sample rows for the following tables:
//              - HOLDING
//              - ACCOUNTPROFILE
//              - QUOTE
//              - ACCOUNT
//              - order

// Usage: groovy initdb.groovy

defaultNumberOfQuotes = 100
defaultNumberOfUsers = 100
defaultNumberOfOrders = 10
defaultNumberOfHoldings = 10

sqlFile = "initdb.sql"
defaultStockQuotes = "nasdaq-100.txt"
defaultNames = "names-100.txt"

defaultQuoteRowList = [][]
defaultAccountProfileRowList = [][]
defaultAccountRowList = [][]
defaultHoldingRowList = [][]
defaultOrderRowList = [][]

quoteSymbolList = []

def generateDefaultOrders() {
  Random rand = new Random()
  int orderCount = 0
  int quoteIndex = 0
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
      toggle = rand.nextInt(10)
      if (toggle <= 5) {
        orderStatus = "Complete"
      }
      else {
        orderStatus = "Progress"
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

      defaultOrderRowList << defaultOrderRow
    }
  }
}

def generateDefaultHoldings() {
  Random rand = new Random()
  int quoteIndex = 0

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

      defaultHoldingRowList << defaultHoldingRow
    }
  }
}

def generateDefaultAccounts() {
  int balance = 1000000
  int count = 0
  Random rand = new Random()

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

    defaultAccountRowList << defaultAccountRow
  }
}

def generateDefaultAccountProfiles() {
  long creditCardNumber = 1111222233330000

  new File(defaultNames).eachLine { line ->
    name = line.trim().toLowerCase()
    Random rand = new Random()
    newCreditCardNumber = creditCardNumber + rand.nextInt(1000)
    defaultAccountProfileRow = []
    defaultAccountProfileRow << 1
    defaultAccountProfileRow << name + " Street"
    defaultAccountProfileRow << name
    defaultAccountProfileRow << name
    defaultAccountProfileRow << name + "@company.com"
    defaultAccountProfileRow << newCreditCardNumber
    defaultAccountProfileRow << name + " " + name.substring(0,1)

    defaultAccountProfileRowList << defaultAccountProfileRow
  }
}

def generateDefaultStockQuotes() {
  int stockPrice = 200
  int stockVolume = 5000000

  new File(defaultStockQuotes).eachLine { line ->
    i = line.lastIndexOf(" ")
    quote = line.substring(i, line.length())
    companyName = line.substring(0, i)
    quote = quote.trim()
    companyName = companyName.trim()
    if (companyName.indexOf("'") >= 0) {
      //print "found " + companyName
      companyName = companyName.replace("'", " ")
    }
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

    defaultQuoteRowList << defaultQuoteRow
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

def generateInsertQuoteSQL(writer) {
  for (row in defaultQuoteRowList) {
    insertQuoteSQL = insertQuoteSQLTemplate
    //insertQuoteSQL = insertQuoteSQL.replace("QUOTEID", row[0]+"")
    insertQuoteSQL = insertQuoteSQL.replace("LOW", row[1]+"")
    insertQuoteSQL = insertQuoteSQL.replace("OPEN1", row[2]+"")
    insertQuoteSQL = insertQuoteSQL.replace("VOLUME", row[3]+"")
    insertQuoteSQL = insertQuoteSQL.replace("PRICE", row[4]+"")
    insertQuoteSQL = insertQuoteSQL.replace("HIGH", row[5]+"")
    insertQuoteSQL = insertQuoteSQL.replace("COMPANYNAME", row[6]+"")
    insertQuoteSQL = insertQuoteSQL.replace("SYMBOL", row[7]+"")
    insertQuoteSQL = insertQuoteSQL.replace("CHANGE1", row[8]+"")

    writer.write(insertQuoteSQL + "\n")
  }
}

def generateInsertAccountProfileSQL(writer) {
  for (row in defaultAccountProfileRowList) {
    insertAccountProfileSQL = insertAccountProfileSQLTemplate
    //insertAccountProfileSQL = insertAccountProfileSQL.replace("PROFILEID", row[0]+"")
    insertAccountProfileSQL = insertAccountProfileSQL.replace("ADDRESS", row[1]+"")
    insertAccountProfileSQL = insertAccountProfileSQL.replace("PASSWD", row[2]+"")
    insertAccountProfileSQL = insertAccountProfileSQL.replace("USERID", row[3]+"")
    insertAccountProfileSQL = insertAccountProfileSQL.replace("EMAIL", row[4]+"")
    insertAccountProfileSQL = insertAccountProfileSQL.replace("CREDITCARD", row[5]+"")
    insertAccountProfileSQL = insertAccountProfileSQL.replace("FULLNAME", row[6]+"")

    writer.write(insertAccountProfileSQL + "\n")
  }
}

def generateInsertAccountSQL(writer) {
  for (row in defaultAccountRowList) {
    insertAccountSQL = insertAccountSQLTemplate
    insertAccountSQL = insertAccountSQL.replace("CREATIONDATE", row[0]+"")
    insertAccountSQL = insertAccountSQL.replace("OPENBALANCE", row[1]+"")
    insertAccountSQL = insertAccountSQL.replace("LOGOUTCOUNT", row[2]+"")
    insertAccountSQL = insertAccountSQL.replace("BALANCE", row[3]+"")
    //insertAccountSQL = insertAccountSQL.replace("ACCOUNTID", row[4]+"")
    insertAccountSQL = insertAccountSQL.replace("LASTLOGIN", row[5]+"")
    insertAccountSQL = insertAccountSQL.replace("LOGINCOUNT", row[6]+"")
    insertAccountSQL = insertAccountSQL.replace("PROFILE_PROFILEID", row[7]+"")

    writer.write(insertAccountSQL + "\n")
  }
}

def generateInsertHoldingSQL(writer) {
  for (row in defaultHoldingRowList) {
    insertHoldingSQL = insertHoldingSQLTemplate
    insertHoldingSQL = insertHoldingSQL.replace("PURCHASEPRICE", row[0]+"")
    //insertHoldingSQL = insertHoldingSQL.replace("HOLDINGID", row[1]+"")
    insertHoldingSQL = insertHoldingSQL.replace("QUANTITY", row[2]+"")
    insertHoldingSQL = insertHoldingSQL.replace("PURCHASEDATE", row[3]+"")
    insertHoldingSQL = insertHoldingSQL.replace("ACCOUNT_ACCOUNTID", row[4]+"")
    insertHoldingSQL = insertHoldingSQL.replace("QUOTE_SYMBOL", row[5]+"")

    writer.write(insertHoldingSQL + "\n")
  }
}

def generateInsertOrderSQL(writer) {
  for (row in defaultOrderRowList) {
    insertOrderSQL = insertOrderSQLTemplate
    insertOrderSQL = insertOrderSQL.replace("ORDERFEE", row[0]+"")
    insertOrderSQL = insertOrderSQL.replace("COMPLETIONDATE", row[1]+"")
    insertOrderSQL = insertOrderSQL.replace("ORDERTYPE", row[2]+"")
    insertOrderSQL = insertOrderSQL.replace("ORDERSTATUS", row[3]+"")
    insertOrderSQL = insertOrderSQL.replace("PRICE", row[4]+"")
    insertOrderSQL = insertOrderSQL.replace("QUANTITY", row[5]+"")
    insertOrderSQL = insertOrderSQL.replace("OPENDATE", row[6]+"")
    //insertOrderSQL = insertOrderSQL.replace("ORDERID", row[7]+"")
    insertOrderSQL = insertOrderSQL.replace("ACCOUNT_ACCOUNTID", row[8]+"")
    insertOrderSQL = insertOrderSQL.replace("QUOTE_SYMBOL", row[9]+"")
    insertOrderSQL = insertOrderSQL.replace("HOLDING_HOLDINGID", row[10]+"")

    writer.write(insertOrderSQL + "\n")
  }
}

generateDefaultStockQuotes()
generateDefaultAccountProfiles()
generateDefaultAccounts()
generateDefaultHoldings()
generateDefaultOrders()

generateInsertQuoteSQL(writer)
generateInsertAccountProfileSQL(writer)
generateInsertAccountSQL(writer)
generateInsertHoldingSQL(writer)
generateInsertOrderSQL(writer)

writer.close()



