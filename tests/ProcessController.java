package springsource.test;

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
      System.out.println(line);
      StringTokenizer st = new StringTokenizer(line);
      st.nextToken();
      try {
        int pid = Integer.parseInt(st.nextToken());
        pids.add(pid);
      }
      catch (Exception ex) {}
    }
  }
  
  public void storePids() throws Exception {
    if (pType == ProcessType.TC_SERVER) {
      Runtime rt = Runtime.getRuntime();
      Process p = rt.exec("ps -ef");
      processInputStream(p.getErrorStream());
      processInputStream(p.getInputStream());
    }
  }
  
  public void killPids() throws Exception {
    Runtime rt = Runtime.getRuntime();
    for (int pid : pids) {
      rt.exec("kill -9 " + pid);
    }
  }

  public static void main(String[] args) throws Exception {
    ProcessController controller = new ProcessController();
    controller.storePids();
    controller.showPids();
  }


}