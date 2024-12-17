# xml2perfil.py
# -*- coding: utf-8 -*-
"""
Generar archivo SVG con la altimetría del circuito a partir de un archivo XML

@version 1.0 22/Octubre/2024
@author: Nombre del Estudiante
"""

import xml.etree.ElementTree as ET

def generarSVG(archivoXML, archivoSVG):
    """Función generarSVG(archivoXML, archivoSVG)
Genera un archivo SVG con la altimetría del circuito a partir de un archivo XML.

La función toma las distancias y altitudes de cada tramo del circuito desde el 
archivo XML y los utiliza para crear una polilínea en un gráfico SVG, que representa 
la altimetría del circuito.

@param archivoXML: Nombre del archivo XML de entrada.
@param archivoSVG: Nombre del archivo SVG de salida.

@version 1.0 22/Octubre/2024
@author: Nombre del Estudiante
    """
    try:
        arbol = ET.parse(archivoXML)
        raiz = arbol.getroot()
    except IOError:
        print('No se encuentra el archivo ', archivoXML)
        return
    except ET.ParseError:
        print("Error procesando el archivo XML = ", archivoXML)
        return

    # Configuración inicial para el SVG
    ancho_svg = 800
    alto_svg = 400
    margen = 20

    # Para almacenar los puntos de la polilínea
    puntos = []

    # Leer las distancias y altitudes desde el XML
    namespace = {"ns": "http://www.uniovi.es"}
    x_pos = margen  # Posición X inicial

    for tramo in raiz.findall("ns:tramos/ns:tramo", namespace):
        distancia = tramo.find("ns:distancia", namespace).text
        coordenadas = tramo.find("ns:coordenadasFinales", namespace)
        altitud = float(coordenadas.get('altitud'))

        # Convertir la distancia y la altitud a coordenadas para el SVG
        x = x_pos
        y = alto_svg - (altitud * 10)  # Escalar la altitud para que sea visible en el SVG
        puntos.append((x, y))

        # Actualizar la posición X acumulando distancias
        x_pos += float(distancia) * 0.5  # Ajustar escala de distancia en el SVG

    # Crear el archivo SVG
    with open(archivoSVG, 'w') as svg:
        # Escribir el prólogo del archivo SVG
        svg.write(f'<svg width="{ancho_svg}" height="{alto_svg}" xmlns="http://www.w3.org/2000/svg">\n')
        svg.write('<title>Perfil de Altimetria del Circuito</title>\n')

        # Crear la polilínea con los puntos
        polilinea = " ".join([f"{x},{y}" for x, y in puntos])
        svg.write(f'<polyline points="{polilinea}" style="fill:none;stroke:black;stroke-width:2" />\n')

        # Opcional: cerrar la polilínea para crear un efecto de suelo
        suelo = f'{puntos[0][0]},{alto_svg} ' + polilinea + f' {puntos[-1][0]},{alto_svg}'
        svg.write(f'<polygon points="{suelo}" style="fill:lightgray;stroke:black;stroke-width:1" />\n')

        # Escribir el epílogo con las etiquetas de cierre del archivo SVG
        svg.write('</svg>\n')

    print(f"Archivo SVG generado correctamente: {archivoSVG}")


def main():
    """Prueba de la función generarSVG()"""
    
    print(generarSVG.__doc__)
    
    miArchivoXML = "xml\circuitoEsquema.xml"
    miArchivoSVG = "altimetria.svg"
    
    generarSVG(miArchivoXML, miArchivoSVG)

if __name__ == "__main__":
    main()