# xml2kml.py
# -*- coding: utf-8 -*-
"""
Generación de archivos KML a partir de un archivo XML con información de circuito.

@version 1.0 22/Octubre/2024
@author: Nombre del Estudiante
"""

import xml.etree.ElementTree as ET

def generarKML(archivoXML, archivoKML):
    """
    Función generarKML(archivoXML, archivoKML)
    Genera un archivo KML a partir de un archivo XML con información de circuito.
    
    La función toma las coordenadas del archivo XML y las convierte en un archivo KML,
    que puede ser visualizado en herramientas como Google Earth para mostrar la 
    planimetría del circuito.
    
    @param archivoXML: Nombre del archivo XML de entrada.
    @param archivoKML: Nombre del archivo KML de salida.
    
    @version 1.0 22/Octubre/2024
    @author: Nombre del Estudiante
    """
    try:
        arbol = ET.parse(archivoXML)
    except IOError:
        print('No se encuentra el archivo ', archivoXML)
        exit()
    except ET.ParseError:
        print("Error procesando en el archivo XML = ", archivoXML)
        exit()
    
    raiz = arbol.getroot()
    
    # Crear y abrir archivo KML
    with open(archivoKML, 'w', encoding='utf-8') as kml:
        # Escritura del prólogo del archivo KML
        kml.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        kml.write('<kml xmlns="http://www.opengis.net/kml/2.2">\n')
        kml.write('  <Document>\n')
        kml.write('    <name>Circuito</name>\n')
        kml.write('    <description>Planimetría del circuito</description>\n')

        # Generar un `Placemark` para cada tramo
        for tramo in raiz.findall('{http://www.uniovi.es}tramos/{http://www.uniovi.es}tramo'):
            coord = tramo.find('{http://www.uniovi.es}coordenadasFinales')
            longitud = coord.get('longitud')
            latitud = coord.get('latitud')
            altitud = coord.get('altitud')
            distancia = tramo.find('{http://www.uniovi.es}distancia').text
            sector = tramo.find('{http://www.uniovi.es}sector').text
            
            kml.write('    <Placemark>\n')
            kml.write(f'      <name>Tramo - Sector {sector} ({distancia} m)</name>\n')
            kml.write(f'      <description>Tramo del sector {sector} con una distancia de {distancia} metros</description>\n')
            kml.write('      <Point>\n')
            kml.write(f'        <coordinates>{longitud},{latitud},{altitud}</coordinates>\n')
            kml.write('      </Point>\n')
            kml.write('    </Placemark>\n')

        # Escribir el epílogo con las etiquetas de cierre del archivo KML
        kml.write('  </Document>\n')
        kml.write('</kml>\n')
    
    print(f'Archivo KML generado correctamente: {archivoKML}')

def main():
    """Prueba de la función generarKML()"""
    
    print(generarKML.__doc__)
    
    miArchivoXML = "xml\circuitoEsquema.xml"
    miArchivoKML = "circuito.kml"
    
    generarKML(miArchivoXML, miArchivoKML)

if __name__ == "__main__":
    main()
