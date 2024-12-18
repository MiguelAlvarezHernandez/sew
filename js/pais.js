class País {
    nombre;
    capital;
    nombreCircuito;
    poblacion;
    formaGobierno;
    coordenadasMeta;
    religion;

    constructor(nombre, capital, poblacion) {
        this.nombre = nombre;
        this.capital = capital;
        this.poblacion = poblacion;
      }


    inicializarRestoAtributos(nombreCircuito, formaGobierno, coordenadasMeta, religion) {
        this.nombreCircuito = nombreCircuito;
        this.formaGobierno = formaGobierno;
        this.coordenadasMeta = coordenadasMeta;
        this.religion = religion;
    }

    obtenerNombre() {
        return `Nombre del país: ${this.nombre}`;
    }

    obtenerCapital() {
        return `Capital del país: ${this.capital}`;
    }

    obtenerInfoSecundaria() {
        return `
          <ul>
            <li>Nombre del circuito: ${this.nombreCircuito}</li>
            <li>Población: ${this.poblacion}</li>
            <li>Forma de gobierno: ${this.formaGobierno}</li>
            <li>Religión mayoritaria: ${this.religion}</li>
          </ul>
        `;
    }

    escribirCoordenadasMeta() {
        return `Coordenadas de la línea de meta del circuito: ${this.coordenadasMeta}`;
    }
    obtenerPrevisionTiempo() {
        var apiKey = '8618a6f7b70df708650845f87775add9'; 
        var lat = '26.0325'; 
        var lon = '50.5106'; 
        var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&mode=xml&lang=es&units=metric`;

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'xml',
            success: function(data) {
                var $data = $(data);
                // const $prevision = $('#pervision');
                var $prevision = $('section');
                //$prevision.empty(); // Limpiar contenido anterior

                var diasMostrados = new Set();

                    $data.find('time').each(function(index, element) {
                        var $element = $(element);
                        var dateTime = $element.attr('from');
                        var time = dateTime.split('T')[1].split(':')[0]; // Obtener la hora
                        var date = dateTime.split('T')[0]; // Obtener la fecha
                        

                        if (time === '12' && !diasMostrados.has(date)) {
                            diasMostrados.add(date);
                            console.log($element.find('precipitation'));
                            var tempMax = $element.find('temperature').attr('max');
                            var tempMin = $element.find('temperature').attr('min');
                            var humidity = $element.find('humidity').attr('value');
                            var rain = $element.find('precipitation').attr('probability') ;
                            var icon = $element.find('symbol').attr('var') ;


                    var article = `
                        <article>
                            <h3>${date}</h3>
                            <p>Temperatura Máxima: ${tempMax}°C</p>
                            <p>Temperatura Mínima: ${tempMin}°C</p>
                            <p>Humedad: ${humidity}%</p>
                            <p>Lluvia: ${rain} mm</p>
                            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Icono del tiempo">
                        </article>
                    `;

                    $prevision.append(article);

                    if (diasMostrados.size >= 5) return false; 
                }
                });
            },
            error: function(error) {
                console.error('Error al realizar la solicitud:', error);
            }
        });
  }
}

