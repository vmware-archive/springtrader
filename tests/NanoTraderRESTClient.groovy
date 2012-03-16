#!/usr/bin/env groovy

//groovy -classpath /Users/administrator/Downloads/commons-beanutils-1.8.3/commons-beanutils-1.8.3.jar:/Users/administrator/Downloads/ezmorph-1.0.5.jar:/Users/administrator/Downloads/commons-lang-2.6/commons-lang-2.6.jar:/Users/administrator/Downloads/xerces-2_11_0/xercesImpl.jar:/Users/administrator/Downloads/nekohtml-1.9.15/nekohtml.jar:/Users/administrator/Downloads/commons-collections-3.2.1/commons-collections-3.2.1.jar:/Users/administrator/Downloads/xml-commons-resolver-1.2/resolver.jar:/Users/administrator/Downloads/json-lib-2.3-jdk15.jar:/Users/administrator/Downloads/http-builder-0.5.2.jar:/Users/administrator/Downloads/httpcomponents-client-4.1.3/lib/commons-codec-1.4.jar:/Users/administrator/Downloads/httpcomponents-client-4.1.3/lib/httpclient-4.1.3.jar:/Users/administrator/Downloads/httpcomponents-client-4.1.3/lib/httpcore-4.1.4.jar:/Users/administrator/Downloads/httpcomponents-client-4.1.3/lib/commons-logging-1.1.1.jar:/Users/administrator/Downloads/httpcomponents-client-4.1.3/lib/httpclient-cache-4.1.3.jar:/Users/administrator/Downloads/httpcomponents-client-4.1.3/lib/httpmime-4.1.3.jar NanoTraderRESTClient.groovy
import groovyx.net.http.RESTClient
import groovy.util.slurpersupport.GPathResult

import java.util.Random

import static groovyx.net.http.ContentType.URLENC
import static groovyx.net.http.ContentType.JSON
import static groovyx.net.http.ContentType.HTML

path = "http://localhost:8080"
def nanotrader = 0

def init() {
  nanotrader = new RESTClient(path)
}

def getOrder(id, status, positive=true) {
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
      println "\n\n##################### ORDER DATA #####################"
      println "DATA:" + resp.data + ":"
    }
  }
  catch(ex) {
    if (!positive) {
      assert ex.response.status == 404
      println "404 response code found as expected"
    }
    else {
      println "response code:" + ex.response.status
      print ex.response.data
      ex.printStackTrace()
    }
  }
}

def synchronized createOrder(id, quantity=555, orderType="buy", symbol="s0", positive=true) {
  try {
    def orderPath = "/spring-nanotrader-services/api/" + id + "/order"
    def resp = nanotrader.post(path:"${orderPath}",
                               body:[quantity:quantity, ordertype:orderType, quote:[symbol:symbol]],
                               requestContentType:JSON)
   if (positive) {
     assert resp.status == 201
   }
  }
  catch(ex) {
    if (!positive) {
      assert ex.response.status == 400
      println "400 response code found as expected"
    }
    else {
      println "response code:" + ex.response.status
      print ex.response.data
      ex.printStackTrace()
    }
  }
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
  }
  catch(ex) {
    if (!positive) {
      assert ex.response.status == 400
      println "400 response code found as expected"
    }
    else {
      println "response code:" + ex.response.status
      print ex.response.data
      ex.printStackTrace()
    }
  } 
}

def synchronized getAccountProfile(id) {
  try {
    def accountProfilePath = "/spring-nanotrader-services/api/accountProfile/" + id
    def resp = nanotrader.get(path:"${accountProfilePath}")
    assert resp.status == 200
    //println Thread.getName()
    println "\n\n##################### ACCOUNT PROFILE DATA #####################"
    println "DATA:" + resp.data + ":"
  }
  catch(ex) {
    print ex.response.data
    ex.printStackTrace()
    assert false
  }
}

def synchronized createAccountProfile() {
  try {
    Random rand = new Random()
    int range = 10000000
    userName = "randomuser" + rand.nextInt(range)
    now = Calendar.instance
    date = now.time
    millis = date.time
    //println Thread.getName()
    //print "### userName:" + userName + millis
    userName += millis
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
    assert resp.status == 201
    //println "DATA:" + resp.data + ":"
  }
  catch(ex) {
    print ex.response.data
    ex.printStackTrace()
    assert false
  }
}

