To create nanoTrader schema follow these steps:

    cd nanotrader/tests
    ./gradlew build
    cd build/libs
    unzip GenerateData.zip
    ./createSchema

# Note
If you postgresql database admin username/password is not postgres/postgres
update nanotrader.properties before running 'createSchema'
    dbAdminUser=postgres
    dbAdminPassword=postgres

You can also create nanoTrader database by running sql scripts in psql

    cd nanotrader/tests/src/main/resources
    psql -U postgres -f nanotrader-database.sql
    psql -U nanotrader -W nanotrader -f nanotrader-tables.ddl
    psql -U nanotrader -W nanotrader -f initdb.sql
    
