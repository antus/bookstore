README for bookstore
==========================

This is a sample application created with JHipster and managing spatial data

Installation 
Install Java 8 from the Oracle website.
Install Maven 
Install MySql

Create bookstore database on MySQL with and set username and password in "bookstore/src/main/resources/config/application-dev.yml" 

If you prefer to use Maven, you can run your application by typing:

mvn spring-boot:run

The application will be available on http://localhost:8080

Deploy on CloudFoundry

Set cloud foundry plugin configuration params in pom.xml and .m2/settings.xml (see http://docs.run.pivotal.io/buildpacks/java/build-tool-int.html)
and type 

mvn -Pprod clean package cf:push
