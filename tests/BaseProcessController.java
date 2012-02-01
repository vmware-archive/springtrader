package springsource.test;

import java.util.ArrayList;
import java.util.List;

public abstract class BaseProcessController {
  enum ProcessType { TC_SERVER };
  ProcessType pType = ProcessType.TC_SERVER;
  List<Integer> pids = new ArrayList<Integer>();
  
  public void setProcessType(ProcessType pType) {
    this.pType = pType;
  }

  public ProcessType getProcessType() {
    return pType;
  }

  public abstract void storePids() throws Exception;
  public abstract void killPids() throws Exception;
  
  public void showPids() {
    if (pids.size() == 0) {
      System.out.println("Process Id List is empty");
    }
    for (int pid : pids) {
      System.out.println("Process Id:" + pid);
    }
  }
}