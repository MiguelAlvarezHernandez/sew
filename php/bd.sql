CREATE DATABASE f1_database;

USE f1_database;

CREATE TABLE Equipos (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    País VARCHAR(50)
);

CREATE TABLE Circuitos (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    País VARCHAR(50),
    Longitud FLOAT
);

CREATE TABLE Pilotos (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Nacionalidad VARCHAR(50),
    FechaNacimiento DATE,
    EquipoID INT,
    FOREIGN KEY (EquipoID) REFERENCES Equipos(ID)
);

CREATE TABLE Carreras (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Fecha DATE,
    Ubicación VARCHAR(50),
    CircuitoID INT,
    FOREIGN KEY (CircuitoID) REFERENCES Circuitos(ID)
);

CREATE TABLE Resultados (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    PilotoID INT,
    CarreraID INT,
    Posición INT,
    Puntos INT,
    FOREIGN KEY (PilotoID) REFERENCES Pilotos(ID),
    FOREIGN KEY (CarreraID) REFERENCES Carreras(ID)
);