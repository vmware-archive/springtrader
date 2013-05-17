#!/bin/bash -ex

src_dir=`dirname $0`
. $src_dir/config.sh

cd $SQLFIRE_DATA

set +e
pushd server1
sqlf server stop
popd

pushd locator1
sqlf locator stop
popd
set -e

rm -rf locator1 server1
mkdir locator1
mkdir server1

sqlf locator start -peer-discovery-address=127.0.0.1 -peer-discovery-port=3241 -dir=locator1 -client-port=1527 -client-bind-address=127.0.0.1

sqlf server start -dir=server1 -client-bind-address=127.0.0.1 -client-port=1528 -locators=127.0.0.1[3241]

cd $WORKSPACE/dist
#unzip -o DataGenerator.zip
#cp $SQLFIRE_DATA/sqlfireclient.jar  libs/sqlfireclient-1.0.3.jar
./createSqlfSchema
