# Use an official OpenJDK runtime as a parent image
FROM openjdk:25-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the Spring Boot application JAR file
COPY target/*.jar app.jar

# Expose the port the app runs on
EXPOSE 8080

# Run the Spring Boot app
ENTRYPOINT ["java","-jar","app.jar"]
