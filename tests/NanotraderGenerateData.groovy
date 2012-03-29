import groovy.util.*
import org.codehays.groovy.runtime.*
import NanoTraderRESTClient.*
import au.com.bytecode.opencsv.CSVReader

List userdata

def createQuotes() {
    // populate quote table if not done already
}

def registerUsers() {
    def client = new NanoTraderRESTClient()
    client.init()
    // read names.csv in to a List
    CSVReader reader = new CSVReader(new FileReader("names.csv"))
    userdata = reader.readAll();
    // register all users in userdata List
    userdata.eachWithIndex() { obj, i ->
        //println "Registering [" + i + "] ::" + obj[0] + " | " + obj[1]
        try {
            client.createAccountProfile(obj[0], false, 201)
        } catch (ex) {
            println "Failed to register user :: " + obj[0] + " (HTTP response = [" + ex.getMessage() + "])"
        } 
    }
}

def getTokens() {
    def client = new NanoTraderRESTClient()
    client.init()
    // get authToken and account id for users in userdata List
    // Note: Remember to call rgisterUsers() before calling this function
    userdata.eachWithIndex() { obj, i ->
        def jsonResponse = client.getAuthToken(obj[0], 'randompasswd')
        userdata[i][2] =  jsonResponse.authToken
        userdata[i][3] =  jsonResponse.accountid
    }
}

def buyOrders() {
    userdata.eachWithIndex() { obj, i ->
        //read 4th column from names.cvs and split around ":" to get buy symbols
        def quoteArray = obj[4].split(":")
        println " Bye order for : " + obj[0]
        quoteArray.each { 
            println "     Buying Quote : " + it
            // Call buy api here
        }
    } 
}

def sellOrders() {
    userdata.eachWithIndex() { obj, i ->
        //read 5th column from names.cvs and split around ":" to get sell symbols
        def quoteArray = obj[5].split(":")
        println " Sell order for : " + obj[0]
        quoteArray.each { 
            println "     Selling Quote : " + it
            // Call sell api here
        }
    } 
}

registerUsers()
getTokens()
buyOrders()
sellOrders()
