class FileProcessor {
    constructor() {
        this.areaVisualizacion = document.querySelectorAll('section')[2];
        this.errorArchivo = document.createElement('p');
        document.body.appendChild(this.errorArchivo);
    }

    processFile(archivo) {
        if (archivo.name.endsWith('.xml')) {
            this.processXML(archivo);
        } else if (archivo.name.endsWith('.kml')) {
            this.processKML(archivo);
        } else if (archivo.name.endsWith('.svg')) {
            this.processSVG(archivo);
        } else {
            this.errorArchivo.textContent = "Error: ¡¡¡ Archivo no válido !!!";
        }
    }

    processXML(archivo) {
        var reader = new FileReader();
        reader.onload = (evento) => {
            var xmlContent = evento.target.result;
    
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xmlContent, "application/xml");
    
            // Llamar a parseXMLToHTML para convertir el XML a HTML
            var htmlOutput = this.parseXMLToHTML(xmlDoc);
    
            // Mostrar el HTML generado en el área de visualización
            this.areaVisualizacion.innerHTML += htmlOutput;
        };
        reader.readAsText(archivo);
    }

    processKML(archivo) {
        var reader = new FileReader();
        reader.onload = (evento) => {
            var kmlContent = evento.target.result;
            this.showMapWithKML(kmlContent);
        };
        reader.readAsText(archivo);
    }

    processSVG(archivo) {
        var reader = new FileReader();
        reader.onload = (evento) => {
            var svgContent = evento.target.result;
            document.querySelectorAll('section')[0].innerHTML += svgContent;
        };
        reader.readAsText(archivo);
    }

    parseXMLToHTML(xmlDoc) {
        var root = xmlDoc.documentElement; 
        let html = "<ul>"; 
        html += this.traverseNodes(root); 
        html += "</ul>";
        return html;
    }
    
    traverseNodes(node) {
        let html = ""; 
    
        if (node.nodeType === 1) { 
            html += `<li><strong>${node.nodeName}</strong>`;
    
            if (node.attributes.length > 0) {
                html += " (";
                for (let i = 0; i < node.attributes.length; i++) {
                    var attr = node.attributes[i];
                    html += `${attr.name} = "${attr.value}"`;
                    if (i < node.attributes.length - 1) {
                        html += ", ";
                    }
                }
                html += ")";
            }
    
            if (node.childNodes.length > 0) {
                html += "<ul>"; 
                node.childNodes.forEach((childNode) => {
                    html += this.traverseNodes(childNode); 
                });
                html += "</ul>"; 
            }
    
            html += "</li>";
        } else if (node.nodeType === 3) { 
            var textContent = node.textContent.trim();
            if (textContent) {
                html += `<li>${textContent}</li>`; 
            }
        }
    
        return html; 
    }
    

    showMapWithKML(kmlContent) {
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
}

// Uso de la clase
$(document).ready(function() {
    var fileProcessor = new FileProcessor();

    $('input').on('change', function(event) {
        var archivo = event.target.files[0];
        fileProcessor.processFile(archivo);
    });
});