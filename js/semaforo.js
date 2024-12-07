class Semaforo {
    constructor() {
        this.levels = [0.2, 0.5, 0.8];
        
        this.lights = 4;
        
        this.unload_moment = null;
        
        this.clic_moment = null;
        
        // Inicialización de la dificultad de juego de forma aleatoria
        this.difficulty = this.levels[Math.floor(Math.random() * this.levels.length)];
    
        this.createStructure();
        //this.init();
    }

    createStructure() {
        
        const main = document.querySelector('main');

        // Crear y añadir el título del juego
        const title = document.createElement('h2');
        title.textContent = 'Semáforo';
        main.appendChild(title);

        // Crear y añadir las luces del semáforo
        const trafficLight = document.createElement('section');
        for (let i = 0; i < this.lights; i++) {
            const light = document.createElement('div');
            light.className = 'light';
            trafficLight.appendChild(light);
        }
        main.appendChild(trafficLight);

        // Crear y añadir el botón de inicio
        const startButton = document.createElement('button');
        //startButton.id = 'startButton';
        startButton.textContent = 'Arranque';
        startButton.onclick = () => this.initSequence();
        main.appendChild(startButton);

        // Crear y añadir el botón para medir el tiempo de reacción
        const reactionButton = document.createElement('button');
        //reactionButton.id = 'reactionButton';
        reactionButton.textContent = 'Reacción';
        reactionButton.disabled = true;
        reactionButton.onclick = () => this.stopReaction();
        main.appendChild(reactionButton);
    }

    initSequence() {
        const mainElement = document.querySelector('main');

        // Añadir la clase load al main para activar la animación de las luces
        mainElement.classList.add('load');

        // Deshabilitar el botón de arranque después de la secuencia de inicio
        document.querySelectorAll('button')[0].disabled = true;

        // Configurar el timeout para iniciar el apagado del semáforo
        setTimeout(() => {
            this.unload_moment = new Date();
            this.endSequence();
        }, 2000  + this.difficulty * 100); // Espera 2 segundos para apagar las luces
    }

    endSequence() {
        // Habilitar el botón "Reacción"
        document.querySelectorAll('button')[1].disabled = false;

        // Añadir la clase unload al main para activar la animación de apagado
        const mainElement = document.querySelector('main');
        mainElement.classList.remove('load');
        mainElement.classList.add('unload');
    }

    stopReaction() {
        // Obtener la fecha actual al hacer clic en "Reacción"
        this.clic_moment = new Date();

        // Calcular el tiempo de reacción en milisegundos
        let reactionTime = this.clic_moment.getTime() - this.unload_moment.getTime();

        // Redondear el tiempo de reacción a 3 decimales (en segundos)
        reactionTime = (reactionTime / 1000).toFixed(3);

        // Mostrar el tiempo de reacción en pantalla
        const reactionDisplay = document.createElement('p');
        reactionDisplay.textContent = `Tu tiempo de reacción es: ${reactionTime} segundos`;
        document.body.appendChild(reactionDisplay);

        // Eliminar las clases 'load' y 'unload' de <main>
        const mainElement = document.querySelector('main');
        mainElement.classList.remove('load', 'unload');

        // Deshabilitar el botón "Reacción" y habilitar el botón "Arranque"
        document.querySelectorAll('button')[1].disabled = true;
        document.querySelectorAll('button')[0].disabled = false;


        //ADDED
         // Llamar a createRecordForm para mostrar el formulario
        this.createRecordForm(this.difficulty, reactionTime);
    }





    createRecordForm(difficulty, reactionTime) {
        const formHtml = `
            <form id="recordForm" action="semaforo.php" method="POST">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required><br>
                <label for="apellidos">Apellidos:</label>
                <input type="text" id="apellidos" name="apellidos" required><br>
                <label for="nivel">Nivel:</label>
                <input type="text" id="nivel" name="nivel" value="${difficulty}" readonly><br>
                <label for="tiempo">Tiempo de Reacción (s):</label>
                <input type="text" id="tiempo" name="tiempo" value="${reactionTime}" readonly><br>
                <input type="submit" value="Guardar Récord">
            </form>
        `;
        document.querySelector('main').insertAdjacentHTML('beforeend', formHtml);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Semaforo();
});