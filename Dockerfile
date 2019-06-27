FROM centos:centos6

# Set ENV
ENV GRADLE_OPTS='-Xmx1024m -Xms256m -XX:MaxPermSize=512m'
ENV GROOVY_HOME=/usr/groovy/groovy-2.3.0-beta-2
ENV PATH=$PATH:$GROOVY_HOME/bin
ENV JAVA_HOME=/usr/

# Prepare directory
RUN mkdir springtrader
ADD . springtrader/
WORKDIR springtrader/
RUN chmod +x install_springtrader.sh entry.sh

# Perform SpringTrader installation
RUN ./install_springtrader.sh

ENTRYPOINT ["./entry.sh"]
###Access Web UI at http://localhost:8080/spring-nanotrader-web/#login
