#!/usr/bin/env groovy

//groovy -classpath /Users/administrator/Downloads/commons-beanutils-1.8.3/commons-beanutils-1.8.3.jar:/Users/administrator/Downloads/ezmorph-1.0.5.jar:/Users/administrator/Downloads/commons-lang-2.6/commons-lang-2.6.jar:/Users/administrator/Downloads/xerces-2_11_0/xercesImpl.jar:/Users/administrator/Downloads/nekohtml-1.9.15/nekohtml.jar:/Users/administrator/Downloads/commons-collections-3.2.1/commons-collections-3.2.1.jar:/Users/administrator/Downloads/xml-commons-resolver-1.2/resolver.jar:/Users/administrator/Downloads/json-lib-2.3-jdk15.jar:/Users/administrator/Downloads/http-builder-0.5.2.jar:/Users/administrator/Downloads/httpcomponents-client-4.1.3/lib/commons-codec-1.4.jar:/Users/administrator/Downloads/httpcomponents-client-4.1.3/lib/httpclient-4.1.3.jar:/Users/administrator/Downloads/httpcomponents-client-4.1.3/lib/httpcore-4.1.4.jar:/Users/administrator/Downloads/httpcomponents-client-4.1.3/lib/commons-logging-1.1.1.jar:/Users/administrator/Downloads/httpcomponents-client-4.1.3/lib/httpclient-cache-4.1.3.jar:/Users/administrator/Downloads/httpcomponents-client-4.1.3/lib/httpmime-4.1.3.jar NanoTraderRESTClient.groovy
import groovyx.net.http.RESTClient
import groovy.util.slurpersupport.GPathResult
import groovy.json.JsonSlurper

import java.io.FileWriter
import java.io.PrintWriter
import java.io.StringWriter
import java.util.Random
import java.util.logging.*

import static groovyx.net.http.ContentType.URLENC
import static groovyx.net.http.ContentType.JSON
import static groovyx.net.http.ContentType.HTML

path = "http://localhost:8080"
nanotrader = 0
logFile = 0
testAuthToken = 0
acctid = 1
unauthorizedAcctId = 0
dummyUser = 'DummyUser'

totalCount = 0
passCount = 0
failCount = 0

def disableLogger() {
  Handler[] handlers = Logger.getLogger("").getHandlers()
  for (Handler handler : handlers) {
    handler.setLevel(Level.OFF)
  }
}

def init() {
  disableLogger()
  nanotrader = new RESTClient(path)
  logFile = new PrintWriter(new FileWriter("nanotradertest.debug"))
  testAuthToken = getAuthToken()
  //println "Test Auth Token:" + testAuthToken + "\n"
  println "\nStarting tests...\n"
}

def String getAuthToken() {
  String authToken = ""
  int accountid = 1
  def user = "jack"
  def passwd = "jack"
  println "****** Please recreate schema and initialize db with initdb.sql before running tests"
  println "Test User:" + user
  println "Test User Password:" + passwd
  try {
    def path = "/spring-nanotrader-services/api/login"
    def resp = nanotrader.post(path:"${path}",
                              body:[username:user, password:passwd],
                              requestContentType:JSON)
    assert resp.status == 201
    authToken = resp.data
    def jsonObj = new JsonSlurper().parseText(authToken)
    authToken = jsonObj.authToken
    acctid = jsonObj.accountid
    accountid = acctid
    unauthorizedAcctId = acctid + 1
    
    //println "Data:" + resp.data
    println "Using authToken: " + authToken
    println "Using accountid: " + accountid

    return authToken
  }
  catch(ex) {
   ex.printStackTrace()
   throw ex
  }
  return authToken
}

def writeExceptionToFile(ex) {
  StringWriter sw = new StringWriter();
  PrintWriter pw = new PrintWriter(sw, true);
  ex.printStackTrace(pw);
  pw.flush();
  sw.flush();
  logFile.write(sw.toString());
  logFile.flush()
}

def String getOrder(int accountid, int orderid) {
  def orderPath = "/spring-nanotrader-services/api/account/" + accountid + "/order/" + orderid
  def resp = nanotrader.get(path:"${orderPath}",
                            headers:[API_TOKEN:testAuthToken])
  return resp.data
}

def String getOrder(id, status, positive=true, responseCode=200) {
  String data = ""
  try {
    def orderPath = "/spring-nanotrader-services/api/account/" + id + "/order"
    def resp = null
    if (status == "all") {
      resp = nanotrader.get(path:"${orderPath}",
                            headers:[API_TOKEN:testAuthToken])
    }
    else {
     resp = nanotrader.get(path:"${orderPath}",
                           query:[status:"${status}"],
                           headers:[API_TOKEN:testAuthToken])
    }
    if (positive) {
      assert resp.status == 200
      //println "\n\n##################### ORDER DATA #####################"
      data = resp.data
    }
    else {
      assert resp.status == responseCode
    }
  }
  catch(ex) {
    if (!positive) {
      assert ex.response.status == responseCode
    }
    else {
      throw ex
    }
  }
  return data
}

