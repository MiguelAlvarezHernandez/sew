$(document).ready(function() {
    $('input').on('change', function(event) {
        var archivo = event.target.files[0];
        var areaVisualizacion = document.querySelector('pre');
        var errorArchivo = document.createElement('p');
        document.body.appendChild(errorArchivo);

        if (archivo.name.endsWith('.xml')) {
            procesarArchivoXML(archivo, areaVisualizacion);
        } else if (archivo.name.endsWith('.kml')) {
            procesarArchivoKML(archivo);
        } else if (archivo.name.endsWith('.svg')) {
            procesarArchivoSVG(archivo);
        } else {
            errorArchivo.textContent = "Error: ¡¡¡ Archivo no válido !!!";
        }
    });


    function procesarArchivoXML(archivo, areaVisualizacion) {
        var lector = new FileReader();
        lector.onload = function(evento) {
            var xmlContent = evento.target.result;
            areaVisualizacion.textContent = formatXml(xmlContent);
        };
        lector.readAsText(archivo);
    }

    function procesarArchivoKML(archivo) {
        var lector = new FileReader();
        lector.onload = function(evento) {
            var kmlContent = evento.target.result;
            mostrarMapaConKML(kmlContent);
        };
        lector.readAsText(archivo);
    }

    function procesarArchivoSVG(archivo) {
        var lector = new FileReader();
        lector.onload = function(evento) {
            var svgContent = evento.target.result;
            document.querySelector('section').innerHTML = svgContent;
        };
        lector.readAsText(archivo);
    }

    function formatXml(xml) {
        var formatted = '';
        var reg = /(>)(<)(\/*)/g;
        xml = xml.replace(reg, '$1\r\n$2$3');
        var pad = 0;
        jQuery.each(xml.split('\r\n'), function(index, node) {
            var indent = 0;
            if (node.match(/.+<\/\w[^>]*>$/)) {//si la línea contiene una etiqueta de cierre
                indent = 0;
            } else if (node.match(/^<\/\w/)) {//si la línea comienza con una etiqueta de cierre
                if (pad != 0) {
                    pad -= 1;
                }
            } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {//si la línea comienza con una etiqueta de apertura
                indent = 1;
            } else {
                indent = 0;
            }

            var padding = '';
            for (var i = 0; i < pad; i++) {
                padding += '  ';
            }

            formatted += padding + node + '\r\n';
            pad += indent;
        });

        return formatted;
    }


    function mostrarMapaConKML(kmlContent) {

        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(kmlContent, "text/xml");
        var coordinates = xmlDoc.getElementsByTagName("coordinates")[0].textContent.trim().split(",");
        var lat = parseFloat(coordinates[1]);
        var lng = parseFloat(coordinates[0]);
        var placemarks = xmlDoc.getElementsByTagName("Placemark");
        var coordinatesArray = [];
        var bounds = new google.maps.LatLngBounds();
        var map = new google.maps.Map(document.querySelector('div'), {
            center: { lat: lat, lng: lng },
            zoom: 14
        });

        for (var i = 0; i < placemarks.length; i++) {
            var coordinates = placemarks[i].getElementsByTagName("coordinates")[0].textContent.trim().split(",");
            var lat = parseFloat(coordinates[1]);
            var lng = parseFloat(coordinates[0]);
            var latLng = new google.maps.LatLng(lat, lng);

            coordinatesArray.push(latLng);
            bounds.extend(latLng);

            new google.maps.Marker({
                position: latLng,
                map: map
            });
        }

        if (coordinatesArray.length > 1) {
            coordinatesArray.push(coordinatesArray[0]);
        }

        map.fitBounds(bounds);

        var circuitPath = new google.maps.Polyline({
            path: coordinatesArray,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        circuitPath.setMap(map);
    }
});