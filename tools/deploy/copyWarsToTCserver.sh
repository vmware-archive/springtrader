#!/bin/sh -ex

src_dir=`dirname $0`
. $src_dir/config.sh

rm -fr $TC_SERVER/springtrader/webapps/spring*

cp $WORKSPACE/dist/*.war $TC_SERVER/springtrader/webapps/

cd $TC_SERVER/springtrader/webapps

for f in *-1.0.1.BUILD-SNAPSHOT.war
do
  mv $f `echo $f|sed -e 's/-1.0.1.BUILD-SNAPSHOT//'`
done