def synchronized int createOrder(id, quantity=555, orderType="buy", symbol="AAPL", positive=true, responseCode=201) {
  int orderId = 0
  try {
    def orderPath = "/spring-nanotrader-services/api/account/" + id + "/order"
    def resp = nanotrader.post(path:"${orderPath}",
                               body:[quantity:quantity, ordertype:orderType, quote:[symbol:symbol]],
                               requestContentType:JSON,
                               headers:[API_TOKEN:testAuthToken])
   if (positive) {
     assert resp.status == 201
     new_id = resp.getFirstHeader('location').getValue()
     i = new_id.lastIndexOf("/")
     new_id = new_id.substring(i+1)
     //println "new_id:" + new_id
     orderId = Integer.parseInt(new_id)
   }
   else {
     assert resp.status == responseCode
   }
  }
  catch(ex) {
    if (!positive) {
      assert ex.response.status == responseCode
    }
    else {
      throw ex
    }
  }
  return orderId
}

def createSellOrder(accountid, holdingid, positive=true, responseCode=201) {
  try {
    def orderPath = "/spring-nanotrader-services/api/account/" + accountid + "/order"
    def resp = nanotrader.post(path:"${orderPath}",
                               body:[holdingid:holdingid, ordertype:'sell'],
                               requestContentType:JSON,
                               headers:[API_TOKEN:testAuthToken])
  }
  catch(ex) {
    if (!positive) {
      assert ex.response.status == responseCode
    }
    else {
      throw ex
    }
  }
}

def updateOrder(accountid, orderid, quantity=5555, positive=true, responseCode=200) {
  try {
    def orderPath = "/spring-nanotrader-services/api/account/" + accountid + "/order/" + orderid
    def resp = nanotrader.put(path:"${orderPath}",
                              body:[quantity:quantity],
                              requestContentType:JSON,
                              headers:[API_TOKEN:testAuthToken])
   if (positive) {
     assert resp.status == 200
   }
   else {
     assert resp.status == responseCode
   }
  }
  catch(ex) {
    if (!positive) {
      assert ex.response.status == responseCode
    }
    else {
      throw ex
    }
  } 
}

def synchronized getAccountProfile(id, positive=true, responseCode=200) {
  try {
    def accountProfilePath = "/spring-nanotrader-services/api/accountProfile/" + id
    def resp = nanotrader.get(path:"${accountProfilePath}",
                              headers:[API_TOKEN:testAuthToken])
    if (positive) {
      assert resp.status == 200
      //println Thread.getName()
      //println "\n\n##################### ACCOUNT PROFILE DATA #####################"
      //println "DATA:" + resp.data + ":"
    }
    else {
      assert resp.status == responseCode
    }
  }
  catch(ex) {
    if (!positive) {
      assert ex.response.status == responseCode
    }
    else {
      throw ex
    }
  }
}

def synchronized String createAccountProfile(user="user1", positive=true, responseCode=200) {
  myUserName = ""
  try {
    userName = ""
    if (positive) {
      Random rand = new Random()
      int range = 10000000
      userName = "randomuser" + rand.nextInt(range)
      now = Calendar.instance
      date = now.time
      millis = date.time
      //println Thread.getName()
      //print "### userName:" + userName + millis
      userName += millis
    }
    else {
      userName = user
    }
    //println "username:" + userName
    def accountProfilePath = "/spring-nanotrader-services/api/accountProfile"
    def resp = nanotrader.post(path:"${accountProfilePath}",
                               requestContentType:JSON,
                               body:[address:"My Random Address",
                                     accounts:[[openbalance:100.00]],
                                     passwd:"randompasswd",
                                     userid:userName,
                                     email:"randomname.company.com",
                                     creditcard:"222222222222",
                                     fullname:userName],
                               headers:[API_TOKEN:testAuthToken])
    if (positive) {
      assert resp.status == 201
      myUserName = userName
      //println "DATA:" + resp.data + ":"
      //location = resp.getFirstHeader('location').getValue()
      //println "location:" + location
    }
    else {
      assert resp.status == responseCode
    }
  }
  catch(ex) {
    if (!positive) {
      assert ex.response.status == responseCode
    }
    else {
      throw ex
    }
  }
  return myUserName
}

