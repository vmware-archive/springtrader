#!/usr/bin/env groovy

//groovy -classpath /Users/administrator/Downloads/commons-beanutils-1.8.3/commons-beanutils-1.8.3.jar:/Users/administrator/Downloads/ezmorph-1.0.5.jar:/Users/administrator/Downloads/commons-lang-2.6/commons-lang-2.6.jar:/Users/administrator/Downloads/xerces-2_11_0/xercesImpl.jar:/Users/administrator/Downloads/nekohtml-1.9.15/nekohtml.jar:/Users/administrator/Downloads/commons-collections-3.2.1/commons-collections-3.2.1.jar:/Users/administrator/Downloads/xml-commons-resolver-1.2/resolver.jar:/Users/administrator/Downloads/json-lib-2.3-jdk15.jar:/Users/administrator/Downloads/http-builder-0.5.2.jar:/Users/administrator/Downloads/httpcomponents-client-4.1.3/lib/commons-codec-1.4.jar:/Users/administrator/Downloads/httpcomponents-client-4.1.3/lib/httpclient-4.1.3.jar:/Users/administrator/Downloads/httpcomponents-client-4.1.3/lib/httpcore-4.1.4.jar:/Users/administrator/Downloads/httpcomponents-client-4.1.3/lib/commons-logging-1.1.1.jar:/Users/administrator/Downloads/httpcomponents-client-4.1.3/lib/httpclient-cache-4.1.3.jar:/Users/administrator/Downloads/httpcomponents-client-4.1.3/lib/httpmime-4.1.3.jar NanoTraderRESTClient.groovy
import groovyx.net.http.RESTClient
import groovy.util.slurpersupport.GPathResult

import java.io.FileWriter
import java.io.PrintWriter
import java.io.StringWriter
import java.util.Random

import static groovyx.net.http.ContentType.URLENC
import static groovyx.net.http.ContentType.JSON
import static groovyx.net.http.ContentType.HTML

path = "http://localhost:8080"
def nanotrader = 0
def logFile = 0

def init() {
  nanotrader = new RESTClient(path)
  logFile = new PrintWriter(new FileWriter("nanotradertest.debug"))
}

def writeExceptionToFile(ex) {
  StringWriter sw = new StringWriter();
  PrintWriter pw = new PrintWriter(sw, true);
  ex.printStackTrace(pw);
  pw.flush();
  sw.flush();
  logFile.write(sw.toString());
}

def String getOrder(id, status, positive=true) {
  String data = ""
  try {
    def orderPath = "/spring-nanotrader-services/api/" + id + "/order"
    def resp = null
    if (status == "all") {
      resp = nanotrader.get(path:"${orderPath}")
    }
    else {
     resp = nanotrader.get(path:"${orderPath}",
                           query:[status:"${status}"])
    }
    if (positive) {
      assert resp.status == 200
      //println "\n\n##################### ORDER DATA #####################"
      data = resp.data
    }
    else {
      assert resp.status == 404
    }
  }
  catch(ex) {
    if (!positive) {
      assert ex.response.status == 404
      //println "404 response code found as expected"
    }
    else {
      throw ex
    }
  }
  return data
}

def synchronized int createOrder(id, quantity=555, orderType="buy", symbol="s0", positive=true) {
  int orderId = 0
  try {
    def orderPath = "/spring-nanotrader-services/api/" + id + "/order"
    def resp = nanotrader.post(path:"${orderPath}",
                               body:[quantity:quantity, ordertype:orderType, quote:[symbol:symbol]],
                               requestContentType:JSON)
   if (positive) {
     assert resp.status == 201
     new_id = resp.getFirstHeader('location').getValue()
     i = new_id.lastIndexOf("/")
     new_id = new_id.substring(i+1)
     //println "new_id:" + new_id
     orderId = Integer.parseInt(new_id)
   }
   else {
     assert resp.status == 400
   }
  }
  catch(ex) {
    if (!positive) {
      assert ex.response.status == 400
      //println "400 response code found as expected"
    }
    else {
      throw ex
    }
  }
  return orderId
}

