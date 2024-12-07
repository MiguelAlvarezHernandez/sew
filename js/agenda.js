class Agenda {
    constructor() {
        this.apiUrl = 'http://ergast.com/api/f1/current.json';
    }
    obtenerCarreras() {
        $.ajax({
            dataType: "json",
            url: this.apiUrl,
            method: 'GET',
            success: (datos) => {
                const carreras = datos.MRData.RaceTable.Races;
                let html = '';

                carreras.forEach((carrera) => {
                    const nombreCarrera = carrera.raceName;
                    const nombreCircuito = carrera.Circuit.circuitName;
                    const coordenadas = `${carrera.Circuit.Location.lat}, ${carrera.Circuit.Location.long}`;
                    const fechaHora = `${carrera.date} ${carrera.time}`;

                    html += `
                        <article class="carrera">
                            <header>
                                <h3>${nombreCarrera}</h3>
                            </header>
                            <p><strong>Circuito:</strong> ${nombreCircuito}</p>
                            <p><strong>Coordenadas:</strong> ${coordenadas}</p>
                            <p><strong>Fecha y Hora:</strong> ${fechaHora}</p>
                        </article>
                    `;
                });

                $('#carreras').html(html);
            },
            error: () => {
                $("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='http://ergast.com/mrd/'>Ergast API</a>"); 
                $("h4").remove();
                $("pre").remove();
                $("p").remove();
            }
        });
    }
}

