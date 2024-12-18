<?php
class Record {
    private $server;
    private $user;
    private $pass;
    private $dbname;

    // Constructor sin parámetros
    public function __construct() {
        $this->server = "localhost";
        $this->user = "DBUSER2024";
        $this->pass = "DBPSWD2024";
        $this->dbname = "records";
        $this->connectDB();
    }
// Método para conectar a la base de datos
private function connectDB() {
    $this->conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
    if ($this->conn->connect_error) {
        die("Conexión fallida: " . $this->conn->connect_error);
    }
}

// Método para guardar el récord en la base de datos
public function saveRecord($nombre, $apellidos, $nivel, $tiempo) {
    $stmt = $this->conn->prepare("INSERT INTO registro (nombre, apellidos, nivel, tiempo) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssdd", $nombre, $apellidos, $nivel, $tiempo);
    $stmt->execute();
    $stmt->close();
}

// Método para obtener los 10 mejores récords para un nivel específico
public function getTopRecords($nivel) {
    $stmt = $this->conn->prepare("SELECT nombre, apellidos, tiempo FROM registro WHERE nivel BETWEEN ? - 0.001 AND ? + 0.001 ORDER BY tiempo ASC LIMIT 10");
    $stmt->bind_param("dd", $nivel, $nivel);
    $stmt->execute();
    $result = $stmt->get_result();
    if (!$result) {
        die("Error obteniendo los resultados: " . $this->conn->error);
    }
    $records = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    return $records;
}

// Método para cerrar la conexión a la base de datos
public function closeDB() {
    $this->conn->close();
}
}
?>
<?php
// Manejar el formulario si se ha enviado
$expresion = "";
$resultado = "";
$formularioPOST = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //$formularioPOST = $_POST;

    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $nivel = $_POST['nivel'];
    $tiempo = $_POST['tiempo'];

    $record = new Record();
    $record->saveRecord($nombre, $apellidos, $nivel, $tiempo);

    $topRecords = $record->getTopRecords($nivel);
    $record->closeDB();
}

?>

<!DOCTYPE HTML>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <title>Juego de Tiempo de Reacción</title>
    <meta name="author" content="Miguel Álvarez">
    <meta name="description" content="Juego de tiempo de reacción del proyecto F1 Desktop" />
    <meta name ="keywords" content ="F1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <link rel="stylesheet" href="estilo/estilo.css" />
    <link rel="stylesheet" href="estilo/layout.css" />
    <link rel="stylesheet" href="estilo/semaforo_grid.css" />

    
    <link rel="icon" href="multimedia/imagenes/favicon.ico" type="image/x-icon">

</head>
<body>

    <header>
    <h1><a href="index.html" title="Volver a Inicio">F1 Desktop</a></h1>
    <nav>
            <a href="index.html" title="Inicio">Inicio</a>
            <a href="piloto.html" title="Piloto">Piloto</a>
            <a href="noticias.html" title="Noticias">Noticias</a>
            <a href="calendario.html" title="Calendario">Calendario</a>
            <a href="meteorologia.html" title="Meteorología">Meteorología</a>
            <a href="circuito.html" title="Circuito">Circuito</a>
            <a href="viajes.php" title="Viajes">Viajes</a>
            <a href="juegos.html" class="active" title="Juegos">Juegos</a>
        </nav>
    </header>

    <p>Estás en: <a href="index.html">Inicio</a> >> <a href="juegos.html">Juegos</a> >> Juego de Tiempo de Reacción</p>

    <main></main>
    <?php
        if (isset($topRecords) && !empty($topRecords)): 
            // Generamos la etiqueta <section> dentro del bloque if
            echo '<section>';
        ?>
            <h3>Top 10 Récords para el Nivel <?php echo htmlspecialchars($nivel); ?></h3>
            <ol>
                <?php foreach ($topRecords as $record): ?>
                    <li><?php echo htmlspecialchars($record['nombre']) . " " . htmlspecialchars($record['apellidos']) . " - " . htmlspecialchars($record['tiempo']) . " segundos"; ?></li>
                <?php endforeach; ?>
            </ol>
        <?php 
            // Cerramos la etiqueta </section> dentro del bloque if
            echo '</section>';
        endif;
    ?>
    
    
    <script src="js/semaforo.js"></script>
</body>
