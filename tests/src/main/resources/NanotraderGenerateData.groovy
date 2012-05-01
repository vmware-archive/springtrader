import groovy.util.*
import groovy.json.JsonSlurper
import org.codehays.groovy.runtime.*
import org.nanotrader.*
import au.com.bytecode.opencsv.CSVReader
import groovy.sql.Sql

/*
 userdata represents an array list
 Initial data for the list is read from a csv file. Following fields in the list are populated at runtime:
     authtoken
     accountid
     orderids

 Here's representation of each field in the list:
   [username, password, authtoken, accountid, Quotes to buy (seperated by ":" ), Number of quotes to sell (should be <= # of buy quotes), order ids to be used for sell (seperated by ":" ), open balance]

 Example in csv:
   kashyap,passwd,token,id,ATVI:ADBE:AKAM:AMZN,2,orderids,100000.00
 
Example after populated at runtime:
   kashyap,passwd,e0480709-4063-416e-a3ce-361025d4fc61,101,ATVI:ADBE:AKAM:AMZN,2,500:501,100000.00

*/
List userdata

String host = "localhost"
String port = "8080"
String apiURL = "http://" + host + ":" + port
String dbHost = "localhost"
String dbUser = "nanotrader"
String dbPasswd = "nanotrader"
// ref to properties
def p
 
def loadProps() {
  def props = new Properties()
  new File("nanotrader.properties").withInputStream { 
    stream -> props.load(stream) 
  }
  p = new ConfigSlurper().parse(props)
  apiURL = "http://" + p.appServerHost + ":" + p.appServerPort
}

def createQuotes() {
  def sql = Sql.newInstance("jdbc:postgresql://" + p.dbHost + ":" +
       "5432/nanotrader", p.dbUser , p.dbPasswd, 
       "org.postgresql.Driver")
  query = "select count(*) from quote"
  quoteCount = sql.firstRow(query)
  if (quoteCount.count == 0) {
    // populate quote table 
    query = "insert into quote (quoteid, low, open1, volume, price, high, companyname, symbol, change1) " + 
            "values (nextval('quote_sequence'),?,?,?,?,?,?,?,?)"
    char seperator = ':'
    CSVReader reader = new CSVReader(new FileReader("quote.csv"), seperator)
    quoteData = reader.readAll()
    quoteData.eachWithIndex() { o, i ->
        sql.executeInsert query, o[0].toDouble(), o[1].toDouble(), o[2].toInteger(), o[3].toDouble(), o[4].toDouble(), o[5], o[6], o[7].toInteger()
    }
  }
}

def registerUsers() {
  def client = new NanoTraderRESTClient(path: apiURL)
  client.createFirstUser()
  client.init()
  // read names.csv in to a List
  CSVReader reader = new CSVReader(new FileReader("names.csv"))
  userdata = reader.readAll();
  // register all users in userdata List
  println "Creating users..."
  userdata.eachWithIndex() { obj, i ->
    def username = obj[0]
    def password = obj[1]
    def openbal = obj[7].toInteger()
    //println "Registering [" + i + "] ::" + obj[0] + " | " + obj[1]
    try {
      client.createAccountProfile(username, false, 201, password, openbal)
    } catch (ex) {
      //println "Failed to register user :: " + username + " (HTTP response = [" + ex.getMessage() + "])"
    } 
  }
}

def getTokens() {
  def client = new NanoTraderRESTClient(path: apiURL)
  client.init()
  // get authToken and account id for users in userdata List
  // Note: Remember to call rgisterUsers() before calling this function
  userdata.eachWithIndex() { obj, i ->
    def username = obj[0]
    def password = obj[1]
    def jsonResponse = client.getAuthToken(username, password)
    userdata[i][2] =  jsonResponse.authToken
    userdata[i][3] =  jsonResponse.accountid
  }
}

def buyOrders() {
  userdata.eachWithIndex() { obj, i ->
    println "Creating buy orders for user -> " + obj[0]
    int acctid = obj[3].toInteger()
    authToken = obj[2]
    def client = new NanoTraderRESTClient(path: apiURL)
    client.init()
    //read 4th column from names.cvs and split around ":" to get buy symbols
    def quoteArray = obj[4].split(":")
    //println " Bye order for : " + obj[0] + "  " + authToken + "  " + acctid
    def orderids = new StringBuffer()
    quoteArray.each { 
      // Call buy api 
      random = new Random()
      int orderid = client.createOrder(acctid, random.nextInt(50) + 100, "buy", it, true, 201, authToken)
      //println " orderid =" + orderid
      orderids.append(orderid + ":")
    }
    userdata[i][6] = orderids.toString()
  } 
  //println "userdata after buy :: " + userdata
}

def sellOrders() {
  userdata.eachWithIndex() { obj, i ->
    println "Creating sell orders for user -> " + obj[0]
    int acctid = obj[3].toInteger()
    def authToken = obj[2]
    def orderArray = obj[6].split(":")
    def client = new NanoTraderRESTClient(path: apiURL)
    client.init()
    //read 5th column from names.cvs to get count of sell orders
    int sellCount = obj[5].toInteger()
    //println " Sell order for : " + obj[0] + "  " + obj[6]
    sellCount.times { 
      // Call sell api
      // println "   Selling  -> " + it
      def orderdetail = client.getOrder(acctid, orderArray[it].toInteger(), authToken)
      def holdingid = new JsonSlurper().parseText(orderdetail).holdingid
      client.createSellOrder(acctid, holdingid, true, 201, authToken)
    }
  } 
}

loadProps()
createQuotes()
registerUsers()
getTokens()
buyOrders()
sellOrders()
