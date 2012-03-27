#!/usr/bin/env groovy

//groovy -classpath /Users/administrator/Downloads/commons-beanutils-1.8.3/commons-beanutils-1.8.3.jar:/Users/administrator/Downloads/ezmorph-1.0.5.jar:/Users/administrator/Downloads/commons-lang-2.6/commons-lang-2.6.jar:/Users/administrator/Downloads/xerces-2_11_0/xercesImpl.jar:/Users/administrator/Downloads/nekohtml-1.9.15/nekohtml.jar:/Users/administrator/Downloads/commons-collections-3.2.1/commons-collections-3.2.1.jar:/Users/administrator/Downloads/xml-commons-resolver-1.2/resolver.jar:/Users/administrator/Downloads/json-lib-2.3-jdk15.jar:/Users/administrator/Downloads/http-builder-0.5.2.jar:/Users/administrator/Downloads/httpcomponents-client-4.1.3/lib/commons-codec-1.4.jar:/Users/administrator/Downloads/httpcomponents-client-4.1.3/lib/httpclient-4.1.3.jar:/Users/administrator/Downloads/httpcomponents-client-4.1.3/lib/httpcore-4.1.4.jar:/Users/administrator/Downloads/httpcomponents-client-4.1.3/lib/commons-logging-1.1.1.jar:/Users/administrator/Downloads/httpcomponents-client-4.1.3/lib/httpclient-cache-4.1.3.jar:/Users/administrator/Downloads/httpcomponents-client-4.1.3/lib/httpmime-4.1.3.jar NanoTraderRESTClient.groovy
import groovyx.net.http.RESTClient
import groovy.util.slurpersupport.GPathResult

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
  println "Test Auth Token:" + testAuthToken + "\n"
  println "Starting tests...\n"
}

