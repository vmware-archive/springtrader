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

/*
 * - Kill TC Server (System.exit)
 * - Crash TC Server (Performing OOM ops)
 * - Stop RabbitMQ Server gracefully
 * - Kill RabbitMQ Server
 *
 */
public class NanoTraderChaosMonkeyClient {

def path = "http://localhost:8080"
def nanotrader = 0
def logFile = 0

def START_TCSERVER = 'scripts/start_tcserver.sh'
def RESTART_TCSERVER = 'scripts/restart_tcserver.sh'
def START_RABBITMQ = 'scripts/start_rabbitmq.sh'
def STOP_RABBITMQ = 'scripts/stop_rabbitmq.sh'
def KILL_RABBITMQ = 'scripts/kill_rabbitmq.sh'

def totalCount = 0
def passCount = 0
def failCount = 0

def disableLogger() {
  Handler[] handlers = Logger.getLogger("").getHandlers()
  for (Handler handler : handlers) {
    handler.setLevel(Level.OFF)
  }
}

def init() {
  disableLogger()
  nanotrader = new RESTClient(path)
  logFile = new PrintWriter(new FileWriter("nanotraderchaostest.debug"))
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

def printSummary() {
  println "\nTotal:" + totalCount + "\tPass:" + passCount + "\tFail:" + failCount
  println "Debug log file written to: nanotraderchaostest.debug"
}

def killTCServer() {
  totalCount++
  try {
    def killPath = "/spring-nanotrader-services/api/chaos/kill"
    nanotrader.get(path:"${killPath}")
    failCount++
    println "killTCServer FAIL";
  }
  catch (Throwable t) {
    passCount++
    writeExceptionToFile(t)
    println "killTCServer PASS";
  }
}

def startTCServer() {
  totalCount++
  try {
    START_TCSERVER.execute()
    passCount++
    println "startTCServer PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "startTCServer FAIL";
  }
}

def restartTCServer() {
  totalCount++
  try {
    RESTART_TCSERVER.execute()
    passCount++
    println "restartTCServer PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "restartTCServer FAIL";
  }
}

def crashTCServer() {
  totalCount++
  try {
    def crashPath = "/spring-nanotrader-services/api/chaos/oom"
    def resp = nanotrader.get(path:"${crashPath}")
    failCount++
    println "crashTCServer FAIL"
  }
  catch (Throwable t) {
    passCount++
    writeExceptionToFile(t)
    println "crashTCServer PASS";
  }
}

def startRabbitMQ() {
  totalCount++
  try {
    START_RABBITMQ.execute()
    passCount++
    println "startRabbitMQ PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "startRabbitMQ FAIL";
  }
}

def stopRabbitMQ() {
  totalCount++
  try {
    STOP_RABBITMQ.execute()
    passCount++
    println "stopRabbitMQ PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "stopRabbitMQ FAIL";
  }
}

def killRabbitMQ() {
  totalCount++
  try {
    KILL_RABBITMQ.execute()
    passCount++
    println "killRabbitMQ PASS"
  }
  catch (Throwable t) {
    failCount++
    writeExceptionToFile(t)
    println "killRabbitMQ FAIL";
  }
}

static main(args) {
  def inst = new NanoTraderChaosMonkeyClient()
  inst.init()

  if (args.length == 1 ) {
    if (args[0] == "help") {
      println "groovy NanoTraderChaosMonkeyClient.groovy [killTCServer|crashTCServer|startTCServer|restartTCServer|stopRabbitMQ|killRabbitMQ|startRabbitMQ]"
    }
    else {
      //print "args:" + args[0]
      String command = args[0]
      inst."$command"()
    }
  }
  else {
    //inst.killTCServer()
    //inst.startTCServer()
    //inst.crashTCServer()
    //inst.restartTCServer()
    //inst.stopRabbitMQ()
    //inst.startRabbitMQ()
    //inst.killRabbitMQ()
    inst.startRabbitMQ()

    inst.printSummary()
  }
}
}