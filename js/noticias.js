class Noticias {
    constructor() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            console.log("API File soportada.");
        } else {
            alert("La API File no es soportada en este navegador.");
        }
    }

    readInputFile(file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const contenido = event.target.result;
            this.procesarContenido(contenido);
        };
        reader.readAsText(file);
    }

    procesarContenido(contenido) {
        const lineas = contenido.split('\n');
        const contenedorNoticias = document.querySelectorAll('section')[1];
        //contenedorNoticias.setAttribute('data-contenedor-noticias', '');

        lineas.forEach(linea => {
            const [titular, entradilla, autor] = linea.split('_');
            const noticia = document.createElement('article');

            const header = document.createElement('header');
            const tituloElemento = document.createElement('h3');
            tituloElemento.textContent = titular;
            header.appendChild(tituloElemento);

            const section = document.createElement('section');
            const entradillaElemento = document.createElement('p');
            entradillaElemento.textContent = entradilla;
            section.appendChild(entradillaElemento);

            const footer = document.createElement('footer');
            const autorElemento = document.createElement('p');
            autorElemento.textContent = `Autor: ${autor}`;
            footer.appendChild(autorElemento);

            noticia.appendChild(header);
            noticia.appendChild(section);
            noticia.appendChild(footer);
            contenedorNoticias.appendChild(noticia);
        });

        document.body.appendChild(contenedorNoticias);
    }


    ////


    crearNoticia(contenedor, titular, entradilla, autor) {
        const noticia = document.createElement('article');

        const header = document.createElement('header');
        const tituloElemento = document.createElement('h3');
        tituloElemento.textContent = titular;
        header.appendChild(tituloElemento);

        const section = document.createElement('section');
        const entradillaElemento = document.createElement('p');
        entradillaElemento.textContent = entradilla;
        section.appendChild(entradillaElemento);

        const footer = document.createElement('footer');
        const autorElemento = document.createElement('p');
        autorElemento.textContent = `Autor: ${autor}`;
        footer.appendChild(autorElemento);

        noticia.appendChild(header);
        noticia.appendChild(section);
        noticia.appendChild(footer);
        contenedor.appendChild(noticia);
    }

    agregarNoticia(titular, entradilla, autor) {
        const contenedorNoticias = document.querySelectorAll('section')[1];
        this.crearNoticia(contenedorNoticias, titular, entradilla, autor);
    }


    crearFormulario() {
        const contenedorFormulario = document.querySelectorAll('section')[0];


        const tituloLabel = document.createElement('label');
        tituloLabel.textContent = 'Titular:';
        const tituloInput = document.createElement('input');
        tituloInput.type = 'text';
        tituloInput.id = 'titulo';
        tituloLabel.setAttribute('for', 'titulo');

        const entradillaLabel = document.createElement('label');
        entradillaLabel.textContent = 'Entradilla:';
        const entradillaInput = document.createElement('input');
        entradillaInput.id = 'entradilla';
        entradillaLabel.setAttribute('for', 'entradilla');

        const autorLabel = document.createElement('label');
        autorLabel.textContent = 'Autor:';
        const autorInput = document.createElement('input');
        autorInput.type = 'text';
        autorInput.id = 'autor';
        autorLabel.setAttribute('for', 'autor');
        

        const agregarButton = document.createElement('button');
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
            const titular = tituloInput.value;
            const entradilla = entradillaInput.value;
            const autor = autorInput.value;
            this.agregarNoticia(titular, entradilla, autor);
        });
    }


    
}

