import groovy.util.*
import groovy.json.JsonSlurper
import org.codehays.groovy.runtime.*
import org.nanotrader.*
import au.com.bytecode.opencsv.CSVReader
import groovy.sql.Sql

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

def test() {
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

test()
