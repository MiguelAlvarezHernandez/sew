"use strict";

var slides = document.querySelectorAll('article img');
var nextSlide = document.querySelectorAll('article button')[0];

let curSlide = 0;
let maxSlide = slides.length - 1;

nextSlide.addEventListener("click", function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  // move slide by -100%
  slides.forEach((slide, indx) => {
    var trans = 100 * (indx - curSlide);
    $(slide).css('transform', 'translateX(' + trans + '%)');
  });
});

var prevSlide = document.querySelectorAll('article button')[1];

prevSlide.addEventListener("click", function () {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }

  slides.forEach((slide, indx) => {
    var trans = 100 * (indx - curSlide);
    $(slide).css('transform', 'translateX(' + trans + '%)');
  });
});

class Viajes {
    constructor() {
        this.mapaGeoposicionado = null;
        this.infoWindow = null;
        this.latitud = null;
        this.longitud = null;
        //navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this));
        //this.getPosicion.bind(this),
        this.verErrores.bind(this);

    }

    getPosicion(position) {
        this.latitud = position.coords.latitude;
        this.longitud = position.coords.longitude;

        var pos = {
            lat: this.latitud,
            lng: this.longitud
        };
        this.infoWindow.setPosition(pos);
        this.infoWindow.setContent('Localización encontrada');
        this.infoWindow.open(this.mapaGeoposicionado);
        this.mapaGeoposicionado.setCenter(pos);
        this.mostrarMapa();
    }

    verErrores(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                this.mensaje = "El usuario no permite la petición de geolocalización";
                break;
            case error.POSITION_UNAVAILABLE:
                this.mensaje = "Información de geolocalización no disponible";
                break;
            case error.TIMEOUT:
                this.mensaje = "La petición de geolocalización ha caducado";
                break;
            case error.UNKNOWN_ERROR:
                this.mensaje = "Se ha producido un error desconocido";
                break;
        }
    }

    getLongitud() {
        return this.longitud;
    }

    getLatitud() {
        return this.latitud;
    }

    getAltitud() {
        return this.altitud;
    }

    /*verTodo(dondeVerlo) {
        var ubicacion = document.getElementById(dondeVerlo);
        var datos = '';
        datos += '<p>Longitud: ' + this.longitud + ' grados</p>';
        datos += '<p>Latitud: ' + this.latitud + ' grados</p>';
        datos += '<p>Precisión de la latitud y longitud: ' + this.precision + ' metros</p>';
        datos += '<p>Altitud: ' + this.altitud + ' metros</p>';
        datos += '<p>Precisión de la altitud: ' + this.precisionAltitud + ' metros</p>';
        datos += '<p>Rumbo: ' + this.rumbo + ' grados</p>';
        datos += '<p>Velocidad: ' + this.velocidad + ' metros/segundo</p>';
        ubicacion.innerHTML = datos;
    }*/


    getMapaEstaticoGoogle() {
        var apiKey = "AIzaSyBScz2OFH7IBs8aPAOufuoyYevvUm48SQU"; 
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var centro = "center=" + this.latitud + "," + this.longitud;
        var zoom = "&zoom=15";
        var tamaño = "&size=800x600";
        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        var sensor = "&sensor=false"; 
        
        return url + centro + zoom + tamaño + marcador + sensor + "&key=" + apiKey;
    }

    mostrarMapa() {
        var ubicacion = document.querySelector('section');
        var datos = `<img src="${this.getMapaEstaticoGoogle()}" alt="Mapa de mi ubicación">`;
        ubicacion.innerHTML += datos;
    }

    initMap() {
        var centro = { lat: 43.3672702, lng: -5.8502461 };
        this.mapaGeoposicionado = new google.maps.Map(document.querySelector('div'), {
            zoom: 8,
            center: centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        this.infoWindow = new google.maps.InfoWindow;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this.getPosicion.bind(this),
                this.handleLocationError.bind(this, true)
            );
        } else {
            this.handleLocationError(false);
        }
    }

    handleLocationError(browserHasGeolocation) {
        var pos = this.mapaGeoposicionado.getCenter();
        this.infoWindow.setPosition(pos);
        this.infoWindow.setContent(browserHasGeolocation ?
            'Error: Ha fallado la geolocalización' :
            'Error: Su navegador no soporta geolocalización');
        this.infoWindow.open(this.mapaGeoposicionado);
    }
}

var miViaje = new Viajes();


window.initMap = function() {
    miViaje.initMap();
};



