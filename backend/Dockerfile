# Build stage
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/backend-1.0.0.jar app.jar

# Render injects the PORT environment variable, but 8080 is our default
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
