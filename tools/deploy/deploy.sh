#!/bin/bash -ex

src_dir=`dirname $0`
. $src_dir/config.sh

$src_dir/build_release.sh
set +e
$src_dir/stopTCserver.sh
set -e
$src_dir/copyWarsToTCserver.sh
$src_dir/startSQLFire.sh
$src_dir/startTCserver.sh
$src_dir/generateData.sh