def String getAuthToken() {
  String authToken = ""
  int accountid = 1
  def user = "jack"
  def passwd = "jack"
  println "****** Please initialize db with initdb.sql before running tests"
  println "Test User:" + user
  println "Test User Password:" + passwd
  try {
    def path = "/spring-nanotrader-services/api/login"
    def resp = nanotrader.post(path:"${path}",
                              body:[username:user, password:passwd],
                              requestContentType:JSON)
    assert resp.status == 201
    authToken = resp.data
    
    //println "Data:" + authToken
    
    i = authToken.indexOf("\"authToken\":\"")
    j = authToken.indexOf(",", i)
    
    assert (i >= 0 && j >= 0)
    authToken = authToken.substring(i+"\"authToken\":\"".length(), j-1)
    
    //println "authToken:" + authToken
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

def synchronized createAccountProfile(user="user1", positive=true, responseCode=200) {
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

def updateAccountProfile(id=1, address="new address", positive=true, responseCode=200) {
 try {
    def accountProfilePath = "/spring-nanotrader-services/api/accountProfile/" + id
    def resp = nanotrader.put(path:"${accountProfilePath}",
                              requestContentType:JSON,
                              body:[address:address,
                                    accounts:[[openbalance:200.00]],
                                    email:"updated email",
                                    creditcard:"666666666666"],
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
  try {
    def accountPath = "/spring-nanotrader-services/api/account/" + id
    def resp = nanotrader.get(path:"${accountPath}",
                              headers:[API_TOKEN:testAuthToken])
    if (positive) {
      assert resp.status == 200
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
}

def getSpecificHoldingForAccount(accountid, holdingid, positive=true, responseCode=200) {
  try {
    def holdingPath = "/spring-nanotrader-services/api/account/" + accountid + "/holding/" + holdingid
    def resp = nanotrader.get(path:"${holdingPath}",
                              headers:[API_TOKEN:testAuthToken])
    if (positive) {
      assert resp.status == 200
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
  try {
    def quotePath = "/spring-nanotrader-services/api/" + "quote/" + symbol
    def resp = nanotrader.get(path:"${quotePath}",
                              headers:[API_TOKEN:testAuthToken])
    if (positive) {
      assert resp.status == 200
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
  testUpdateAccountProfile()
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
  //testAdvancedSellOrder()
  //testAdvancedGetAccount()
  //testAdvancedGetQuote()
}

def unauthorizedVerificationTests() {
  testUnauthorizedGetOrder()
  testUnauthorizedCreateOrder()
  testUnauthorizedUpdateOrder()
  testUnauthorizedGetAccountProfile()
  testUnauthorizedUpdateAccountProfile()
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

def testAdvancedCreateOrder() {
  totalCount++
  try {
    accountid = 1
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

def testAdvancedUpdateOrder() {
  totalCount++
  try {
    oldQuantity1 = 5678
    oldQuantity2 = 1234
    newQuantity1 = oldQuantity1 + 1
    newQuantity2 = oldQuantity2 + 1
    orderId1 = createOrder(1, oldQuantity1, 'buy', 'AAPL')
    orderId2 = createOrder(1, oldQuantity2, 'buy', 'GOOG')

    //println "orderId1:" + orderId1
    //println "orderId2:" + orderId2

    updateOrder(1, orderId1, newQuantity1)
    updateOrder(1, orderId2, newQuantity2)

    data = getOrder(1, 'all')

    //println "data:" + data
    //println "data2:" + data2

    i = data.indexOf("{\"orderid\":" + orderId1)
    j = data.indexOf("{\"orderid\":" + orderId2)

    assert (i >=0 && j >= 0)

    i2 = data.indexOf('}', i)
    j2 = data.indexOf('}', j)

    checkString1 = data.substring(i, i2)
    checkString2 = data.substring(j, j2)

    assert (checkString1 != null && checkString2 != null)

    checkLabel1 = "\"quantity\":" + newQuantity1
    checkLabel2 = "\"quantity\":" + newQuantity2

    //println "checkString1:" + checkString1
    //println "checkString2:" + checkString2

    //println "checkLabel1:" + checkLabel1
    //println "checkLabel2:" + checkLabel2

    if (checkString1.indexOf(checkLabel1) >= 0 && checkString2.indexOf(checkLabel2) >= 0) {
      passCount++
      println "testAdvancedUpdateOrder PASS"
    }
    else {
      failCount++
      println "testAdvancedUpdateOrder FAIL"
    }

    /*
    holdingQuantityList = getAllHoldingsForAccount(1)
    holdingQuantityList2 = getAllHoldingsForAccount(2)

    if (orderquantity != 88888 || orderquantitty2 != 99999) {
      println "testAdvancedCreateOrder FAIL"
    }
    else {
      println "testAdvancedUpdateOrder PASS"
    }*/
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testAdvancedUpdateOrder FAIL";
  }
}

def testAdvancedSellOrder() {
  totalCount++
  try {
    accountid = 1
    quantity1 = 55
    quantity2 = 66
    symbol1 = 'AAPL'
    symbol2 = 'GOOG'

    createOrder(accountid, quantity1, 'buy', symbol1)
    createOrder(accountid, quantity2, 'buy', symbol2)

    createOrder(accountid, quantity1-1, 'sell', symbol1)
    createOrder(accountid, quantity2, 'sell', symbol2)

    data = getAllHoldingsForAccount(accountid)

    /*
    checkLabel1 = "\"quantity\":" + quantity1
    checkLabel2 = "\"quantity\":" + quantity2

    if (data.indexOf(checkLabel1) >= 0 && data.indexOf(checkLabel2) >= 0) {
      passCount++
      println "testAdvancedCreateOrder PASS"
    }
    else {
      failCount++
      println "testAdvancedCreateOrder FAIL"
    }*/
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testAdvancedCreateOrder FAIL";
  }
}

def testAdvancedGetAccount() {
  try {
    createOrder(1, 8888, 'buy', 's1')
    createOrder(2, 9999, 'buy', 's2')

    balance = getAccount()

    if (balance) {
      println "testAdvancedGetAccount FAIL"
    }
    else {
      println "testAdvancedGetAccount PASS"
    }
  }
  catch (Throwable t) {
    writeExceptionToFile(t)
    println "testAdvancedGetAccount FAIL";
  }
}

def testAdvancedGetQuote() {
  try {
    createOrder(1, 8888, 'buy', 's1')
    createOrder(2, 9999, 'buy', 's2')

    values = getQuote('s1')
    values = getQuote('s2')

    if (nochange) {
      println "testAdvancedGetQuote FAIL"
    }
    else {
      println "testAdvancedGetQuote PASS"
    }
  }
  catch (Throwable t) {
    writeExceptionToFile(t)
    println "testAdvancedGetQuote FAIL";
  }
}

def testGetOrder() {
  totalCount++
  try {
    getOrder(1, "all")
    getOrder(1, "Open")
    getOrder(1, "Completed")
    getOrder(1, "Closed")
    getOrder(1, "unknown", false, 404)

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
    createOrder(1, 555, 'buy', 'AAPL')
    createOrder(1, 555, 'buy', 'invalid_quote', false, 400)

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
    updateOrder(1, 1, 88888)
   
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
    getAccountProfile(1)

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
    updateAccountProfile(1, "NewAddress")
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
    getAccount(1)
   
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
    getSpecificHoldingForAccount(1, 1)
    getSpecificHoldingForAccount(1, 2)
    getSpecificHoldingForAccount(1, 3)
   
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
    getAllHoldingsForAccount(1)
 
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
    getOrder(2, "all", false, 401)

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
    createOrder(2, 555, 'buy', 'AAPL', false, 401)

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
    updateOrder(2, 1, 55000, false, 401)

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
    getAccountProfile(2, false, 401)

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
    updateAccountProfile(2, "new address", false, 401)

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
    getAccount(2, false, 401)

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
    getSpecificHoldingForAccount(2, 11, false, 401)

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
    getAllHoldingsForAccount(2, false, 401)

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
    getPortfolioSummary(2, false, 401)

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
verificationTests()
unauthorizedVerificationTests()
unsupportedVerificationTests()
printSummary()




