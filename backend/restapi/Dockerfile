# Użyj obrazu Maven do budowania aplikacji i uruchamiania jej
FROM maven:3.9.8-amazoncorretto-21

# Ustaw katalog roboczy
WORKDIR /app

# Kopiowanie plików pom.xml i instalacja zależności
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
COPY src ./src

# Upewnij się, że mvnw ma odpowiednie uprawnienia
RUN chmod +x mvnw

# Buduj aplikację (opcjonalnie, aby zależności zostały pobrane)
RUN mvn clean install -DskipTests

# Eksponuj port na którym będzie działać aplikacja Spring Boot
EXPOSE 8080

# Komenda do uruchomienia aplikacji
CMD ["mvn", "spring-boot:run"]
