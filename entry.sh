#!/bin/bash

echo '127.0.0.1 centos6 nanodbserver' >> /etc/hosts
service rabbitmq-server start
sqlf locator start -peer-discovery-address=127.0.0.1 -peer-discovery-port=3241 -dir=/opt/vmware/vfabric-sqlfire/vFabric_SQLFire_103/locator1 -client-port=1527 -client-bind-address=127.0.0.1
sqlf server start -dir=/opt/vmware/vfabric-sqlfire/vFabric_SQLFire_103/server1 -client-bind-address=127.0.0.1 -client-port=1528 -locators=127.0.0.1[3241]
cd /springtrader/dist
./createSqlfSchema
/opt/vmware/vfabric-tc-server-standard/springtrader/bin/tcruntime-ctl.sh start springtrader
sleep 30
yes | cp /opt/vmware/vfabric-sqlfire/vFabric_SQLFire_103/lib/sqlfireclient.jar /springtrader/dist/libs/sqlfireclient-1.0.3.jar
cd /springtrader/dist
./generateData
tail -f /dev/null
