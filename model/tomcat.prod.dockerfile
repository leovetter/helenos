FROM tomcat:9.0-jre8-alpine
 
COPY target/backend-0.0.1-SNAPSHOT.war $CATALINA_HOME/webapps/api.war