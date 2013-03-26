#!/bin/sh -e

cd tools/selenium
./gradlew build
cd build/libs
./runSeleniumTest