def updateAccountProfile(id=1, user=1, password=1, address="new address", positive=true, responseCode=200) {
 try {
    def accountProfilePath = "/spring-nanotrader-services/api/accountProfile/" + id
    def resp = nanotrader.put(path:"${accountProfilePath}",
                              requestContentType:JSON,
                              body:[address:address,
                                    accounts:[[openbalance:200.00]],
                                    userid:user,
                                    passwd:password,
                                    email:"updated email",
                                    creditcard:"666666666666",
                                    fullname:user],
                              headers:[API_TOKEN:testAuthToken])
    if (positive) {
      assert resp.status == 200
      //println "DATA:" + resp.data + ":"
    }
    else {
      assert resp.status == responseCode
    }
  }
  catch(ex) {
    if (!positive) {
      assert ex.response.status == responseCode
    }
    else {
      throw ex
    }
  }
}

def getAccount(id, positive=true, responseCode=200) {
  String data = ""
  try {
    def accountPath = "/spring-nanotrader-services/api/account/" + id
    def resp = nanotrader.get(path:"${accountPath}",
                              headers:[API_TOKEN:testAuthToken])
    if (positive) {
      assert resp.status == 200
      data = resp.data
      //println "\n\n##################### ACCOUNT DATA #####################"
      //println "DATA:" + resp.data + ":"
    }
    else {
      assert resp.status == responseCode
    }
  }
  catch(ex) {
    if (!positive) {
      assert ex.response.status == responseCode
    }
    else {
      throw ex
    }
  }
  return data
}

def getSpecificHoldingForAccount(accountid, holdingid, positive=true, responseCode=200) {
  String data = ""
  try {
    def holdingPath = "/spring-nanotrader-services/api/account/" + accountid + "/holding/" + holdingid
    def resp = nanotrader.get(path:"${holdingPath}",
                              headers:[API_TOKEN:testAuthToken])
    if (positive) {
      assert resp.status == 200
      data = resp.data
      //println "\n\n##################### HOLDING DATA #####################"
      //println "DATA:" + resp.data + ":"
    }
    else {
      assert resp.status == responseCode
    }
  }
  catch(ex) {
   if (!positive) {
      assert ex.response.status == responseCode
    }
    else {
      throw ex
    }
  }
  return data
}

def String getAllHoldingsForAccount(accountid, positive=true, responseCode=200) {
  String data = ""
  try {
    def holdingPath = "/spring-nanotrader-services/api/account/" + accountid + "/holding"
    def resp = nanotrader.get(path:"${holdingPath}",
                              headers:[API_TOKEN:testAuthToken])
    if (positive) {
      assert resp.status == 200
      //println "\n\n##################### HOLDING DATA #####################"
      //println "DATA:" + resp.data + ":"
      data = resp.data
    }
    else {
      assert resp.status == responseCode
    }
  }
  catch(ex) {
   if (!positive) {
      assert ex.response.status == responseCode
    }
    else {
      throw ex
    }
  }
  return data
}

def synchronized getQuote(symbol, positive=true, responseCode=200) {
  String data = ""
  try {
    def quotePath = "/spring-nanotrader-services/api/" + "quote/" + symbol
    def resp = nanotrader.get(path:"${quotePath}",
                              headers:[API_TOKEN:testAuthToken])
    if (positive) {
      assert resp.status == 200
      data = resp.data
      //println "\n\n##################### QUOTE DATA #####################"
      //println "DATA:" + resp.data + ":"
    }
    else {
     assert resp.status == responseCode
    }
  }
  catch(ex) {
   if (!positive) {
      assert ex.response.status == responseCode
    }
    else {
      throw ex
    }
  }
  return data
}

def createQuote(companyName='newcompany', symbol='NCPY', positive=true, responseCode=200) {
  try {
    def quotePath = "/spring-nanotrader-services/api/" + "quote"
    def resp = nanotrader.post(path:"${quotePath}",
                               requestContentType:JSON,
                               body:[low:1,
                                     open1:1,
                                     volume:1,
                                     price:1,
                                     high:1,
                                     companyname:companyName,
                                     symbol:symbol,
                                     change1:1],
                               headers:[API_TOKEN:testAuthToken])
    if (positive) {
      assert resp.status == 201
      //println "DATA:" + resp.data + ":"
    }
    else {
      assert resp.status == responseCode
    }
  }
  catch(ex) {
   if (!positive) {
      assert ex.response.status == responseCode
    }
    else {
      throw ex
    }
  }
}

