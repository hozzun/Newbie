FROM amazoncorretto:17-alpine

WORKDIR /app

COPY /build/libs/chatbot-0.0.1-SNAPSHOT.jar /app/newbie-chatbot.jar

EXPOSE 8080

CMD ["java", "-Dspring.profiles.active=prod", "-jar", "/app/newbie-chatbot.jar"]