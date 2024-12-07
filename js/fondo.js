class Fondo{
    constructor(pais, capital, circuito) {
        this.pais = pais;
        this.capital = capital;
        this.circuito = circuito;
    }
    obtenerImagenCircuito() {
        const apiKey = 'e087c01a85e25f380d54a26bf2a00148'; 
        const tags = this.circuito;
        const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tags}&format=json&nojsoncallback=1`;

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data.photos.photo.length > 0) {
                    const photo = data.photos.photo[0];
                    const imageUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
                    $('body').css({'background-image': `url(${imageUrl})`,
                    'background-repeat': 'no-repeat',
                    'background-size': 'cover'});
                } else {
                    console.log('No se encontraron imágenes.');
                }
            },
            error: function(error) {
                console.error('Error al realizar la solicitud:', error);
            }
        });
    }
}

const fondoEjemplo = new Fondo('Barhein', 'Sahkir', 'Barhein');
fondoEjemplo.obtenerImagenCircuito();