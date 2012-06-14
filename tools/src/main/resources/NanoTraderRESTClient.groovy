package org.nanotrader

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

public class NanoTraderRESTClient {

def path = "http://localhost:8080"
def nanotrader = 0
def logFile = 0
def testAuthToken = 0
def acctid = 1
def unauthorizedAcctId = 0
def dummyUser = 'DummyUser'

def totalCount = 0
def passCount = 0
def failCount = 0

def disableLogger() {
  Handler[] handlers = Logger.getLogger("").getHandlers()
  for (Handler handler : handlers) {
    handler.setLevel(Level.OFF)
  }
}

def createFirstUser() {
  try {
    nanotrader = new RESTClient(path)
    createAccountProfile('jack',false, 201, 'jack')
  } catch (ex) {
    //do nothing
  }
}

def init() {
  disableLogger()
  nanotrader = new RESTClient(path)
  logFile = new PrintWriter(new FileWriter("nanotradertest.debug"))
  def jsonResponse = getAuthToken()
  testAuthToken = jsonResponse.authToken
  acctid = jsonResponse.accountid
  //println "Test Auth Token:" + testAuthToken + "\n"
  //println "\nStarting tests...\n"
  //println "accountid:" + acctid
}

def synchronized Object getAuthToken(username='jack', password='jack') {
  String authToken = ""
  int accountid = 1
  def user = username
  def passwd = password
  //println "****** Please recreate schema and initialize db with initdb.sql before running tests"
  //println "Test User:" + user
  //println "Test User Password:" + passwd
  try {
    def path = "/spring-nanotrader-services/api/login"
    def resp = nanotrader.post(path:"${path}",
                              body:[username:user, password:passwd],
                              requestContentType:JSON)
    assert resp.status == 201
    authToken = resp.data
    def jsonObj = new JsonSlurper().parseText(authToken)
    acctid = jsonObj.accountid
    unauthorizedAcctId = acctid + 1
    return jsonObj
  }
  catch(ex) {
   ex.printStackTrace()
   throw ex
  }
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


def void logout(authToken=testAuthToken) {
  def logoutPath = "/spring-nanotrader-services/api/logout"
  def resp = nanotrader.get(path:"${logoutPath}",
                            headers:[API_TOKEN:authToken])
  assert resp.status == 200
}

def String getOrder(int accountid, int orderid, authToken=testAuthToken) {
  def orderPath = "/spring-nanotrader-services/api/account/" + accountid + "/order/" + orderid
  def resp = nanotrader.get(path:"${orderPath}",
                            headers:[API_TOKEN:authToken])
  return resp.data
}

def String getOrder(id, status, positive=true, responseCode=200, authToken=testAuthToken) {
  String data = ""
  try {
    def orderPath = "/spring-nanotrader-services/api/account/" + id + "/orders"
    def resp = null
    if (status == "all") {
      resp = nanotrader.get(path:"${orderPath}",
                            headers:[API_TOKEN:authToken])
    }
    else {
     resp = nanotrader.get(path:"${orderPath}",
                           query:[status:"${status}"],
                           headers:[API_TOKEN:authToken])
    }
    //println "status:" + status
    //println "resp.data:" + resp.data
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

def synchronized int createOrder(id, quantity=555, orderType="buy", symbol="AAPL", positive=true, responseCode=201, authToken=testAuthToken) {
  int orderId = 0
  try {
    def orderPath = "/spring-nanotrader-services/api/account/" + id + "/order"
    def resp = nanotrader.post(path:"${orderPath}",
                               body:[quantity:quantity, ordertype:orderType, quote:[symbol:symbol]],
                               requestContentType:JSON,
                               headers:[API_TOKEN:authToken])
   if (positive) {
     assert resp.status == 201
     def new_id = resp.getFirstHeader('location').getValue()
     def i = new_id.lastIndexOf("/")
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

def createSellOrder(accountid, holdingid, positive=true, responseCode=201, authToken=testAuthToken) {
  try {
    def orderPath = "/spring-nanotrader-services/api/account/" + accountid + "/order"
    def resp = nanotrader.post(path:"${orderPath}",
                               body:[holdingid:holdingid, ordertype:'sell'],
                               requestContentType:JSON,
                               headers:[API_TOKEN:authToken])
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

def synchronized String createAccountProfile(user="user1", positive=true, responseCode=200, password="randompasswd", openbal=1000000.00) {
  def myUserName = ""
  try {
    def userName = ""
    if (positive) {
      Random rand = new Random()
      int range = 10000000
      userName = "randomuser" + rand.nextInt(range)
      def now = Calendar.instance
      def date = now.time
      def millis = date.time
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
                                     accounts:[[openbalance:openbal]],
                                     passwd:password,
                                     userid:userName,
                                     email:"randomname@company.com",
                                     creditcard:"1111222233334444",
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
      //assert ex.response.status == responseCode
      throw ex
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
                                    email:"updated@email.com",
                                    creditcard:"1111222211112222",
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
    def holdingPath = "/spring-nanotrader-services/api/account/" + accountid + "/holdings"
    def resp = nanotrader.get(path:"${holdingPath}",
                              headers:[API_TOKEN:testAuthToken])
    if (positive) {
      assert resp.status == 200
      //println "\n\n##################### HOLDING DATA #####################"
      //println "accountid:"+ accountid
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
    def path = "/spring-nanotrader-services/api/account/" + accountid + "/holdingSummary"
    //println "path:" + path
    def resp = nanotrader.get(path:"${path}",
                              headers:[API_TOKEN:testAuthToken])
    //println "portfoliosummary accountid:" + accountid
    //println resp.data
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
    //println resp.data
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
    def orderPath = "/spring-nanotrader-services/api/account/" + id + "/orders"
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
    def now = Calendar.instance
    def date = now.time
    def millis = date.time
    def testuser = "testuser"
    testuser += millis
    Random rand = new Random()
    int range = 10000000
    testuser += rand.nextInt(range)
    println "testuser:" + testuser
    createAccountProfile(testuser, false, 201, "testuser")
    def jsonResponse = getAuthToken(testuser, "testuser")
    testAuthToken = jsonResponse.authToken
    acctid = jsonResponse.accountid
    println "authtoken:" + testAuthToken
    println "acctid:" + acctid
    Thread.yield()
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
  100.times {
    def th = Thread.start {
      nanotrader = new RESTClient(path)
      createRandomAccountProfile(100)
      100.times {
        createOrder(acctid, 1, "buy", "VMW", true, 201, testAuthToken)
      }
      //getAllHoldingsForAccount(acctid)
      //getRandomAccountProfile(200)
      //getQuoteLoop(200)
    }
  }
}

def basicVerificationTests() {
  testGetOrder()
  testCreateOrder()
  //testUpdateOrder()
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
  //testAdvancedUpdateOrder()
  testAdvancedSellOrder()
  testAdvancedGetAccount()
  testAdvancedGetQuote()
  //testAdvancedCreateProfile()
  testAdvancedUpdateProfile()
  testAdvancedCreateOrderWithNegativeQuantity()
  testAdvancedCreateOrderWithZeroQuantity()
  testAdvancedGetAccountWithoutEnoughBalance()
  testForNull()
}

def unauthorizedVerificationTests() {
  testUnauthorizedGetOrder()
  testUnauthorizedCreateOrder()
  //testUnauthorizedUpdateOrder()
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
  //testUnsupportedDeleteAllOrders()
  testUnsupportedUpdateQuote()
  testUnsupportedDeleteQuote()
}

def endTests() {
  testLogout()
}

def testLogout() {
  totalCount++
  try {
    getOrder(acctid, "all")
    logout()
    getOrder(acctid, "all", false, 403)
    passCount++
    println "testLogout PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testLogout FAIL";
  }
}

/*
 * a new "buy" order should generate a new "holding" row
 */
def testAdvancedCreateOrder() {
  totalCount++
  try {
    def accountid = acctid
    def quantity1 = 987
    def quantity2 = 345
    def symbol1 = 'AAPL'
    def symbol2 = 'GOOG'

    createOrder(accountid, quantity1, 'buy', symbol1)
    createOrder(accountid, quantity2, 'buy', symbol2)

    def data = getAllHoldingsForAccount(accountid)

    def checkLabel1 = "\"quantity\":" + quantity1
    def checkLabel2 = "\"quantity\":" + quantity2

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
 * a new "buy" order with quantity < 0 will have 200 status response code
 * and a 'cancelled' status and no corresponding holding
 */
def testAdvancedCreateOrderWithNegativeQuantity() {
  totalCount++
  try {
    def accountid = acctid
    def quantity = -10
    def symbol = 'VMW'

    def orderId = createOrder(accountid, quantity, 'buy', symbol)
    def mydata = getOrder(acctid, orderId)

    def jsonObj = new JsonSlurper().parseText(mydata)
    def holdingId = jsonObj.holdingid
    def orderStatus = jsonObj.orderstatus

    //println "mydata:" + mydata

    if (holdingId == null && orderStatus == 'cancelled') {
      passCount++
      println "testAdvancedCreateOrderWithNegativeQuantity PASS"
    }
    else {
      failCount++
      println "testAdvancedCreateOrderWithNegativeQuantity FAIL"
    }
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testAdvancedCreateOrderWithNegativeQuantity FAIL";
  }
}

/*
 * a new "buy" order with quantity 0 will have 200 status response code
 * and a 'cancelled' status and no corresponding holding
 */
def testAdvancedCreateOrderWithZeroQuantity() {
  totalCount++
  try {
    def accountid = acctid
    def quantity = 0
    def symbol = 'ORCL'

    def orderId = createOrder(accountid, quantity, 'buy', symbol)
    def mydata = getOrder(acctid, orderId)

    def jsonObj = new JsonSlurper().parseText(mydata)
    def holdingId = jsonObj.holdingid
    def orderStatus = jsonObj.orderstatus

    //println "mydata:" + mydata

    if (holdingId == null && orderStatus == 'cancelled') {
      passCount++
      println "testAdvancedCreateOrderWithZeroQuantity PASS"
    }
    else {
      failCount++
      println "testAdvancedCreateOrderWithZeroQuantity FAIL"
    }
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testAdvancedCreateOrderWithZeroQuantity FAIL";
  }
}

/*
 * After creating a new account profile, we should be able to use it to login
 */
def testAdvancedCreateProfile() {
  totalCount++
  try {
    def user = createAccountProfile()
    dummyUser = user
    def password = "randompasswd"

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
    updateAccountProfile(acctid, 'jack', 'jack', 'Dummy Address')
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
    def oldQuantity1 = 5678
    def oldQuantity2 = 1234
    def newQuantity1 = oldQuantity1 + 1
    def newQuantity2 = oldQuantity2 + 1
    def orderId1 = createOrder(acctid, oldQuantity1, 'buy', 'AAPL')
    def orderId2 = createOrder(acctid, oldQuantity2, 'buy', 'GOOG')

    updateOrder(acctid, orderId1, newQuantity1)
    updateOrder(acctid, orderId2, newQuantity2)

    def mydata = getOrder(acctid, orderId1)
    def mydata2 = getOrder(acctid, orderId2)

    //println "mydata:" + mydata
    //println "mydata2:" + mydata2

    def jsonObj = new JsonSlurper().parseText(mydata)
    def holdingId1 = jsonObj.holdingid

    jsonObj = new JsonSlurper().parseText(mydata2)
    def holdingId2 = jsonObj.holdingid

    //println "holding1:" + holdingId1
    //println "holding2:" + holdingId2

    def holdingData = getSpecificHoldingForAccount(acctid, holdingId1)
    def holdingData2 = getSpecificHoldingForAccount(acctid, holdingId2)

    jsonObj = new JsonSlurper().parseText(holdingData)
    def quantityCheck = jsonObj.quantity

    jsonObj = new JsonSlurper().parseText(holdingData2)
    def quantityCheck2 = jsonObj.quantity

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
    def accountid = acctid
    def quantity1 = 55
    def quantity2 = 66
    def symbol1 = 'AAPL'
    def symbol2 = 'GOOG'

    def orderId1 = createOrder(accountid, quantity1, 'buy', symbol1)
    def orderId2 = createOrder(accountid, quantity2, 'buy', symbol2)

    def mydata = getOrder(acctid, orderId1)
    def mydata2 = getOrder(acctid, orderId2)

    //println "mydata:" + mydata
    //println "mydata2:" + mydata2

    def jsonObj = new JsonSlurper().parseText(mydata)
    def holdingId1 = jsonObj.holdingid

    jsonObj = new JsonSlurper().parseText(mydata2)
    def holdingId2 = jsonObj.holdingid

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
    def mydata = getAccount(acctid)
    def jsonObj = new JsonSlurper().parseText(mydata)
    def oldBalance = jsonObj.balance
    createOrder(acctid, 1, 'buy', 'AAPL')
    mydata = getAccount(acctid)
    jsonObj = new JsonSlurper().parseText(mydata)
    def newBalance = jsonObj.balance

    //println "oldBalance:" + oldBalance
    //println "newBalance:" + newBalance
    //println "acctid:" + acctid

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
 * a "buy" order should be rejected if it is not enough
 */
def testAdvancedGetAccountWithoutEnoughBalance() {
  totalCount++
  try {
    def orderId = createOrder(acctid, 1, 'buy', 'AAPL')
    def mydata = getOrder(acctid, orderId)
    def jsonObj = new JsonSlurper().parseText(mydata)
    def holdingId = jsonObj.holdingid
    def orderStatus = jsonObj.orderstatus

    //println "mydata:" + mydata

    /*
    if (holdingId == null || orderStatus != 'closed') {
      failCount++
      println "testAdvancedCreateOrderWithoutEnoughBalance FAIL"
      return
    }*/
    orderId = createOrder(acctid, 1000000, 'buy', 'AAPL')
    mydata = getOrder(acctid, orderId)
    jsonObj = new JsonSlurper().parseText(mydata)
    holdingId = jsonObj.holdingid
    orderStatus = jsonObj.orderstatus

    if (holdingId == null && orderStatus == 'cancelled') {
      passCount++
      println "testAdvancedCreateOrderWithoutEnoughBalance PASS"
    }
    else {
      failCount++
      println "testAdvancedCreateOrderWithoutEnoughBalance FAIL"
    }
    //println "mydata:" + mydata
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testAdvancedGetAccountWithoutEnoughBalance FAIL";
  }
}

/*
 * a "buy and "sell" order should change the volume of quote table accordingly
 */
def testAdvancedGetQuote() {
  totalCount++
  try {
    def mydata = getQuote('AAPL')
    def jsonObj = new JsonSlurper().parseText(mydata)
    def oldVolume = jsonObj.volume
    def orderId = createOrder(acctid, 5, 'buy', 'AAPL')
    mydata = getOrder(acctid, orderId)
    jsonObj = new JsonSlurper().parseText(mydata)
    def holdingId = jsonObj.holdingid
    createSellOrder(acctid, holdingId)
    mydata = getQuote('AAPL')
    jsonObj = new JsonSlurper().parseText(mydata)
    def newVolume = jsonObj.volume

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

/*
 * For a newly created profile, orders, holdings, portfolioSummary should return empty 200 instead of 404
 *
 */
def testForNull() {
  totalCount++
  try {
    def now = Calendar.instance
    def date = now.time
    def millis = date.time
    def testuser = "testuser"
    testuser += millis
    //println "testuser:" + testuser
    createAccountProfile(testuser, false, 201, "testuser")
    def jsonResponse = getAuthToken(testuser, "testuser")
    testAuthToken = jsonResponse.authToken
    acctid = jsonResponse.accountid
    //println "authtoken:" + testAuthToken
    //println "acctid:" + acctid
    getOrder(acctid, "all")
    getAllHoldingsForAccount(acctid)
    getPortfolioSummary(acctid)

    passCount++
    println "testForNull PASS";
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "testForNull FAIL";
  }
}

def testGetOrder() {
  totalCount++
  try {
    getOrder(acctid, "all")
    /*getOrder(acctid, "Open")
    getOrder(acctid, "Completed")
    getOrder(acctid, "Closed")
    getOrder(acctid, "unknown", false, 404)*/

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
    createOrder(acctid, 1, 'buy', 'AAPL')
    createOrder(acctid, 555, 'buy', 'invalid_quote', false, 400)
    createOrder(acctid+1, 555, 'buy', 'AAPL', false, 401)
    createOrder(acctid, 5, 'BOUGHT', 'AAPL', false, 400)
    createOrder(acctid, 5000000, 'BUY', 'AAPL', false, 400)

    getOrder(acctid, "all")
    getOrder(acctid, "closed")
    getOrder(acctid, "cancelled")

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
    //createAccountProfile("jack", false, 400)

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
    updateAccountProfile(acctid, "jack", "jack", "NewAddress")
    updateAccountProfile(unauthorizedAcctId, "jack", "jack", "NewAddress", false, 401)

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
    //getSpecificHoldingForAccount(acctid, 1, true, 200)
    getSpecificHoldingForAccount(acctid, 12345678, false, 404)

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
    getPortfolioSummary(acctid)

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
    deleteAllOrders(acctid)

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

static main(args) {
  def inst = new NanoTraderRESTClient()
  inst.createFirstUser()
  inst.init()
  //inst.loadTest()

  inst.basicVerificationTests()
  inst.unauthorizedVerificationTests()
  inst.unsupportedVerificationTests()
  inst.verificationTests()
  inst.endTests()

  inst.printSummary()
}


}



