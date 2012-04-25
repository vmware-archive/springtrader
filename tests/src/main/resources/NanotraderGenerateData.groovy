import groovy.util.*
import groovy.json.JsonSlurper
import org.codehays.groovy.runtime.*
import org.nanotrader.*
import au.com.bytecode.opencsv.CSVReader

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

def readArgs() {
  if (args.length == 2) {
    apiURL = "http://" + args[0] + ":" + args[1] 
  } else if (args.length == 1)
      apiURL = "http://" + args[0] + ":8080"
  println "Populating data on : " + apiURL
}

def createQuotes() {
  // populate quote table if not done already
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
  println "Creating buy orders..."
  userdata.eachWithIndex() { obj, i ->
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
  println "Creating sell orders..."
  userdata.eachWithIndex() { obj, i ->
    println "For user -> " + obj[1]
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
      println "   Selling  -> " + it
      def orderdetail = client.getOrder(acctid, orderArray[it].toInteger(), authToken)
      def holdingid = new JsonSlurper().parseText(orderdetail).holdingid
      client.createSellOrder(acctid, holdingid, true, 201, authToken)
    }
  } 
}

readArgs()
registerUsers()
getTokens()
buyOrders()
sellOrders()


