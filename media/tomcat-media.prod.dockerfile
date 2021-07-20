FROM tomcat:9.0-jre8-alpine
 
 # Delete existing ROOT folder
RUN rm -rf $CATALINA_HOME/webapps/ROOT

COPY tomcat-media-server.xml /usr/local/tomcat/conf/server.xml
COPY target/media-0.0.1-SNAPSHOT.war $CATALINA_HOME/webapps/ROOT.war

EXPOSE 8204