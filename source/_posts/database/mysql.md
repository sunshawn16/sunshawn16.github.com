---
title: mysql tips
date: 2016-05-10 19:32:31
tags: database
category: tech
---


mysql:
install:
   brew install mysql
then on Mac mysql is installed in: /usr/local/Cellar/mysql
the data is in: /usr/local/var/mysql

U can find the mysql by command: type -a mysql

start mysql:
#起服务器
mysql.server start
#mysql 进入mysql
mysql -u root 用root 权限来进入mysql
#create user with password
sudo CREATE USER 'apiuser'@'localhost' IDENTIFIED BY 'password'

SHOW DATABASES;
CREATE DATABASE db_test(* 大小写敏感)

#选中并使用
USE db_test
#只允许apiuser使用db_user
GRANT ALL ON db_user.* 'apiuser'@'localhost'        ---错误 无法连接

SQL Error: 1524, SQLState: HY000  missing plugin means the User is creted wrong USER
grant all privileges on db_user.* to apiuser@localhost identified by 'password' with grant option;
#see user table
select user,  plugin from mysql.user;


Table 'performance_schema.session_variables' doesn't exist
# mysql_upgrade -u root -p --force
# mysql.server restart                   ---------------must


if you want to add @AUtoGenerarted annotation to some property, remember to config the right stra to the right database
e.g mysql need to add
CREATE TABLE USER (
  USER_ID INTEGER AUTO_INCREMENT PRIMARY KEY)

 @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)




***
Ref1: [blog from ruanyifeng](http://www.ruanyifeng.com/blog/2013/12/getting_started_with_postgresql.html)