package org.springframework.nanotrader;

import java.io.*;
import java.util.*;

public class ProcessController extends BaseProcessController {
  
  public ProcessController() {}
  
  public ProcessController(ProcessType pType) {
    this.pType = pType;
  }
  
  public void processInputStream(InputStream is) throws Exception {
    InputStreamReader isr = new InputStreamReader(is);
    BufferedReader br = new BufferedReader(isr);
    String line = null;
    while ((line = br.readLine()) != null) {
      //System.out.println(line);
      StringTokenizer st = new StringTokenizer(line);
      st.nextToken();
      try {
        int pid = Integer.parseInt(st.nextToken());
        String programName = "";
        while (st.hasMoreTokens()) {
          programName = st.nextToken();
          //System.out.println("program:" + programName);
        }
        //System.out.println("program:" + programName);
        if (pType == ProcessType.RABBIT_MQ) {
          if (programName.indexOf("rabbitmq") >= 0) {
            System.out.println("rabbitmq program:" + programName);
            pids.add(pid);
            return;
          }
        }
        else {
          pids.add(pid);
        }
      }
      catch (Exception ex) {}
    }
  }
  
  public void storePid(ProcessType pType) throws Exception {
    pids.clear();
    if (pType == ProcessType.RABBIT_MQ) {
      Runtime rt = Runtime.getRuntime();
      Process p = rt.exec("ps -ef");
      //processInputStream(p.getErrorStream());
      processInputStream(p.getInputStream());
    }
  }

  public void storePids() throws Exception {
    pids.clear();
    if (pType == ProcessType.TC_SERVER) {
      Runtime rt = Runtime.getRuntime();
      Process p = rt.exec("ps -ef");
      //processInputStream(p.getErrorStream());
      processInputStream(p.getInputStream());
    }
  }

  public void killPids() throws Exception {
    Runtime rt = Runtime.getRuntime();
    for (int pid : pids) {
      System.out.println("killing pid:" + pid);
      rt.exec("kill -9 " + pid);
    }
  }

  public void killRabbitMQ() throws Exception {
    //System.out.println("killing RabbitMQ service...");
    setProcessType(ProcessType.RABBIT_MQ);
    storePid(ProcessType.RABBIT_MQ);
    killPids();
  }

  public void startRabbitMQ() throws Exception {
    System.out.println("Starting RabbitMQ service...");
    Runtime rt = Runtime.getRuntime();
    Process p = rt.exec("rabbitmq-server");
  }

  public static void main(String[] args) throws Exception {
    ProcessController controller = new ProcessController();
    //controller.storePid(ProcessType.RABBIT_MQ);
    //controller.showPids();
    controller.startRabbitMQ();
    controller.killRabbitMQ();
  }


}