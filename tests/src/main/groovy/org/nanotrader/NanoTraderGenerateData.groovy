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

public class NanoTraderGenerateData {

def path = "http://localhost:8080"
def nanotrader = 0
def BIG_TEN = ['VMW', 'ORCL', 'MSFT', 'NFLX', 'GOOG', 'INTC', 'EBAY', 'DELL', 'AAPL', 'YHOO']
def numOfThreads = 100
Thread[] threads = new Thread[numOfThreads];

def disableLogger() {
  Handler[] handlers = Logger.getLogger("").getHandlers()
  for (Handler handler : handlers) {
    handler.setLevel(Level.OFF)
  }
}

def init() {
  disableLogger()
  nanotrader = new RESTClient(path)
}

def waitForCompletion(numOfThreads=100) {
  numOfThreads.times { i ->
    try {
       threads[i].join();
    }
    catch (InterruptedException ignore) {}
  }
}

def synchronized Object getAuthToken(username='jack', password='jack') {
  String authToken = ""
  int accountid = 1
  def user = username
  def passwd = password
  try {
    def path = "/spring-nanotrader-services/api/login"
    def resp = nanotrader.post(path:"${path}",
                              body:[username:user, password:passwd],
                              requestContentType:JSON)
    assert resp.status == 201
    authToken = resp.data
    def jsonObj = new JsonSlurper().parseText(authToken)
    return jsonObj
  }
  catch(ex) {
   ex.printStackTrace()
   throw ex
  }
}

def synchronized int createOrder(id, quantity=1, orderType="buy", symbol="VMW", authToken) {
  int orderId = 0
  try {
    def orderPath = "/spring-nanotrader-services/api/account/" + id + "/order"
    def resp = nanotrader.post(path:"${orderPath}",
                               body:[quantity:quantity, ordertype:orderType, quote:[symbol:symbol]],
                               requestContentType:JSON,
                               headers:[API_TOKEN:authToken])
    assert resp.status == 201
    def new_id = resp.getFirstHeader('location').getValue()
    def i = new_id.lastIndexOf("/")
    new_id = new_id.substring(i+1)
    orderId = Integer.parseInt(new_id)
  }
  catch(ex) {
    ex.printStackTrace()
  }
  return orderId
}

def synchronized createAccountProfile(user="user1", password="randompasswd", openbal=1000000.00) {
  try {
    def userName = user
    def accountProfilePath = "/spring-nanotrader-services/api/accountProfile"
    def resp = nanotrader.post(path:"${accountProfilePath}",
                               requestContentType:JSON,
                               body:[address:"My Random Address",
                                     accounts:[[openbalance:openbal]],
                                     passwd:password,
                                     userid:userName,
                                     email:"randomname@company.com",
                                     creditcard:"1111222233334444",
                                     fullname:userName])
    assert resp.status == 201
  }
  catch(ex) {
    ex.printStackTrace()
  }
}

def generateOrders(count) {
  count.times {
    def now = Calendar.instance
    def date = now.time
    def millis = date.time
    def testuser = "testuser"
    testuser += millis
    Random rand = new Random()
    int range = 10000000
    testuser += rand.nextInt(range)
    createAccountProfile(testuser, "testuser")
    def jsonResponse = getAuthToken(testuser, "testuser")
    def testAuthToken = jsonResponse.authToken
    def acctid = jsonResponse.accountid
    rand = new Random()
    range = 10
    def companyQuoteIndex = rand.nextInt(range)
    createOrder(acctid, 10, "buy", BIG_TEN[companyQuoteIndex], testAuthToken)
    //print "."
    Thread.yield()
  }
}

def loadTest(numThreads=100, numUsers=100) {
  numThreads.times { i ->
    def th = Thread.start {
      nanotrader = new RESTClient(path)
      generateOrders(numUsers)
    }
    //println "i:" + i
    //println "th:" + th
    threads[i] = th
  }
}

static main(args) {
  if (args.length > 1 || (args.length == 1 && args[0] == 'help')) {
      println "groovy NanoTraderGenerateData.groovy [number_of_users]"
      return
  }
  int numThreads = 100
  int numUsers = 100
  if (args.length == 1) {
    int users = Integer.parseInt(args[0])
    if (users < 100) {
      println "Please specify no less than 100 users"
      return
    }
    numUsers = users/numThreads
  }
  println "creating " + (numUsers * numThreads) + " users using " + numThreads + " threads"
  def now = Calendar.instance
  def date = now.time
  int millis = date.time
  def inst = new NanoTraderGenerateData()
  inst.init()
  inst.loadTest(numThreads, numUsers)
  inst.waitForCompletion(numThreads)
  now = Calendar.instance
  date = now.time
  int newMillis = date.time
  def seconds = (newMillis-millis)/1000
  println "Time taken:" + seconds + " seconds"
}
}
