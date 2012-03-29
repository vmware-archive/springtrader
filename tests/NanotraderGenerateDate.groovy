import groovy.util.*
import org.codehays.groovy.runtime.*
import NanoTraderRESTClient.*

def client = new NanoTraderRESTClient()
client.init()
client.getAuthToken()