def getPortfolioSummary(accountid=1, positive=true, responseCode=200) {
  try {
    def path = "/spring-nanotrader-services/api/account/" + accountid + "/portfolioSummary"
    def resp = nanotrader.get(path:"${path}",
                              headers:[API_TOKEN:testAuthToken])
    if (positive) {
      assert resp.status == 200
    }
    else {
     assert resp.status == responseCode
    }
  }
  catch(ex) {
   if (!positive) {
      assert ex.response.status == responseCode
    }
    else {
      throw ex
    }
  }
}

def getMarketSummary(positive=true, responseCode=200) {
  try {
    def path = "/spring-nanotrader-services/api/marketSummary"
    def resp = nanotrader.get(path:"${path}",
                              headers:[API_TOKEN:testAuthToken])
    if (positive) {
      assert resp.status == 200
    }
    else {
     assert resp.status == responseCode
    }
  }
  catch(ex) {
   if (!positive) {
      assert ex.response.status == responseCode
    }
    else {
      throw ex
    }
  }
}

def createHolding(id=1, responseCode=405) {
  try {
    def holdingPath = "/spring-nanotrader-services/api/account/" + id + "/holding"
    def resp = nanotrader.post(path:"${holdingPath}",
                               headers:[API_TOKEN:testAuthToken])
    assert resp.status == responseCode
  }
  catch(ex) {
    assert ex.response.status == responseCode
  }
}

def updateHolding(id=1, responseCode=405) {
  try {
    def holdingPath = "/spring-nanotrader-services/api/account/" + id + "/holding/" + id
    def resp = nanotrader.put(path:"${holdingPath}",
                              headers:[API_TOKEN:testAuthToken])
    assert resp.status == responseCode
  }
  catch(ex) {
    assert ex.response.status == responseCode
  }
}

def deleteHolding(id=1, responseCode=405){
 try {
    def holdingPath = "/spring-nanotrader-services/api/account/" + id + "/holding/" + id
    def resp = nanotrader.delete(path:"${holdingPath}",
                                 headers:[API_TOKEN:testAuthToken])
    assert resp.status == responseCode
  }
  catch(ex) {
    assert ex.response.status == responseCode
  }
}

def createAccount(responseCode=405) {
  try {
    def accountPath = "/spring-nanotrader-services/api/account"
    def resp = nanotrader.post(path:"${accountPath}",
                               headers:[API_TOKEN:testAuthToken])
    assert resp.status == responseCode
  }
  catch(ex) {
    assert ex.response.status == responseCode
  }
}

def updateAccount(id=1, responseCode=405) {
  try {
    def accountPath = "/spring-nanotrader-services/api/account/" + id
    def resp = nanotrader.put(path:"${accountPath}",
                              headers:[API_TOKEN:testAuthToken])
    assert resp.status == responseCode
  }
  catch(ex) {
    assert ex.response.status == responseCode
  }
}

def deleteAccount(id=1, responseCode=405) {
  try {
    def accountPath = "/spring-nanotrader-services/api/account/" + id
    def resp = nanotrader.delete(path:"${accountPath}",
                                 headers:[API_TOKEN:testAuthToken])
    assert resp.status == responseCode
  }
  catch(ex) {
    assert ex.response.status == responseCode
  }
}

def deleteAccountProfile(id=1, responseCode=405) {
  try {
    def accountProfilePath = "/spring-nanotrader-services/api/accountProfile/" + id
    def resp = nanotrader.delete(path:"${accountProfilePath}",
                                 headers:[API_TOKEN:testAuthToken])
    assert resp.status == responseCode
  }
  catch(ex) {
    assert ex.response.status == responseCode
  }
}

def deleteAllOrders(id=1, responseCode=405) {
  try {
    def orderPath = "/spring-nanotrader-services/api/account/" + id + "/order"
    def resp = nanotrader.delete(path:"${orderPath}",
                                 headers:[API_TOKEN:testAuthToken])
    assert resp.status == responseCode
  }
  catch(ex) {
    assert ex.response.status == responseCode
  }
}

def deleteOrder(id=1, responseCode=405) {
  try {
    def orderPath = "/spring-nanotrader-services/api/account/" + id + "/order/" + id
    def resp = nanotrader.delete(path:"${orderPath}",
                                 headers:[API_TOKEN:testAuthToken])
    assert resp.status == responseCode
  }
  catch(ex) {
    assert ex.response.status == responseCode
  }
}

def updateQuote(symbol='AAPL', responseCode=405) {
 try {
    def quotePath = "/spring-nanotrader-services/api/" + "quote/" + symbol
    def resp = nanotrader.put(path:"${quotePath}",
                              headers:[API_TOKEN:testAuthToken])
    assert resp.status == responseCode
  }
  catch(ex) {
    assert ex.response.status == responseCode
  }
}

