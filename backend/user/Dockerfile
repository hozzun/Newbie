FROM amazoncorretto:17-alpine

WORKDIR /app

COPY /build/libs/user-0.0.1-SNAPSHOT.jar /app/newbie-user.jar

EXPOSE 8080

CMD ["java", "-Dspring.profiles.active=prod", "-jar", "/app/newbie-user.jar"]