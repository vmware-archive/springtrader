package org.springframework.nanotrader;

import com.meterware.httpunit.*;
import org.junit.*;
import static org.junit.Assert.*;
import java.util.*;
import java.io.*;

public class NanoTraderTest {
  WebResponse response;
  WebRequest request;
  WebConversation conversation;
  
  static String context_uri = "";

  @BeforeClass
  public static void oneTimeSetUp() {
    context_uri = "https://10.150.82.211:8080/daytrader/app";
    HttpUnitOptions.setScriptingEnabled(false);
  }

  @AfterClass
  public static void oneTimeTearDown() {
    System.out.println("@AfterClass - oneTimeTearDown");
  }

  @Before
  public void setUp() throws Exception {
    try {
      request = new GetMethodWebRequest(context_uri);
      conversation = new WebConversation();
      response = conversation.getResponse(request);
      WebForm loginForm = response.getForms()[0];
      loginForm.setParameter("uid", "uid:0");
      loginForm.setParameter("passwd", "xxx");
      loginForm.getSubmitButtons()[0].click();
      response = conversation.getCurrentPage();
      String output = response.getText();
      String title = response.getTitle();
      assertTrue(title.contains("Welcome to DayTrader"));
      assertTrue(output.contains("Logoff"));
      assertTrue(output.contains("uid:0"));
    }
    catch (Exception ex) {
      ex.printStackTrace();
      assertTrue(false);
    }
  }

  @After
  public void tearDown() throws Exception {
    request = new GetMethodWebRequest(context_uri + "?action=logout");
    response = conversation.getResponse(request);
  }

  @Test
  public void testLogin() {
    try {
      request = new GetMethodWebRequest(context_uri + "?action=logout");
      response = conversation.getResponse(request);
      request = new GetMethodWebRequest(context_uri);
      conversation = new WebConversation();
      response = conversation.getResponse(request);
      WebForm loginForm = response.getForms()[0];
      loginForm.setParameter("uid", "uid:0");
      loginForm.setParameter("passwd", "xxx");
      loginForm.getSubmitButtons()[0].click();
      response = conversation.getCurrentPage();
      String output = response.getText();
      String title = response.getTitle();
      assertTrue(title.contains("Welcome to DayTrader"));
      assertTrue(output.contains("Logoff"));
      assertTrue(output.contains("uid:0"));
    }
    catch (Exception ex) {
      ex.printStackTrace();
      assertTrue(false);
    }
  }

  @Test
  public void testLogout() {
    try {
      response = conversation.getCurrentPage();
      String output = response.getText();
      assertTrue(output.contains("DayTrader Home"));
      assertTrue(!output.contains("DayTrader Login"));
      request = new GetMethodWebRequest(context_uri + "?action=logout");
      response = conversation.getResponse(request);
      output = conversation.getCurrentPage().getText();
      //System.out.println(output);
      assertTrue(output.contains("DayTrader Login"));
    }
    catch (Exception ex) {
      ex.printStackTrace();
      assertTrue(false);
    }
  }

  @Test
  public void testBuy() {
    try {
      System.out.println("executing buy...");
    }
    catch (Exception ex) {
      ex.printStackTrace();
      assertTrue(false);
    }
  }

  @Test
  public void testSell() {
    System.out.println("executing sell...");
    try {
      System.out.println("executing buy...");
    }
    catch (Exception ex) {
      ex.printStackTrace();
      assertTrue(false);
    }
  }

  @Test
  public void testGetMarketSummary() {
    System.out.println("executing getMarketSummary...");
    assertTrue(true);
  }

  @Test
  public void testQueueOrder() {
    System.out.println("executing queueOrder...");
    assertTrue(true);
  }

  @Test
  public void testCompleteOrder() {
    System.out.println("executing completeOrder...");
    assertTrue(true);
  }

  @Test
  public void testCancelOrder() {
    System.out.println("executing cancelOrder...");
    assertTrue(true);
  }

  @Test
  public void testOrderCompleted() {
    System.out.println("executing orderCompleted...");
    assertTrue(true);
  }

  @Test
  public void testGetOpenOrders() {
    try {
      request = new GetMethodWebRequest(context_uri + "/account/1/orders?status=open");
      response = conversation.getResponse(request);
    }
    catch (Exception ex) {
      ex.printStackTrace();
      assertTrue(false);
    }
  }

  @Test
  public void testGetClosedOrders() {
    try {
      request = new GetMethodWebRequest(context_uri + "/account/1/orders?status=closed");
      response = conversation.getResponse(request);
    }
    catch (Exception ex) {
      ex.printStackTrace();
      assertTrue(false);
    }
  }

  @Test
  public void testCreateQuote() {
    try {
      request = new PostMethodWebRequest(context_uri + "/quotes");
      response = conversation.getResponse(request);
    }
    catch (Exception ex) {
      ex.printStackTrace();
      assertTrue(false);
    }
  }

  @Test
  public void testGetQuote() {
    try {
      request = new GetMethodWebRequest(context_uri + "/quotes/1");
      response = conversation.getResponse(request);
    }
    catch (Exception ex) {
      ex.printStackTrace();
      assertTrue(false);
    }
  }

  @Test
  public void testGetQuotes() {
    try {
      request = new GetMethodWebRequest(context_uri + "/quotes");
      response = conversation.getResponse(request);
    }
    catch (Exception ex) {
      ex.printStackTrace();
      assertTrue(false);
    }
  }

  @Test
  public void testUpdateQuotePriceVolume() {
    System.out.println("executing updateQuotePriceVolume...");
    assertTrue(true);
  }

  @Test
  public void testGetHoldings() {
    System.out.println("executing getHoldings...");
    assertTrue(true);
  }

  @Test
  public void testGetHolding() {
    System.out.println("executing getHolding...");
    assertTrue(true);
  }

  @Test
  public void testGetAccountData() {
    try {
      request = new GetMethodWebRequest(context_uri + "/account/1");
      response = conversation.getResponse(request);
    }
    catch (Exception ex) {
      ex.printStackTrace();
      assertTrue(false);
    }
  }

  @Test
  public void testGetAccountProfile() {
    try {
      request = new GetMethodWebRequest(context_uri + "/account/1/profile");
      response = conversation.getResponse(request);
    }
    catch (Exception ex) {
      ex.printStackTrace();
      assertTrue(false);
    }
  }

  @Test
  public void testUpdateAccountProfile() {
    try {
      InputStream is = null;
      request = new PutMethodWebRequest(context_uri + "/account/1/profile", is, "");
      response = conversation.getResponse(request);
    }
    catch (Exception ex) {
      ex.printStackTrace();
      assertTrue(false);
    }
  }

  @Test
  public void testRegister() {
    try {
      request = new PostMethodWebRequest(context_uri + "/account");
      response = conversation.getResponse(request);
    }
    catch (Exception ex) {
      ex.printStackTrace();
      assertTrue(false);
    }
  }

  @Test
  public void testResetTrade() {
    System.out.println("executing resetTrade...");
    assertTrue(true);
  }



}