def deleteQuote(symbol='AAPL', responseCode=405) {
  try {
    def quotePath = "/spring-nanotrader-services/api/" + "quote/" + symbol
    def resp = nanotrader.delete(path:"${quotePath}",
                                 headers:[API_TOKEN:testAuthToken])
    assert resp.status == responseCode
  }
  catch(ex) {
    assert ex.response.status == responseCode
  }
}

def createRandomAccountProfile(count) {
  count.times {
    createAccountProfile()
  }
}

def getRandomAccountProfile(count) {
  count.times {
    getAccountProfile(1)
  }
}

def getQuoteLoop(count) {
  count.times {
    getQuote('s0')
  }
}

/*
def createOrder(count) {
  count.times {
    createOrder('s0')
  }
}*/


def loadTest() {
  500.times {
    def th = Thread.start {
      createRandomAccountProfile(200) 
      getRandomAccountProfile(200)
      getQuoteLoop(200)
    }
  }
}

def basicVerificationTests() {
  testGetOrder()
  testCreateOrder()
  testUpdateOrder()
  testGetAccountProfile()
  testCreateAccountProfile()
  //testUpdateAccountProfile()
  testGetAccount()
  testGetSpecificHoldingForAccount()
  testGetAllHoldingsForAccount()
  testGetQuote()
  testCreateQuote()
  testGetPortfolioSummary()
  testGetMarketSummary()
}

def verificationTests() {
  testAdvancedCreateOrder()
  testAdvancedUpdateOrder()
  testAdvancedSellOrder()
  testAdvancedGetAccount()
  testAdvancedGetQuote()
  //testAdvancedCreateProfile()
  //testAdvancedUpdateProfile()
}

def unauthorizedVerificationTests() {
  testUnauthorizedGetOrder()
  testUnauthorizedCreateOrder()
  testUnauthorizedUpdateOrder()
  testUnauthorizedGetAccountProfile()
  //testUnauthorizedUpdateAccountProfile()
  testUnauthorizedGetAccount()
  testUnauthorizedGetSpecificHoldingForAccount()
  testUnauthorizedGetAllHoldingsForAccount()
  testUnauthorizedGetPortfolioSummary()
}

def unsupportedVerificationTests() {
  testUnsupportedCreateHolding()
  testUnsupportedUpdateHolding()
  testUnsupportedDeleteHolding()
  testUnsupportedCreateAccount()
  testUnsupportedUpdateAccount()
  testUnsupportedDeleteAccount()
  testUnsupportedDeleteAccountProfile()
  testUnsupportedDeleteOrder()
  testUnsupportedDeleteAllOrders()
  testUnsupportedUpdateQuote()
  testUnsupportedDeleteQuote()
}

/*
 * a new "buy" order should generate a new "holding" row
 */
def testAdvancedCreateOrder() {
  totalCount++
  try {
    accountid = acctid
    quantity1 = 9876
    quantity2 = 3456
    symbol1 = 'AAPL'
    symbol2 = 'GOOG'

    createOrder(accountid, quantity1, 'buy', symbol1)
    createOrder(accountid, quantity2, 'buy', symbol2)

    data = getAllHoldingsForAccount(accountid)

    checkLabel1 = "\"quantity\":" + quantity1
    checkLabel2 = "\"quantity\":" + quantity2

    if (data.indexOf(checkLabel1) >= 0 && data.indexOf(checkLabel2) >= 0) {
      passCount++
      println "testAdvancedCreateOrder PASS"
    }
    else {
      failCount++
      println "testAdvancedCreateOrder FAIL"
    }
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testAdvancedCreateOrder FAIL";
  }
}

/*
 * After creating a new account profile, we should be able to use it to login
 */
def testAdvancedCreateProfile() {
  totalCount++
  try {
    user = createAccountProfile()
    dummyUser = user
    password = "randompasswd"

    def path = "/spring-nanotrader-services/api/login"
    def resp = nanotrader.post(path:"${path}",
                              body:[username:user, password:password],
                              requestContentType:JSON)
    assert resp.status == 201
    String authToken = resp.data
    def jsonObj = new JsonSlurper().parseText(authToken)
    authToken = jsonObj.authToken
    testAuthToken = authToken
    acctid = jsonObj.accountid
    passCount++
    println "testAdvancedCreateProfile PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testAdvancedCreateProfile FAIL";
  }
}

/*
 * After updating account profile, we should still be able to access account
 */
def testAdvancedUpdateProfile() {
  totalCount++
  try {
    getAccount(acctid)
    updateAccountProfile(acctid, dummyUser, 'DummyPassword', 'Dummy Address')
    getAccount(acctid)

    passCount++
    println "testAdvancedUpdateProfile PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testAdvancedUpdateProfile FAIL";
  }
}

