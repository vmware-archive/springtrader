#!/bin/sh -e

cd tools/selenium
./gradlew clean build
cd build/libs
unzip selenium.zip
./runSeleniumTest
