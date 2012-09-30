NanoTrader getting started guild is avaiable under github wiki
==============================================================

* See [Getting Started Guide](https://github.com/SpringSource/nanotrader/wiki/Getting-Started-Guide)


Nanotrader now uses Gradle to Build
===================================

Either re-clone, or shut down STS after deleting projects and remove all Eclipse metadata files (.project, .classpath, .settings) - or see cleanEclipse below - but it's important to do it the first time.

Commands:

* ./gradlew build release
* ./gradlew cleanEclipse (deletes eclipse metadata files)
* ./gradlew eclipse (created metadata files)
* ./gradlew install - installs jars/poms in local maven repo

Import nanotrader in Springsource Tool Suite (STS):
---

* Right click in Project Explorer and select Import -> Import...
* Choose Existing Project into Workspace
* Set root directory to full path of nanotrader
* Select all Projects and click Finish
* You should see following projects in STS

    `spring-nanotrader-asynch-services`
    `spring-nanotrader-data`
    `spring-nanotrader-services`
    `spring-nanotrader-service-support`
    `spring-nanotrader-web`
    `spring-nanotrader-chaos`

  
* From STS main menu click Projects -> Build Automatically

Deploy nanotrader to tc Server in STS:
---

* Right click spring-nanotrader-services and select Run As -> Run On Server
* Choose tc Server Developer Edition for server and click Next
* Drag following projects from Available to Configured column

    `spring-nanotrader-asynch-services`
    `spring-nanotrader-services`
    `spring-nanotrader-web`

* Click Finish
* Wait for server to start and then browse to http://localhost:8080/spring-nanotrader-web