/*
 * update a "buy" order should update corresponding "holding" row
 */
def testAdvancedUpdateOrder() {
  totalCount++
  try {
    oldQuantity1 = 5678
    oldQuantity2 = 1234
    newQuantity1 = oldQuantity1 + 1
    newQuantity2 = oldQuantity2 + 1
    orderId1 = createOrder(acctid, oldQuantity1, 'buy', 'AAPL')
    orderId2 = createOrder(acctid, oldQuantity2, 'buy', 'GOOG')

    updateOrder(acctid, orderId1, newQuantity1)
    updateOrder(acctid, orderId2, newQuantity2)

    mydata = getOrder(acctid, orderId1)
    mydata2 = getOrder(acctid, orderId2)

    //println "mydata:" + mydata
    //println "mydata2:" + mydata2

    def jsonObj = new JsonSlurper().parseText(mydata)
    holdingId1 = jsonObj.holdingid

    jsonObj = new JsonSlurper().parseText(mydata2)
    holdingId2 = jsonObj.holdingid

    //println "holding1:" + holdingId1
    //println "holding2:" + holdingId2

    holdingData = getSpecificHoldingForAccount(acctid, holdingId1)
    holdingData2 = getSpecificHoldingForAccount(acctid, holdingId2)

    jsonObj = new JsonSlurper().parseText(holdingData)
    quantityCheck = jsonObj.quantity

    jsonObj = new JsonSlurper().parseText(holdingData2)
    quantityCheck2 = jsonObj.quantity

    //println "quantitycheck1:" + quantityCheck
    //println "quantitycheck2:" + quantityCheck2

    if (newQuantity1 == quantityCheck && newQuantity2 == quantityCheck2) {
      passCount++
      println "testAdvancedUpdateOrder PASS"
    }
    else {
      failCount++
      println "testAdvancedUpdateOrder FAIL"
    }
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testAdvancedUpdateOrder FAIL";
  }
}

/*
 * sell "order" should remove corresponding holding row
 * subsequent request of the corresponding holding row should give 404
 * subsequent sell of the same "order" should give 404
 */
def testAdvancedSellOrder() {
  totalCount++
  try {
    accountid = acctid
    quantity1 = 55
    quantity2 = 66
    symbol1 = 'AAPL'
    symbol2 = 'GOOG'

    orderId1 = createOrder(accountid, quantity1, 'buy', symbol1)
    orderId2 = createOrder(accountid, quantity2, 'buy', symbol2)

    mydata = getOrder(acctid, orderId1)
    mydata2 = getOrder(acctid, orderId2)

    //println "mydata:" + mydata
    //println "mydata2:" + mydata2

    def jsonObj = new JsonSlurper().parseText(mydata)
    holdingId1 = jsonObj.holdingid

    jsonObj = new JsonSlurper().parseText(mydata2)
    holdingId2 = jsonObj.holdingid

    getSpecificHoldingForAccount(acctid, holdingId1)
    getSpecificHoldingForAccount(acctid, holdingId2)

    createSellOrder(accountid, holdingId1)
    createSellOrder(accountid, holdingId2)

    getSpecificHoldingForAccount(acctid, holdingId1, false, 404)
    getSpecificHoldingForAccount(acctid, holdingId2, false, 404)

    createSellOrder(accountid, holdingId1, false, 404)
    createSellOrder(accountid, holdingId2, false, 404)

    passCount++
    println "testAdvancedSellOrder PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testAdvancedSellOrder FAIL"
  }
}

/*
 * a "buy" order should change the balance of account table accordingly
 */
def testAdvancedGetAccount() {
  totalCount++
  try {
    mydata = getAccount(acctid)
    def jsonObj = new JsonSlurper().parseText(mydata)
    oldBalance = jsonObj.balance
    createOrder(acctid, 1, 'buy', 'AAPL')
    mydata = getAccount(acctid)
    jsonObj = new JsonSlurper().parseText(mydata)
    newBalance = jsonObj.balance

    //println "oldBalance:" + oldBalance
    //println "newBalance:" + newBalance

    if (oldBalance == newBalance) {
      failCount++
      println "testAdvancedGetAccount FAIL"
    }
    else {
      passCount++
      println "testAdvancedGetAccount PASS"
    }
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testAdvancedGetAccount FAIL";
  }
}

/*
 * a "buy and "sell" order should change the volume of quote table accordingly
 */