def updateAccountProfile(id) {
 try {
    def accountProfilePath = "/spring-nanotrader-services/api/accountProfile/"
    def resp = nanotrader.put(path:"${accountProfilePath}",
                              requestContentType:JSON,
                              body:[address:"2f3",
                                    accounts:[[openbalance:100.00]],
                                    passwd:"wins3333",
                                    userid:"wins333",
                                    email:"wins333@verizon.net",
                                    creditcard:"666666666666",
                                    fullname:"winston koh4",
                                    profileid:500])
    assert resp.status == 200
    //println "DATA:" + resp.data + ":"
  }
  catch(ex) {
    print ex.response.data
    ex.printStackTrace()
    assert false
  }
}

def getAccount(id) {
  try {
    def accountPath = "/spring-nanotrader-services/api/account/" + id
    def resp = nanotrader.get(path:"${accountPath}")
    assert resp.status == 200
    println "\n\n##################### ACCOUNT DATA #####################"
    println "DATA:" + resp.data + ":"
  }
  catch(ex) {
    print ex.response.data
    ex.printStackTrace()
    assert false
  }
}

def createAccount(id) {
  try {
    def accountPath = "/spring-nanotrader-services/api/account"
    def resp = nanotrader.post(path:"${accountPath}")
    assert resp.status == 200
    println "DATA:" + resp.data + ":"
  }
  catch(ex) {
    print ex.response.data
    ex.printStackTrace()
    assert false
}
}

def getSpecificHoldingForAccount(accountid, holdingid) {
  try {
    def holdingPath = "/spring-nanotrader-services/api/" + accountid + "/holding/" + holdingid
    def resp = nanotrader.get(path:"${holdingPath}")
    assert resp.status == 200
    println "\n\n##################### HOLDING DATA #####################"
    println "DATA:" + resp.data + ":"
  }
  catch(ex) {
    print ex.response.data
    ex.printStackTrace()
    assert false
  }
}

def getAllHoldingsForAccount(accountid) {
  try {
    def holdingPath = "/spring-nanotrader-services/api/" + accountid + "/holding"
    def resp = nanotrader.get(path:"${holdingPath}")
    assert resp.status == 200
    println "\n\n##################### HOLDING DATA #####################"
    println "DATA:" + resp.data + ":"
  }
  catch(ex) {
    print ex.response.data
    ex.printStackTrace()
    assert false
  }
}

def createHolding(id) {
  try {
    def holdingPath = "/spring-nanotrader-services/api/" + id + "/holding"
    def resp = nanotrader.post(path:"${holdingPath}")
    assert resp.status == 200
    println "DATA:" + resp.data + ":"
  }
  catch(ex) {
    print ex.response.data
    ex.printStackTrace()
    assert false
  }
}

def synchronized getQuote(symbol) {
  try {
    def quotePath = "/spring-nanotrader-services/api/" + "quote/" + symbol
    def resp = nanotrader.get(path:"${quotePath}")
    assert resp.status == 200
    println "\n\n##################### QUOTE DATA #####################"
    println "DATA:" + resp.data + ":"
  }
  catch(ex) {
    print ex.response.data
    ex.printStackTrace()
    assert false
  }
}

def createQuote(id) {
  try {
    def quotePath = "/spring-nanotrader-services/api/" + "/quote" + id
    def resp = nanotrader.post(path:"${quotePath}")
    assert resp.status == 200
    println "DATA:" + resp.data + ":"
  }
  catch(ex) {
    print ex.response.data
    ex.printStackTrace()
    assert false
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

init()

/*
getOrder(1, "all")
getOrder(1, "Open")
getOrder(1, "Completed")
getOrder(1, "closed")
getOrder(1, "unknown", false)

createOrder(1, 555, 'buy', 's10')
createOrder(1, 555, 'buy', 'invalid_quote', false)
*/
updateOrder(100, 999, 88888)
updateOrder(567856785678, 1, 55000, false)




//getQuote('s0')
//getAllHoldingsForAccount(1)
//getSpecificHoldingForAccount(1, 1)
//getAccount(1)
//getAccountProfile(1)

