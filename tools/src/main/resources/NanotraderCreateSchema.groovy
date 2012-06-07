import groovy.sql.Sql
import org.apache.tools.ant.taskdefs.SQLExec
import org.apache.tools.ant.Project

def loadProps() {
  def props = new Properties()
  new File("nanotrader.properties").withInputStream {
    stream -> props.load(stream)
  }
  p = new ConfigSlurper().parse(props)
}

def createSchema() {
  // Using apache ant SQLExec to run nanotrader sql DDL and DML scripts 
  // First create the database
  // Change Postgres administrator username password if its not postgres/postgres
  // in nanotrader.properties file. Properties are dbAdminUser and dbAdminPasswd

  Project project = new Project();
  project.init()
  project.setName("Nanotrader DB Creation")
  
  SQLExec schema = new SQLExec();
  schema.setProject(project)
  schema.setTaskType("sql");
  schema.setTaskName("sql");
  schema.setSrc(new File("nanotrader-database.sql"));
  schema.setDriver("org.postgresql.Driver");
  schema.setPassword(p.dbAdminPasswd);
  schema.setUserid(p.dbAdminUser);
  schema.setUrl(p.dbURLPrefix + p.dbHost + ":" + p.dbPort);
  schema.setAutocommit(true)
  schema.execute();

  // Create Tables and sequences
  SQLExec sqlExec = new SQLExec();
  sqlExec.setProject(project)
  sqlExec.setTaskType("sql");
  sqlExec.setTaskName("sql");
  sqlExec.setSrc(new File("nanotrader-tables.ddl"));
  sqlExec.setDriver("org.postgresql.Driver");
  sqlExec.setPassword(p.dbPasswd);
  sqlExec.setUserid(p.dbUser);
  sqlExec.setUrl(p.dbURLPrefix + p.dbHost + ":" + p.dbPort+ "/nanotrader");
  sqlExec.execute();

  // Load Quote Data
  SQLExec insert = new SQLExec();
  insert.setProject(project)
  insert.setTaskType("sql");
  insert.setTaskName("sql");
  insert.setSrc(new File("initdb.sql"));
  insert.setDriver("org.postgresql.Driver");
  insert.setPassword(p.dbPasswd);
  insert.setUserid(p.dbUser);
  insert.setUrl(p.dbURLPrefix + p.dbHost + ":" + p.dbPort+ "/nanotrader");
  insert.execute();

}

loadProps()
createSchema()
