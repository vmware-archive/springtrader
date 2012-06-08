import groovy.sql.Sql
import org.apache.tools.ant.taskdefs.SQLExec
import org.apache.tools.ant.Project

def loadProps() {
  def props = new Properties()
  new File("nanotrader.sqlf.properties").withInputStream {
    stream -> props.load(stream)
  }
  p = new ConfigSlurper().parse(props)
}

def createSchema() {
  // Using apache ant SQLExec to run nanotrader sql DDL and DML scripts 
  // First create the database

  Project project = new Project();
  project.init()
  project.setName("Nanotrader DB Creation")
  
  // Create Tables and sequences
  SQLExec sqlExec = new SQLExec();
  SQLExec.OnError onError = new SQLExec.OnError();
  onError.setValue("continue");
  sqlExec.setProject(project)
  sqlExec.setTaskType("sql");
  sqlExec.setTaskName("sql");
  sqlExec.setSrc(new File("nanotrader-sqlf-tables.ddl"));
  sqlExec.setDriver(p.dbDriver);
  sqlExec.setPassword(p.dbPasswd);
  sqlExec.setUserid(p.dbUser);
  sqlExec.setUrl(p.dbURLPrefix + p.dbHost + ":" + p.dbPort);
  sqlExec.setOnerror(onError);
  sqlExec.execute();

  // Load Quote Data
  SQLExec insert = new SQLExec();
  insert.setProject(project)
  insert.setTaskType("sql");
  insert.setTaskName("sql");
  insert.setSrc(new File("initdb-sqlf.sql"));
  insert.setDriver(p.dbDriver);
  insert.setPassword(p.dbPasswd);
  insert.setUserid(p.dbUser);
  insert.setUrl(p.dbURLPrefix + p.dbHost + ":" + p.dbPort);
  sqlExec.setOnerror(onError);
  insert.execute();
}

loadProps()
createSchema()
