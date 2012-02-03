Nanotrader now uses Gradle to Build
===================================

Either re-clone, or shut down STS after deleting projects and remove all Eclipse metadata files (.project, .classpath, .settings) - or see cleanEclipse below - but it's important to do it the first time.

Commands:

* ./gradlew build
* ./gradlew cleanEclipse (deletes eclipse metadata files)
* ./gradlew eclipse (created metadata files)
* ./gradlew install - installs jars/poms in local maven repo