def updateOrder(accountid, orderid, quantity=5555, positive=true) {
  try {
    def orderPath = "/spring-nanotrader-services/api/" + accountid + "/order"
    def resp = nanotrader.put(path:"${orderPath}",
                              body:[orderid:orderid, quantity:quantity, accountId:accountid],
                              requestContentType:JSON)
   if (positive) {
     assert resp.status == 200
   }
   else {
     assert resp.status == 400
   }
  }
  catch(ex) {
    if (!positive) {
      assert ex.response.status == 400
      //println "400 response code found as expected"
    }
    else {
      throw ex
    }
  } 
}

def synchronized getAccountProfile(id, positive=true) {
  try {
    def accountProfilePath = "/spring-nanotrader-services/api/accountProfile/" + id
    def resp = nanotrader.get(path:"${accountProfilePath}")
    if (positive) {
      assert resp.status == 200
      //println Thread.getName()
      //println "\n\n##################### ACCOUNT PROFILE DATA #####################"
      //println "DATA:" + resp.data + ":"
    }
    else {
      assert resp.status == 404
    }
  }
  catch(ex) {
    if (!positive) {
      assert ex.response.status == 404
      //println "404 response code found as expected"
    }
    else {
      throw ex
    }
  }
}

def synchronized createAccountProfile(user="user1", positive=true) {
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
                                     fullname:userName])
    //println "response code:" + resp.status
    if (positive) {
      assert resp.status == 201
      //println "DATA:" + resp.data + ":"
    }
    else {
      assert resp.status == 400
    }
  }
  catch(ex) {
    if (!positive) {
      assert ex.response.status == 400
      //println "400 response code found as expected"
    }
    else {
      throw ex
    }
  }
}

def updateAccountProfile(id=1, userid="user1", positive=true) {
 try {
    def accountProfilePath = "/spring-nanotrader-services/api/accountProfile/"
    def resp = nanotrader.put(path:"${accountProfilePath}",
                              requestContentType:JSON,
                              body:[address:"updated address",
                                    accounts:[[openbalance:200.00]],
                                    passwd:"updated password",
                                    userid:userid,
                                    email:"updated email",
                                    creditcard:"666666666666",
                                    fullname:userid,
                                    profileid:id])
    if (positive) {
      assert resp.status == 200
      //println "DATA:" + resp.data + ":"
    }
    else {
      assert resp.status == 400
    }
  }
  catch(ex) {
    if (!positive) {
      assert ex.response.status == 400
      //println "400 response code found as expected"
    }
    else {
      throw ex
    }
  }
}

def getAccount(id, positive=true) {
  try {
    def accountPath = "/spring-nanotrader-services/api/account/" + id
    def resp = nanotrader.get(path:"${accountPath}")
    if (positive) {
      assert resp.status == 200
      //println "\n\n##################### ACCOUNT DATA #####################"
      //println "DATA:" + resp.data + ":"
    }
    else {
      assert resp.status == 404
    }
  }
  catch(ex) {
    if (!positive) {
      assert ex.response.status == 404
      //println "404 response code found as expected"
    }
    else {
      throw ex
    }
  }
}

def createAccount(id) {
  try {
    def accountPath = "/spring-nanotrader-services/api/account"
    def resp = nanotrader.post(path:"${accountPath}")
    assert resp.status == 201
    //println "DATA:" + resp.data + ":"
  }
  catch(ex) {
    throw ex
}
}

def getSpecificHoldingForAccount(accountid, holdingid, positive=true) {
  try {
    def holdingPath = "/spring-nanotrader-services/api/" + accountid + "/holding/" + holdingid
    def resp = nanotrader.get(path:"${holdingPath}")
    if (positive) {
      assert resp.status == 200
      //println "\n\n##################### HOLDING DATA #####################"
      //println "DATA:" + resp.data + ":"
    }
    else {
      assert resp.status == 404
    }
  }
  catch(ex) {
   if (!positive) {
      assert ex.response.status == 404
      //println "404 response code found as expected"
    }
    else {
      throw ex
    }
  }
}

