#!/bin/sh

src_dir=`dirname $0`
. $src_dir/config.sh

cd $WORKSPACE/dist
./generateData
