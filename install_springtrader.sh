# Set enviornment vars
export GRADLE_OPTS='-Xmx1024m -Xms256m -XX:MaxPermSize=512m'
export GROOVY_HOME=/usr/groovy/groovy-2.3.0-beta-2
export PATH=$PATH:$GROOVY_HOME/bin
export JAVA_HOME=/usr/

echo 'STARTING INSTALLATION'

echo 'INSTALLING GROOVY'
#Install Groovy
yum install git wget unzip java-1.7.0-openjdk-devel -y
mkdir /usr/groovy
cd /usr/groovy
wget http://dl.bintray.com/groovy/maven/groovy-binary-2.3.0-beta-2.zip
unzip groovy-binary-2.3.0-beta-2.zip && rm -f groovy-binary-2.3.0-beta-2.zip
mkdir -p /etc/vmware/vfabric/
echo 'I_ACCEPT_EULA_LOCATED_AT=http://www.vmware.com/download/eula/vfabric_app-platform_eula.html' > /etc/vmware/vfabric/accept-vfabric5.1-eula.txt

# Install vFabric products
echo 'INSTALLING SERVER'
rpm -ivhf http://repo.vmware.com/pub/rhel6/vfabric/5.1/vfabric-5.1-repo-5.1-1.noarch.rpm
rpm -Uvh https://download.fedoraproject.org/pub/epel/epel-release-latest-6.noarch.rpm
yum install vfabric-tc-server-standard vfabric-sqlfire -y
yum install erlang vfabric-rabbitmq-server -y

cd /opt/vmware/vfabric-sqlfire/vFabric_SQLFire_103
mkdir locator1 server1

echo 'COPYING SQLFIRE CLIENTS'
cp /opt/vmware/vfabric-sqlfire/vFabric_SQLFire_103/lib/sqlfireclient.jar /springtrader/lib/sqlfireclient-1.0.3.jar
cp /opt/vmware/vfabric-sqlfire/vFabric_SQLFire_103/lib/sqlfireclient.jar /springtrader/templates/springtrader/lib/sqlfireclient-1.0.3.jar

echo 'BUILDING PROJECT'
cd /springtrader
./gradlew clean build release
mkdir dist/libs

echo 'EXTRACTING ARTIFACTS'
cd /springtrader/dist
unzip DataGenerator.zip

echo 'COPYING ARTIFACTS TO SERVER'
cd /springtrader
cp -r /springtrader/templates/springtrader /opt/vmware/vfabric-tc-server-standard/templates
cd /opt/vmware/vfabric-tc-server-standard
./tcruntime-instance.sh create springtrader -t springtrader -f templates/springtrader/sqlfire.properties
cp /springtrader/dist/spring-nanotrader-asynch-services-1.0.1.BUILD-SNAPSHOT.war /opt/vmware/vfabric-tc-server-standard/springtrader/webapps/spring-nanotrader-asynch-services.war
cp /springtrader/dist/spring-nanotrader-services-1.0.1.BUILD-SNAPSHOT.war /opt/vmware/vfabric-tc-server-standard/springtrader/webapps/spring-nanotrader-services.war
cp /springtrader/dist/spring-nanotrader-web-1.0.1.BUILD-SNAPSHOT.war /opt/vmware/vfabric-tc-server-standard/springtrader/webapps/spring-nanotrader-web.war

cd /opt/vmware/vfabric-tc-server-standard/springtrader/bin
echo 'JVM_OPTS="-Xmx1024m -Xss192K -XX:MaxPermSize=192m"' >> setenv.sh
yes | cp /springtrader/lib/sqlfireclient-1.0.3.jar /opt/vmware/vfabric-tc-server-standard/springtrader/lib/sqlfireclient-1.0.3.jar