def String getAllHoldingsForAccount(accountid, positive=true) {
  String data = ""
  try {
    def holdingPath = "/spring-nanotrader-services/api/" + accountid + "/holding"
    def resp = nanotrader.get(path:"${holdingPath}")
    if (positive) {
      assert resp.status == 200
      //println "\n\n##################### HOLDING DATA #####################"
      //println "DATA:" + resp.data + ":"
      data = resp.data
    }
    else {
      assert resp.status == 404
    }
  }
  catch(ex) {
   if (!positive) {
      assert ex.response.status == 404
      //println "404 response code found as expected"
    }
    else {
      throw ex
    }
  }
  return data
}

def synchronized getQuote(symbol, positive=true) {
  try {
    def quotePath = "/spring-nanotrader-services/api/" + "quote/" + symbol
    def resp = nanotrader.get(path:"${quotePath}")
    if (positive) {
      assert resp.status == 200
      //println "\n\n##################### QUOTE DATA #####################"
      //println "DATA:" + resp.data + ":"
    }
    else {
     assert resp.status == 404
    }
  }
  catch(ex) {
   if (!positive) {
      assert ex.response.status == 404
      //println "404 response code found as expected"
    }
    else {
      throw ex
    }
  }
}

def createQuote(companyName='newcompany', symbol='NCPY', positive=true) {
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
                                     change1:1])
    if (positive) {
      assert resp.status == 201
      //println "DATA:" + resp.data + ":"
    }
    else {
      assert resp.status == 400
    }
  }
  catch(ex) {
   if (!positive) {
      assert ex.response.status == 400
      //println "400 response code found as expected"
    }
    else {
      throw ex
    }
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
}

def verificationTests() {
  testAdvancedCreateOrder()
  testAdvancedUpdateOrder()
  //testAdvancedGetAccount()
  //testAdvancedGetQuote()
}

def testAdvancedCreateOrder() {
  try {
    accountid1 = 1
    accountid2 = 2
    quantity1 = 9876543
    quantity2 = 3456789
    symbol1 = 's1'
    symbol2 = 's2'

    createOrder(accountid1, quantity1, 'buy', symbol1)
    createOrder(accountid2, quantity2, 'buy', symbol2)

    data = getAllHoldingsForAccount(accountid1)
    data2 = getAllHoldingsForAccount(accountid2)

    //println data
    //println data2

    checkLabel1 = "\"quantity\":" + quantity1
    checkLabel2 = "\"quantity\":" + quantity2

    if (data.indexOf(checkLabel1) >= 0 && data2.indexOf(checkLabel2) >= 0) {
      println "testAdvancedCreateOrder PASS"
    }
    else {
      println "testAdvancedCreateOrder FAIL"
    }
  }
  catch (Throwable t) {
    writeExceptionToFile(t)
    println "testAdvancedCreateOrder FAIL";
  }
}

