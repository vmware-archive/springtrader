To create nanoTrader schema for SQLFire follow these steps:

    cd nanotrader/tools
    update src/main/resources/nanotrader.sqlf.properties if not using defaluts for SQLF database
    ./gradlew build
    cd build/libs
    unzip GenerateData.zip
    start SQLFire database
    ./createSqlfSchema
