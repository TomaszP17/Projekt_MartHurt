# Użyj obrazu openjdk jako bazowego
FROM openjdk:21-jdk-slim

# Ustawienie katalogu roboczego w kontenerze
WORKDIR /app

# Kopiowanie pliku jar aplikacji do kontenera
COPY target/*.jar app.jar

# Eksponowanie portu, na którym aplikacja nasłuchuje
EXPOSE 8080

# Polecenie uruchamiające aplikację
ENTRYPOINT ["java", "-jar", "app.jar"]