def testAdvancedUpdateOrder() {
  try {
    oldQuantity1 = 56789
    oldQuantity2 = 12345
    newQuantity1 = oldQuantity1 + 1
    newQuantity2 = oldQuantity2 + 1
    orderId1 = createOrder(1, oldQuantity1, 'buy', 's1')
    orderId2 = createOrder(2, oldQuantity2, 'buy', 's2')

    //println "orderId1:" + orderId1
    //println "orderId2:" + orderId2

    updateOrder(1, orderId1, newQuantity1)
    updateOrder(2, orderId2, newQuantity2)

    data = getOrder(1, 'all')
    data2 = getOrder(2, 'all')

    //println "data:" + data
    //println "data2:" + data2

    i = data.indexOf("{\"orderid\":" + orderId1)
    j = data2.indexOf("{\"orderid\":" + orderId2)

    assert (i >=0 && j >= 0)

    i2 = data.indexOf('}', i)
    j2 = data2.indexOf('}', j)

    checkString1 = data.substring(i, i2)
    checkString2 = data2.substring(j, j2)

    assert (checkString1 != null && checkString2 != null)

    checkLabel1 = "\"quantity\":" + newQuantity1
    checkLabel2 = "\"quantity\":" + newQuantity2

    //println "checkString1:" + checkString1
    //println "checkString2:" + checkString2

    //println "checkLabel1:" + checkLabel1
    //println "checkLabel2:" + checkLabel2

    if (checkString1.indexOf(checkLabel1) >= 0 && checkString2.indexOf(checkLabel2) >= 0) {
      println "testAdvancedUpdateOrder PASS"
    }
    else {
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
    writeExceptionToFile(t)
    println "testAdvancedUpdateOrder FAIL";
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
  try {
    getOrder(1, "all")
    getOrder(1, "Open")
    getOrder(1, "Completed")
    getOrder(1, "closed")
    getOrder(1, "unknown", false)

    println "testGetOrder PASS";
  }
  catch (Throwable t) {
    writeExceptionToFile(t)
    println "testGetOrder FAIL";
  }
}

def testCreateOrder() {
  try {
    createOrder(1, 555, 'buy', 's10')
    createOrder(1, 555, 'buy', 'invalid_quote', false)

    println "testCreateOrder PASS";
  }
  catch (Throwable t) {
    writeExceptionToFile(t)
    println "testCreateOrder FAIL";
  }
}

def testUpdateOrder() {
  try {
    updateOrder(100, 999, 88888)
    updateOrder(567856785678, 1, 55000, false)

    println "testUpdateOrder PASS"
  }
  catch (Throwable t) {
    writeExceptionToFile(t)
    println "testUpdateOrder FAIL";
  }
}

def testGetAccountProfile() {
  try {
    getAccountProfile(1)
    getAccountProfile(555666777, false)

    println "testGetAccountProfile PASS"
  }
  catch (Throwable t) {
    writeExceptionToFile(t)
    println "testGetAccountProfile FAIL";
  }
}

def testCreateAccountProfile() {
  try {
    createAccountProfile()
    createAccountProfile("user1", false)

    println "testCreateAccountProfile PASS"
  }
  catch (Throwable t) {
    writeExceptionToFile(t)
    println "testCreateAccountProfile FAIL";
  }
}

def testUpdateAccountProfile() {
  try {
    updateAccountProfile(2, "user1")
    updateAccountProfile(777777777, "invalid_user", false)

    println "testUpdateAccountProfile PASS"
  }
  catch (Throwable t) {
    writeExceptionToFile(t)
    println "testUpdateAccountProfile FAIL";
  }
}

def testGetAccount() {
  try {
    getAccount(1)
    getAccount(5555555555, false)

    println "testGetAccount PASS"
  }
  catch (Throwable t) {
    writeExceptionToFile(t)
    println "testGetAccount FAIL";
  }
}

def testGetSpecificHoldingForAccount() {
  try {
    getSpecificHoldingForAccount(1, 1)
    getSpecificHoldingForAccount(1, 2)
    getSpecificHoldingForAccount(1, 3)
    getSpecificHoldingForAccount(55555555, 11)

    println "testGetSpecificHoldingForAccount PASS"
  }
  catch (Throwable t) {
    writeExceptionToFile(t)
    println "testGetSpecificHoldingForAccount FAIL";
  }
}

def testGetAllHoldingsForAccount() {
  try {
    getAllHoldingsForAccount(1)
    getAllHoldingsForAccount(555555555, false)

    println "testGetAllHoldingsForAccount PASS"
  }
  catch (Throwable t) {
    writeExceptionToFile(t)
    println "testGetAllHoldingsForAccount FAIL";
  }
}

def testGetQuote() {
  try {
    getQuote('s0')
    getQuote('InvalidQuote', false)

    println "testGetQuote PASS"
  }
  catch (Throwable t) {
    writeExceptionToFile(t)
    println "testGetQuote FAIL";
  }
}

def testCreateQuote() {
  try {
    createQuote()
    //createQuote('s1 company', 's1', false)

    println "testCreateQuote PASS"
  }
  catch (Throwable t) {
    writeExceptionToFile(t)
    println "testCreateQuote FAIL";
  }
}

init()
basicVerificationTests()
verificationTests()



