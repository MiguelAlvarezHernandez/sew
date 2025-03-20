
# F1 Web Application

Este es el repositorio del curso **Software y Estándares para la Web**, en el cual se desarrolla una aplicación web interactiva relacionada con la Fórmula 1.

## Descripción del Proyecto

El proyecto consiste en una aplicación web que presenta información sobre la Fórmula 1, incluyendo detalles sobre pilotos, equipos y carreras. A través de esta aplicación, los usuarios pueden explorar estadísticas, información histórica, resultados de carreras y mucho más, todo de manera interactiva.

### Características Principales

- **Visualización de Información de Pilotos**: Consulta de estadísticas y detalles sobre los pilotos, como victorias, posiciones en el campeonato y más.
- **Información de Equipos**: Detalles sobre los equipos de Fórmula 1, sus coches, y rendimiento en las temporadas.
- **Calendario de Carreras**: Un calendario interactivo con fechas y ubicaciones de las próximas carreras.
- **Resultados de Carreras**: Visualización de los resultados en tiempo real y un historial de las carreras anteriores.
- **Interactividad**: La aplicación permite a los usuarios interactuar con los datos mediante un diseño dinámico e intuitivo.

  ## Principales Tecnologías Utilizadas

- **HTML5**: Estructura básica de la aplicación web.
- **CSS3**: Diseño y estilo de la interfaz, utilizando técnicas como *Flexbox* y *Grid* para un diseño responsivo.
- **JavaScript (ECMAScript 6)**: Interactividad y manipulación del DOM, incluyendo el uso de **jQuery** para llamadas AJAX y actualizaciones dinámicas.
- **PHP**: Generación de contenido dinámico desde el servidor, y gestión de datos.
- **XAMPP**: Servidor local para ejecutar la aplicación durante el desarrollo.
- **jQuery**: Manejo de la interacción con el DOM y peticiones asíncronas a la base de datos para cargar información sobre la Fórmula 1.

### 1. **Pruebas de Funcionamiento y Funcionalidad**
Se ha verificado que la aplicación cumple con todos los requisitos funcionales establecidos, garantizando su correcto desempeño.

### 2. **Cumplimiento de Estándares**
Se ha validado el cumplimiento de los estándares de HTML5 y CSS3 mediante los validadores del **W3C**:
- **HTML5**: Todos los documentos estáticos y dinámicos han sido validados sin errores ni advertencias.
- **CSS3**: Se ha utilizado la opción "Todas las advertencias" y se han documentado las excepciones permitidas (herencia de colores y redefinición de propiedades con *media queries*).

### 3. **Pruebas de Usabilidad**
Las pruebas de usabilidad se realizaron con 12 personas diferentes en 3 tandas de 4 participantes cada una. Se registraron:
- Edad, género y nivel de destreza en informática (de 0 a 10).
- Tiempos en segundos para completar cada tarea.
- Reacciones y comentarios.

### 4. **Pruebas de Adaptabilidad**
Se verificó la correcta visualización en distintos dispositivos y resoluciones, asegurando medidas relativas en CSS para garantizar una experiencia óptima.

### 5. **Pruebas de Accesibilidad**
Se realizaron tests con **Wave** y **aChecker**, garantizando:
- **Nivel AAA** de las WCAG 2.0 sin errores automáticos.
- Ausencia de advertencias de contraste de colores.
- Documentación de advertencias informativas para auditorías manuales.

### 6. **Pruebas de Despliegue en la Nube**
Se documentaron los pasos para el despliegue del proyecto en la nube, incluyendo:
- Creación y configuración de la máquina virtual.
- Creación y configuración de la base de datos.
- Despliegue del código en la nube.
- Verificación del correcto funcionamiento del sistema desplegado.

## Requisitos de Desarrollo

- **Uso de elementos HTML5 adecuados al contexto y funcionalidad.**
- **Uso correcto de propiedades CSS3 y módulos específicos.**
- **Paradigma de Programación Orientada a Objetos**: Todo el código en ECMAScript y PHP debe estar estructurado con clases y objetos.
- **Uso de jQuery limitado a llamadas AJAX y manipulación de contenido HTML.**
- **Estructuración y validación del código**:
  - HTML válido sin errores en todos los estados de la web.
  - Uso obligatorio de etiquetas semánticas (section, article, etc.).
  - Prohibición del uso de `<div>` salvo en casos permitidos explícitamente.
  - Comentarios con especificidad en cada regla CSS.
  - Validación CSS con 0 advertencias (excepto las documentadas en @media queries y herencia de colores).

El incumplimiento de estas normas puede derivar en la invalidación del proyecto.

## Despliegue Local

Para probar la aplicación en local:
1. Clonar el repositorio.
2. Asegurarse de que el servidor web (XAMPP, Apache, etc.) está configurado y en ejecución.
3. Colocar los archivos en el directorio correspondiente.
4. Acceder a `http://localhost/f1project` desde el navegador.
