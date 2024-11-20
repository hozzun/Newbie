FROM amazoncorretto:17-alpine

WORKDIR /app

COPY /build/libs/mypage-0.0.1-SNAPSHOT.jar /app/newbie-mypage.jar

EXPOSE 8080

CMD ["java", "-Dspring.profiles.active=prod", "-jar", "/app/newbie-mypage.jar"]