def testAdvancedGetQuote() {
  totalCount++
  try {
    mydata = getQuote('AAPL')
    def jsonObj = new JsonSlurper().parseText(mydata)
    oldVolume = jsonObj.volume
    orderId = createOrder(acctid, 5, 'buy', 'AAPL')
    mydata = getOrder(acctid, orderId)
    jsonObj = new JsonSlurper().parseText(mydata)
    holdingId = jsonObj.holdingid
    createSellOrder(acctid, holdingId)
    mydata = getQuote('AAPL')
    jsonObj = new JsonSlurper().parseText(mydata)
    newVolume = jsonObj.volume

    if (newVolume == oldVolume+10) {
      passCount++
      println "testAdvancedGetQuote PASS"
    }
    else {
      failCount++
      println "testAdvancedGetQuote FAIL"
    }
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testAdvancedGetQuote FAIL";
  }
}

def testGetOrder() {
  totalCount++
  try {
    getOrder(acctid, "all")
    getOrder(acctid, "Open")
    getOrder(acctid, "Completed")
    getOrder(acctid, "Closed")
    getOrder(acctid, "unknown", false, 404)

    passCount++
    println "testGetOrder PASS";
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testGetOrder FAIL";
  }
}

def testCreateOrder() {
  totalCount++
  try {
    createOrder(acctid, 555, 'buy', 'AAPL')
    createOrder(acctid, 555, 'buy', 'invalid_quote', false, 400)

    passCount++
    println "testCreateOrder PASS";
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testCreateOrder FAIL";
  }
}

def testUpdateOrder() {
  totalCount++
  try {
    updateOrder(acctid, 1, 88888)
   
    passCount++
    println "testUpdateOrder PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testUpdateOrder FAIL";
  }
}

def testGetAccountProfile() {
  totalCount++
  try {
    getAccountProfile(acctid)

    passCount++
    println "testGetAccountProfile PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testGetAccountProfile FAIL";
  }
}

def testCreateAccountProfile() {
  totalCount++
  try {
    createAccountProfile()
    createAccountProfile("jack", false, 400)

    passCount++
    println "testCreateAccountProfile PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testCreateAccountProfile FAIL";
  }
}

def testUpdateAccountProfile() {
  totalCount++
  try {
    updateAccountProfile(acctid, "NewAddress")
    //updateAccountProfile(2, "invalid_user", false)

    passCount++
    println "testUpdateAccountProfile PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testUpdateAccountProfile FAIL";
  }
}

def testGetAccount() {
  totalCount++
  try {
    getAccount(acctid)
   
    passCount++
    println "testGetAccount PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testGetAccount FAIL";
  }
}

def testGetSpecificHoldingForAccount() {
  totalCount++
  try {
    getSpecificHoldingForAccount(acctid, 1)
    getSpecificHoldingForAccount(acctid, 2)
    getSpecificHoldingForAccount(acctid, 3)
   
    passCount++
    println "testGetSpecificHoldingForAccount PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testGetSpecificHoldingForAccount FAIL";
  }
}

def testGetAllHoldingsForAccount() {
  totalCount++
  try {
    getAllHoldingsForAccount(acctid)
 
    passCount++
    println "testGetAllHoldingsForAccount PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testGetAllHoldingsForAccount FAIL";
  }
}

def testGetQuote() {
  totalCount++
  try {
    getQuote('AAPL')
    getQuote('InvalidQuote', false, 404)

    passCount++
    println "testGetQuote PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testGetQuote FAIL";
  }
}

def testCreateQuote() {
  totalCount++
  try {
    createQuote('test', 'test', false, 405)

    passCount++
    println "testCreateQuote PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testCreateQuote FAIL";
  }
}

def testGetPortfolioSummary() {
  totalCount++
  try {
    getPortfolioSummary()

    passCount++
    println "testGetPortfolioSummary PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testGetPortfolioSummary FAIL";
  }
}

def testGetMarketSummary() {
  totalCount++
  try {
    getMarketSummary()

    passCount++
    println "testGetMarketSummary PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testGetMarketSummary FAIL";
  }
}

def testUnauthorizedGetOrder() {
  totalCount++
  try {
    getOrder(unauthorizedAcctId, "all", false, 401)

    passCount++
    println "testUnauthorizedGetOrder PASS";
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testUnauthorizedGetOrder FAIL";
  }
}

def testUnauthorizedCreateOrder() {
  totalCount++
  try {
    createOrder(unauthorizedAcctId, 555, 'buy', 'AAPL', false, 401)

    passCount++
    println "testUnauthorizedCreateOrder PASS";
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testUnauthorizedCreateOrder FAIL";
  }
}

def testUnauthorizedUpdateOrder() {
  totalCount++
  try {
    updateOrder(unauthorizedAcctId, 1, 55000, false, 401)

    passCount++
    println "testUnauthorizedUpdateOrder PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testUnauthorizedUpdateOrder FAIL";
  }
}

