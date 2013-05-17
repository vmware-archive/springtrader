#!/bin/sh

src_dir=`dirname $0`
. $src_dir/config.sh

$TC_SERVER/springtrader/bin/tcruntime-ctl.sh start
