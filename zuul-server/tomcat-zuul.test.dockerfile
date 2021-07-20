FROM tomcat:9.0-jre8-alpine
 
 # Delete existing ROOT folder
RUN rm -rf $CATALINA_HOME/webapps/ROOT

COPY tomcat-zuul-server.test.xml /usr/local/tomcat/conf/server.xml
COPY target/zuul-server-0.0.1-SNAPSHOT.war $CATALINA_HOME/webapps/ROOT.war