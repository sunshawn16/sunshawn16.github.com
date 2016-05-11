---
title: flyway - Migration Tool
date: 2016-05-11 19:32:10
tags: database
category: tech
---


## Why:

## How:

* 用SQL 脚本记录所有schema 的改变
* 用内部的一个名为SCHEMA_VERSION数据表格来记录不同的信 :e.g.数据何时,被谁操作,版本号码

### STEPS
1.project's Dependencies Set-up
buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath("org.flywaydb:flyway-gradle-plugin:4.0")
    }


    compile'org.flywaydb:flyway-core:flyway'

clean.dependsOn flywayRepair
build.dependsOn flywayMigrate


2. Configuring Flyway Server
add in gradle.properties
flyway.url =  jdbc:mysql://localhost:3306/db_user
flyway.user = apiuser
flyway.password = password

3. run: gradle flywayMigrate -i
you will see

PicFlyway:[flyway](../assets/database/flywaySuccess.png)

attention: you could not inert any data manually, should drop table if you have.

* gradle flywayClean to  drop all objects
* gradle flywayInfo to prints details and status info about all migrations
* gradle flywayValidate to Validates the applied migrations against the ones available on the classpath.


***

Ref1: [flywaydb.org](https://flywaydb.org/documentation/gradle/)

Ref2: [INTEGRATING FLYWAY IN A SPRING FRAMEWORK APPLICATION](http://blog.trifork.com/2014/12/09/integrating-flywaydb-in-a-spring-framework-application/)