class Agenda {
    constructor() {
        this.apiUrl = 'https://ergast.com/api/f1/current.json';
    }
    obtenerCarreras() {
        $.ajax({
            dataType: "json",
            url: this.apiUrl,
            method: 'GET',
            success: (datos) => {
                var carreras = datos.MRData.RaceTable.Races;
                let html = '';

                carreras.forEach((carrera) => {
                    var nombreCarrera = carrera.raceName;
                    var nombreCircuito = carrera.Circuit.circuitName;
                    var coordenadas = `${carrera.Circuit.Location.lat}, ${carrera.Circuit.Location.long}`;
                    var fechaHora = `${carrera.date} ${carrera.time}`;

                    html += `
                        <article>
                            <header>
                                <h3>${nombreCarrera}</h3>
                            </header>
                            <p><strong>Circuito:</strong> ${nombreCircuito}</p>
                            <p><strong>Coordenadas:</strong> ${coordenadas}</p>
                            <p><strong>Fecha y Hora:</strong> ${fechaHora}</p>
                        </article>
                    `;
                });

                //$('section').html(html);
                $('section').append(html);
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

