# 🐳 Nexus ERP: Multi-Stage Institutional Node Build

# --- STAGE 1: Frontend Synthesis ---
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# --- STAGE 2: Backend Synthesis ---
FROM maven:3.9.6-eclipse-temurin-21-alpine AS backend-build
WORKDIR /app/backend
COPY backend/pom.xml .
RUN mvn dependency:go-offline
COPY backend/ .
# Inject frontend assets into Spring Boot static resources
COPY --from=frontend-build /app/frontend/dist /app/backend/src/main/resources/static
RUN mvn clean package -DskipTests

# --- STAGE 3: Final Production Node ---
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=backend-build /app/backend/target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
