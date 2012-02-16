#!/usr/bin/env ruby

# Description: Generate sample rows for the following tables:
#              - HOLDING
#              - ACCOUNTPROFILE
#              - QUOTE
#              - ACCOUNT
#              - order

# Usage: ruby createsampledata.rb <number_of_rows_per_table=10>

loop = 10
sql_file = 'create_rows.sql'

ARGV.each do|a|
  loop = a.to_i  
end

# generate random stock quotes 
random_stock_quotes = []
random_stock_quote = "VMW"

loop.times do |i|
  random_stock_quotes << random_stock_quote
  random_stock_quote = random_stock_quote.succ
end

# generate random usernames
random_user_names = []
random_user_name = "newuser"
loop.times do |i|
  random_user_names << random_user_name
  random_user_name = random_user_name.succ
end

insert_holding_sql = "INSERT INTO HOLDING VALUES(27.27, RANDOMCOUNT, 100, '2012/02/15', RANDOMCOUNT, 'RANDOM_QUOTE');"
insert_accountprofile_sql = "INSERT INTO ACCOUNTPROFILE VALUES(RANDOMCOUNT, 'vmware street', 'wins', 'RANDOM_USER', 'wkoh@vmware.com', '111', 'Winston Koh');"
insert_quote_sql = "INSERT INTO QUOTE VALUES(RANDOMCOUNT, 10, 12, 150000000, 13, 111111, 'VMWARE', 'RANDOM_QUOTE', 1);"
insert_account_sql = "INSERT INTO ACCOUNT VALUES('2012/2/15', 10, 5, 10, RANDOMCOUNT, '2012/2/16', 1, RANDOMCOUNT);"
insert_order_sql = "INSERT INTO \"order\" VALUES(10.55, '2012/2/15', 'BUY', '2', 12, 100, '2012/2/15', RANDOMCOUNT, RANDOMCOUNT, 'RANDOM_QUOTE', RANDOMCOUNT);"

insert_array = []

insert_array << insert_holding_sql
insert_array << insert_accountprofile_sql
insert_array << insert_quote_sql
insert_array << insert_account_sql
insert_array << insert_order_sql

File.open(sql_file, 'w') do |f|
  f.puts "DELETE FROM HOLDING;"
  f.puts "DELETE FROM ACCOUNTPROFILE;"
  f.puts "DELETE FROM QUOTE;"
  f.puts "DELETE FROM ACCOUNT;"
  f.puts "DELETE FROM \"order\";"
  insert_array.each do |sql|
    loop.times do |i|
      newsql = sql.gsub(/RANDOMCOUNT/, i.to_s)
      newsql = newsql.gsub(/RANDOM_QUOTE/, random_stock_quotes[i])
      newsql = newsql.gsub(/RANDOM_USER/, random_user_names[i])
      f.puts newsql
    end
  end
  f.close
end