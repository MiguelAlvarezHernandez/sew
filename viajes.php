<?php
class Carrusel {
    private $capital;
    private $pais;
    private $apiKey = 'e087c01a85e25f380d54a26bf2a00148'; 

    public function __construct($capital, $pais) {
        $this->capital = $capital;
        $this->pais = $pais;
    }

    public function obtenerFotos() {
        $tags = urlencode($this->pais); // Asegúrate de codificar el valor de los tags
        $url = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key={$this->apiKey}&tags={$tags}&per_page=10&format=json&nojsoncallback=1";
        $response = file_get_contents($url);
        if ($response === FALSE) {
            die('Error al realizar la solicitud a la API de Flickr');
        }
        $data = json_decode($response, true);
        if (isset($data['photos']['photo'])) {
            return $data['photos']['photo'];
        } else {
            die('Error al decodificar la respuesta de la API de Flickr');
        }
    }

}

class Moneda {
    private $monedaLocal;
    private $monedaCambio;
    private $apiKey = 'c50519f761f54fcca9bb6e763ef5d42d'; // Api key de fixer.io

    public function __construct($monedaLocal, $monedaCambio) {
        $this->monedaLocal = $monedaLocal;
        $this->monedaCambio = $monedaCambio;
    }

    public function obtenerCambio() {
        $url = "https://openexchangerates.org/api/latest.json?app_id={$this->apiKey}&symbols={$this->monedaCambio}";
        $response = file_get_contents($url);
        if ($response === FALSE) {
            die('Error al realizar la solicitud a la API de cambio de moneda');
        }
        $data = json_decode($response, true);
        if (isset($data['rates'][$this->monedaCambio])) {
            return $data['rates'][$this->monedaCambio];
        } else {
            die('Error al decodificar la respuesta de la API de cambio de moneda');
        }
    }
}
?>
<!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>Viajes</title>
    <style>
        article {
            position: relative;
            width: 100%;
            height: 60vh; /* Definir la altura del contenedor del carrusel */
        }
        img {
            width: 100%;
            max-width: 100vh;
            height: 100%;
            max-height: 60vh;
            position: absolute;
            transition: all 0.5s;
            object-fit: cover;
            border-radius: 0.5em;
        }
        button {
            position: absolute;
            width: 2em;
            height: 2em;
            padding: 0.5em;
            border: none;
            border-radius: 50%;
            z-index: 10;
            cursor: pointer;
            background-color: #fff;
            font-size: 1em;
            display: flex;
            flex-direction: column;
            align-items:center;
            justify-content: center;
        }
        button:active {
            transform: scale(1.1);
        }
        button:nth-of-type(2) {
            top: 25%;
            left: 2%;
        }
        button:nth-of-type(1) {
            top: 25%;
            right: 2%;
        }
        section {
            width: 100%;
            height: 800px;
        }
        
    </style>

    <meta name ="author" content = "Miguel Álvarez">
    <meta name="description" content="aqui cada documento debe tener la descripción 
    del contenido del mismo" /> 
    <meta name ="keywords" content ="aquí cada documento debe tener la lista
    de las palabras clave del mismo separadas por comas" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" href="estilo/layout.css">
    <link rel="icon" href="multimedia/favicon.ico" type="image/x-icon">

   
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
   
    
    
</head>

<body>
    <!-- Datos con el contenidos que aparece en el navegador -->
    <header>
        <h1>F1 Desktop</h1>
        <nav>
            <a href="index.html" title="Inicio">Inicio</a>
            <a href="piloto.html" title="Piloto">Piloto</a>
            <a href="noticias.html" title="Noticias">Noticias</a>
            <a href="calendario.html" title="Calendario">Calendario</a>
            <a href="meteorologia.html" title="Meteorología">Meteorología</a>
            <a href="circuito.html" title="Circuito">Circuito</a>
            <a href="viajes.php" class="active" title="Viajes">Viajes</a>
            <a href="juegos.html" title="Juegos">Juegos</a>
        </nav>
    </header>

    <p>Estás en: <a href="index.html">Inicio</a> >> Viajes</p>
    
    <h2>Viajes</h2>
    <article>
        <?php
        $carrusel = new Carrusel('Manama', 'Barhein'); // Reemplaza 'Madrid' y 'España' con los valores adecuados
        $fotos = $carrusel->obtenerFotos();
        if (empty($fotos)) {
            echo "<p>No se encontraron fotos.</p>";
        } else {
            foreach ($fotos as $index => $foto) {
                $src = "https://live.staticflickr.com/{$foto['server']}/{$foto['id']}_{$foto['secret']}.jpg";
                //$activeClass = $index === 0 ? 'active' : '';
                echo "<img src='{$src}' alt='Foto' >";
            }
        }
        ?>
        
        <button>&gt;</button>
        <button>&lt;</button>
    </article>
    <?php
        $moneda = new Moneda('EUR', 'BHD');
        $cambio = $moneda->obtenerCambio();
        echo "<p>1 EUR = {$cambio} BHD</p>";
    ?>

   
    <section></section>
    <div style="height: 600px; width: 800px;"></div>

    <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBScz2OFH7IBs8aPAOufuoyYevvUm48SQU&callback=initMap"></script>
    <!-- <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBScz2OFH7IBs8aPAOufuoyYevvUm48SQU&callback=miViaje.initMap"></script>-->
    <script src="js/viajes.js"></script>
    <p>en desarrollo </p>

</body>
</html>
