SpringTrader getting started guide is avaiable under github wiki
==============================================================
By downloading, installing, or using the Spring Trader software, you (the individual or legal entity) agree to be bound by the terms of the following license agreement:
[License Agreement](https://github.com/vFabric/springtrader/raw/master/license-agreement.pdf)

![Spring Trader Screenshot](https://raw.github.com/vFabric/springtrader/master/wiki/springtrader.png)
* See [Getting Started Guide](https://github.com/vFabric/springtrader/wiki/Getting-Started-Guide)


SpringTrader uses Gradle to Build
===================================

Either re-clone, or shut down STS after deleting projects and remove all Eclipse metadata files (.project, .classpath, .settings) - or see cleanEclipse below - but it's important to do it the first time.

Commands:

* ./gradlew build release
* ./gradlew cleanEclipse (deletes eclipse metadata files)
* ./gradlew eclipse (created metadata files)
* ./gradlew install - installs jars/poms in local maven repo

Import springtrader in Springsource Tool Suite (STS):
---

* Right click in Project Explorer and select Import -> Import...
* Choose Existing Project into Workspace
* Set root directory to full path of springtrader
* Select all Projects and click Finish
* You should see following projects in STS

    `spring-nanotrader-asynch-services`
    `spring-nanotrader-data`
    `spring-nanotrader-services`
    `spring-nanotrader-service-support`
    `spring-nanotrader-web`
    `spring-nanotrader-chaos`

  
* From STS main menu click Projects -> Build Automatically

Deploy springtrader to tc Server in STS:
---

* Right click spring-nanotrader-services and select Run As -> Run On Server
* Choose tc Server Developer Edition for server and click Next
* Drag following projects from Available to Configured column

    `spring-nanotrader-asynch-services`
    `spring-nanotrader-services`
    `spring-nanotrader-web`

* Click Finish
* Wait for server to start and then browse to http://localhost:8080/spring-nanotrader-web
