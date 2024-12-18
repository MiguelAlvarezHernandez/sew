class Noticias {
    constructor() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            console.log("API File soportada.");
        } else {
            alert("La API File no es soportada en este navegador.");
        }
    }

    readInputFile(file) {
        var reader = new FileReader();
        reader.onload = (event) => {
            var contenido = event.target.result;
            this.procesarContenido(contenido);
        };
        reader.readAsText(file);
    }

    procesarContenido(contenido) {
        var lineas = contenido.split('\n');
        var contenedorNoticias = document.querySelectorAll('section')[1];
        //contenedorNoticias.setAttribute('data-contenedor-noticias', '');

        lineas.forEach(linea => {
            var [titular, entradilla, autor] = linea.split('_');
            var noticia = document.createElement('article');

            var header = document.createElement('header');
            var tituloElemento = document.createElement('h3');
            tituloElemento.textContent = titular;
            header.appendChild(tituloElemento);

            //var section = document.createElement('section');
            var entradillaElemento = document.createElement('p');
            entradillaElemento.textContent = entradilla;
            //section.appendChild(entradillaElemento);

            var footer = document.createElement('footer');
            var autorElemento = document.createElement('p');
            autorElemento.textContent = `Autor: ${autor}`;
            footer.appendChild(autorElemento);

            noticia.appendChild(header);
            noticia.appendChild(entradillaElemento);
            //noticia.appendChild(section);
            noticia.appendChild(footer);
            contenedorNoticias.appendChild(noticia);
        });

        document.body.appendChild(contenedorNoticias);
    }


    ////


    crearNoticia(contenedor, titular, entradilla, autor) {
        var noticia = document.createElement('article');

        var header = document.createElement('header');
        var tituloElemento = document.createElement('h3');
        tituloElemento.textContent = titular;
        header.appendChild(tituloElemento);

        //var section = document.createElement('section');
        var entradillaElemento = document.createElement('p');
        entradillaElemento.textContent = entradilla;
        //section.appendChild(entradillaElemento);

        var footer = document.createElement('footer');
        var autorElemento = document.createElement('p');
        autorElemento.textContent = `Autor: ${autor}`;
        footer.appendChild(autorElemento);

        noticia.appendChild(header);
        noticia.appendChild(entradillaElemento);
        noticia.appendChild(footer);
        contenedor.appendChild(noticia);
    }

    agregarNoticia(titular, entradilla, autor) {
        var contenedorNoticias = document.querySelectorAll('section')[1];
        this.crearNoticia(contenedorNoticias, titular, entradilla, autor);
    }


    crearFormulario() {
        var contenedorFormulario = document.querySelectorAll('section')[0];


        var tituloLabel = document.createElement('label');
        tituloLabel.textContent = 'Titular:';
        var tituloInput = document.createElement('input');
        tituloInput.type = 'text';
        tituloInput.id = 'titulo';
        tituloLabel.setAttribute('for', 'titulo');

        var entradillaLabel = document.createElement('label');
        entradillaLabel.textContent = 'Entradilla:';
        var entradillaInput = document.createElement('input');
        entradillaInput.id = 'entradilla';
        entradillaLabel.setAttribute('for', 'entradilla');

        var autorLabel = document.createElement('label');
        autorLabel.textContent = 'Autor:';
        var autorInput = document.createElement('input');
        autorInput.type = 'text';
        autorInput.id = 'autor';
        autorLabel.setAttribute('for', 'autor');
        

        var agregarButton = document.createElement('button');
        agregarButton.textContent = 'Agregar Noticia';

        contenedorFormulario.appendChild(tituloLabel);
        contenedorFormulario.appendChild(tituloInput);
        contenedorFormulario.appendChild(document.createElement('br'));
        contenedorFormulario.appendChild(entradillaLabel);
        contenedorFormulario.appendChild(entradillaInput);
        contenedorFormulario.appendChild(document.createElement('br'));
        contenedorFormulario.appendChild(autorLabel);
        contenedorFormulario.appendChild(autorInput);
        contenedorFormulario.appendChild(document.createElement('br'));
        contenedorFormulario.appendChild(agregarButton);


        agregarButton.addEventListener('click', () => {
            var titular = tituloInput.value;
            var entradilla = entradillaInput.value;
            var autor = autorInput.value;
            this.agregarNoticia(titular, entradilla, autor);
        });
    }


    
}

