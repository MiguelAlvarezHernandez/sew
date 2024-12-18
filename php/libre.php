<?php

// Clase para la gestión de la base de datos
class Database {
    private $conn;
    private $servername = "localhost";
    private $username = "DBUSER2024";
    private $password = "DBPSWD2024";
    private $dbname = "f1_database";

    public function __construct() {
        $this->conn = new mysqli($this->servername,$this->username, $this->password);
        if ($this->conn->connect_error) {
            die("Conexión fallida: " . $this->conn->connect_error);
        }
    }

    public function createDatabase() {
        $sql = "CREATE DATABASE IF NOT EXISTS " . $this->dbname;
        if ($this->conn->query($sql) === TRUE) {
            echo "Base de datos creada correctamente<br>";
        } else {
            echo "Error creando la base de datos: " . $this->conn->error . "<br>";
        }
        $this->conn->select_db($this->dbname);
    }

    public function selectDatabase() {
        $this->conn->select_db($this->dbname);
    }

    public function createTables() {
        $tables = [
            "CREATE TABLE IF NOT EXISTS Equipos (
                ID INT AUTO_INCREMENT PRIMARY KEY,
                Nombre VARCHAR(50) NOT NULL,
                País VARCHAR(50)
            )",
            "CREATE TABLE IF NOT EXISTS Circuitos (
                ID INT AUTO_INCREMENT PRIMARY KEY,
                Nombre VARCHAR(50) NOT NULL,
                País VARCHAR(50),
                Longitud FLOAT
            )",
            "CREATE TABLE IF NOT EXISTS Pilotos (
                ID INT AUTO_INCREMENT PRIMARY KEY,
                Nombre VARCHAR(50) NOT NULL,
                Nacionalidad VARCHAR(50),
                FechaNacimiento DATE,
                EquipoID INT,
                FOREIGN KEY (EquipoID) REFERENCES Equipos(ID)
            )",
            "CREATE TABLE IF NOT EXISTS Carreras (
                ID INT AUTO_INCREMENT PRIMARY KEY,
                Nombre VARCHAR(50) NOT NULL,
                Fecha DATE,
                Ubicación VARCHAR(50),
                CircuitoID INT,
                FOREIGN KEY (CircuitoID) REFERENCES Circuitos(ID)
            )",
            "CREATE TABLE IF NOT EXISTS Resultados (
                ID INT AUTO_INCREMENT PRIMARY KEY,
                PilotoID INT,
                CarreraID INT,
                Posición INT,
                Puntos INT,
                FOREIGN KEY (PilotoID) REFERENCES Pilotos(ID),
                FOREIGN KEY (CarreraID) REFERENCES Carreras(ID)
            )"
        ];

        foreach ($tables as $table) {
            if ($this->conn->query($table) === TRUE) {
                echo "Tabla creada correctamente<br>";
            } else {
                echo "Error creando la tabla: " . $this->conn->error . "<br>";
            }
        }
    }

    public function clearTables() {
        $tables = ['Resultados', 'Pilotos', 'Carreras', 'Equipos', 'Circuitos'];
        foreach ($tables as $table) {
            $sql = "DELETE FROM $table";
            if ($this->conn->query($sql) === TRUE) {
                echo "Datos de la tabla $table eliminados correctamente<br>";
            } else {
                echo "Error eliminando datos de la tabla $table: " . $this->conn->error . "<br>";
            }
        }
    }

    public function importCSV($table, $file) {
        $fila = 1;
        if (($gestor = fopen($file, "r")) !== FALSE) {
            while (($datos = fgetcsv($gestor, 1000, ",")) !== FALSE) {
                $num = count($datos);
                $fila++;
                $sql = "INSERT INTO $table VALUES (";
                for ($c=0; $c < $num; $c++) {
                    $sql .= "'" . $datos[$c] . "',";
                }
                $sql = rtrim($sql, ',') . ")";
                if ($this->conn->query($sql) !== TRUE) {
                    echo "Error insertando datos en $table: " . $this->conn->error . "<br>";
                }
            }
            fclose($gestor);
        }
    }

    public function exportCSV($table, $file) {
        $sql = "SELECT * FROM $table";
        $result = $this->conn->query($sql);

        $fp = fopen($file, 'w');

        while ($row = $result->fetch_assoc()) {
            fputcsv($fp, $row);
        }

        fclose($fp);
    }

    public function getBestResults($nombrePiloto) {
        $sql = "SELECT Resultados.CarreraID, Resultados.Posición, Resultados.Puntos 
                FROM Resultados 
                JOIN Pilotos ON Resultados.PilotoID = Pilotos.ID 
                WHERE Pilotos.Nombre = '$nombrePiloto' 
                ORDER BY Resultados.Puntos DESC";
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            $fp = fopen('mejores_resultados.csv', 'w');
            while ($row = $result->fetch_assoc()) {
                fputcsv($fp, $row);
                echo "CarreraID: " . $row["CarreraID"] . " - Posición: " . $row["Posición"] . " - Puntos: " . $row["Puntos"] . "<br>";
            }
            fclose($fp);
        } else {
            echo "No se encontraron resultados para el piloto con nombre $nombrePiloto<br>";
        }
    }

    public function close() {
        $this->conn->close();
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <title>F1 Data</title>
    <meta name="author" content="Tu Nombre">
    <meta name="description" content="documento para el manejo de datos de formula 1" />
    <meta name ="keywords" content ="F1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <link rel="stylesheet" type="text/css" href="../estilo/estilo.css" />
    <link rel="stylesheet" href="../estilo/layout.css">
    <link rel="icon" href="../multimedia/imagenes/favicon.ico" type="image/x-icon">

</head>
<body>
    <header>
    <h1><a href="index.html" title="Volver a Inicio">F1 Desktop</a></h1>
    <nav>
            <a href="../index.html" title="Inicio">Inicio</a>
            <a href="../piloto.html" title="Piloto">Piloto</a>
            <a href="../noticias.html" title="Noticias">Noticias</a>
            <a href="../calendario.html" title="Calendario">Calendario</a>
            <a href="../meteorologia.html" title="Meteorología">Meteorología</a>
            <a href="../circuito.html" title="Circuito">Circuito</a>
            <a href="../viajes.php" title="Viajes">Viajes</a>
            <a href="../juegos.html" class="active" title="Juegos">Juegos</a>
        </nav>
    </header>

    <p>Estás en: <a href="index.html">Inicio</a> >> <a href="juegos.html">Juegos</a> >> F1 Data</p>
    <main>
        <h2>Aplicación de Fórmula 1</h2>
        <ul>
            <li><a href="?action=crear_bd">Crear Base de Datos</a></li>
            <li><a href="?action=importar">Importar CSV</a></li>
            <li><a href="?action=exportar">Exportar CSV</a></li>
        </ul>
        <?php if (isset($_GET['action']) && $_GET['action'] == 'importar'): ?>
            <form action="?action=procesar_importar" method="post" enctype="multipart/form-data">
                <label for="table">Selecciona la tabla:</label>
                <select name="table" id="table">
                    <option value="Equipos">Equipos</option>
                    <option value="Circuitos">Circuitos</option>
                    <option value="Pilotos">Pilotos</option>
                    <option value="Carreras">Carreras</option>
                    <option value="Resultados">Resultados</option>
                </select>
                <br><br>
                <label for="file">Selecciona el archivo CSV:</label>
                <input type="file" name="file" id="file" accept=".csv">
                <br><br>
                <input type="submit" value="Importar CSV">
            </form>
        <?php endif; ?>
        <?php if (isset($_GET['action']) && $_GET['action'] == 'exportar'): ?>
            <form action="?action=procesar_exportar" method="post">
                <label for="table">Selecciona la tabla:</label>
                <select name="table" id="table">
                    <option value="Equipos">Equipos</option>
                    <option value="Circuitos">Circuitos</option>
                    <option value="Pilotos">Pilotos</option>
                    <option value="Carreras">Carreras</option>
                    <option value="Resultados">Resultados</option>
                    <option value="mejores_resultados">Mejores Resultados de un Piloto</option>
                </select>
                <br><br>
                <label for="nombrePiloto">Nombre completo del Piloto (solo para mejores resultados):</label>
                <input type="text" name="nombrePiloto" id="nombrePiloto">
                <br><br>
                <input type="submit" value="Exportar CSV">
            </form>
            </form>
        <?php endif; ?>

        <?php if (isset($_GET['action']) && $_GET['action'] == 'mejores_resultados'): ?>
            <form action="?action=procesar_mejores_resultados" method="post">
                <label for="nombrePiloto">Nombre del Piloto:</label>
                <input type="text" name="nombrePiloto" id="nombrePiloto">
                <br><br>
                <input type="submit" value="Obtener Mejores Resultados">
            </form>
        <?php endif; ?>
    </main>
</body>
</html>

<?php
if (isset($_GET['action'])) {
    $action = $_GET['action'];
    $db = new Database();

    switch ($action) {
        case 'crear_bd':
            $db->createDatabase();
            $db->createTables();
            $db->clearTables();
            break;
        case 'procesar_importar':
            if (isset($_POST['table']) && isset($_FILES['file'])) {
                $table = $_POST['table'];
                $file = $_FILES['file']['tmp_name'];
                $db->selectDatabase();
                $db->importCSV($table, $file);
            }
            break;
        case 'procesar_exportar':
            if (isset($_POST['table'])) {
                $table = $_POST['table'];
                $db->selectDatabase();
                if ($table == 'mejores_resultados') {
                    if (isset($_POST['nombrePiloto'])) {
                        $nombrePiloto = $_POST['nombrePiloto'];
                        $db->getBestResults($nombrePiloto);
                    }
                } else {
                    $db->exportCSV($table, 'exportado.csv');
                }
            }
            break;
        
    }

    $db->close();
}
?>