#!/bin/bash -ex

src_dir=`dirname $0`
. $src_dir/config.sh

pushd $WORKSPACE
git pull
./gradlew clean build release
popd