def testUnauthorizedGetAccountProfile() {
  totalCount++
  try {
    getAccountProfile(unauthorizedAcctId, false, 401)

    passCount++
    println "testUnauthorizedGetAccountProfile PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testGetAccountProfile FAIL";
  }
}

def testUnauthorizedUpdateAccountProfile() {
  totalCount++
  try {
    updateAccountProfile(unauthorizedAcctId, "1", "1", "new address", false, 401)

    passCount++
    println "testUnauthorizedUpdateAccountProfile PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testUnauthorizedUpdateAccountProfile FAIL";
  }
}

def testUnauthorizedGetAccount() {
  totalCount++
  try {
    getAccount(unauthorizedAcctId, false, 401)

    passCount++
    println "testUnauthorizedGetAccount PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testUnauthorizedGetAccount FAIL";
  }
}

def testUnauthorizedGetSpecificHoldingForAccount() {
  totalCount++
  try {
    getSpecificHoldingForAccount(unauthorizedAcctId, 11, false, 401)

    passCount++
    println "testUnauthorizedGetSpecificHoldingForAccount PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testUnauthorizedGetSpecificHoldingForAccount FAIL";
  }
}

def testUnauthorizedGetAllHoldingsForAccount() {
  totalCount++
  try {
    getAllHoldingsForAccount(unauthorizedAcctId, false, 401)

    passCount++
    println "testUnauthorizedGetAllHoldingsForAccount PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testUnauthorizedGetAllHoldingsForAccount FAIL";
  }
}

def testUnauthorizedGetPortfolioSummary() {
  totalCount++
  try {
    getPortfolioSummary(unauthorizedAcctId, false, 401)

    passCount++
    println "testUnauthorizedGetPortfolioSummary PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testUnauthorizedGetPortfolioSummary FAIL";
  }
}

def testUnsupportedCreateHolding() {
  totalCount++
  try {
    createHolding()

    passCount++
    println "testUnsupportedCreateHolding PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testUnsupportedCreateHolding FAIL";
  }
}

def testUnsupportedUpdateHolding() {
  totalCount++
  try {
    updateHolding()

    passCount++
    println "testUnsupportedUpdateHolding PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testUnsupportedUpdateHolding FAIL";
  }
}

def testUnsupportedDeleteHolding() {
  totalCount++
  try {
    deleteHolding()

    passCount++
    println "testUnsupportedDeleteHolding PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testUnsupportedDeleteHolding FAIL";
  }
}

def testUnsupportedCreateAccount() {
  totalCount++
  try {
    createAccount()

    passCount++
    println "testUnsupportedCreateAccount PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testUnsupportedCreateAccount FAIL";
  }
}

def testUnsupportedUpdateAccount() {
  totalCount++
  try {
    updateAccount()

    passCount++
    println "testUnsupportedUpdateAccount PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testUnsupportedUpdateAccount FAIL";
  }
}

def testUnsupportedDeleteAccount() {
  totalCount++
  try {
    deleteAccount()

    passCount++
    println "testUnsupportedDeleteAccount PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testUnsupportedDeleteAccount FAIL";
  }
}

def testUnsupportedDeleteAccountProfile() {
  totalCount++
  try {
    deleteAccountProfile()

    passCount++
    println "testUnsupportedDeleteAccountProfile PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testUnsupportedDeleteAccountProfile FAIL";
  }
}

def testUnsupportedDeleteOrder() {
  totalCount++
  try {
    deleteOrder()

    passCount++
    println "testUnsupportedDeleteOrder PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testUnsupportedDeleteOrder FAIL";
  }
}

def testUnsupportedDeleteAllOrders() {
  totalCount++
  try {
    deleteAllOrders()

    passCount++
    println "testUnsupportedDeleteAllOrders PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testUnsupportedDeleteAllOrders FAIL";
  }
}

def testUnsupportedUpdateQuote() {
  totalCount++
  try {
    updateQuote()

    passCount++
    println "testUnsupportedUpdateQuote PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testUnsupportedUpdateQuote FAIL";
  }
}

def testUnsupportedDeleteQuote() {
  totalCount++
  try {
    deleteQuote()

    passCount++
    println "testUnsupportedDeleteQuote PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testUnsupportedDeleteQuote FAIL";
  }
}

def printSummary() {
  println "\nTotal:" + totalCount + "\tPass:" + passCount + "\tFail:" + failCount
  println "Debug log file written to: nanotradertest.debug" 
}

init()
basicVerificationTests()
unauthorizedVerificationTests()
unsupportedVerificationTests()
verificationTests()
printSummary()




