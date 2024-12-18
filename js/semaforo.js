class Semaforo {
    constructor() {
        this.levels = [0.2, 0.5, 0.8];
        
        this.lights = 4;
        
        this.unload_moment = null;
        
        this.clic_moment = null;
        
        this.difficulty = this.levels[Math.floor(Math.random() * this.levels.length)];
    
        this.createStructure();
        //this.init();
    }

    createStructure() {
        var main = document.querySelector('main');

        // Crear y añadir el título del juego
        var title = document.createElement('h2');
        title.textContent = 'Semáforo';
        main.appendChild(title);

        // Crear y añadir las luces del semáforo
        //const trafficLight = document.createElement('section');
        for (let i = 0; i < this.lights; i++) {
            var light = document.createElement('div');
            //light.className = 'light';
            main.appendChild(light);
        }
        //main.appendChild(trafficLight);

        var startButton = document.createElement('button');
        //startButton.id = 'startButton';
        startButton.textContent = 'Arranque';
        startButton.onclick = () => this.initSequence();
        main.appendChild(startButton);

        var reactionButton = document.createElement('button');
        //reactionButton.id = 'reactionButton';
        reactionButton.textContent = 'Reacción';
        reactionButton.disabled = true;
        reactionButton.onclick = () => this.stopReaction();
        main.appendChild(reactionButton);
    }

    initSequence() {
        var mainElement = document.querySelector('main');

        mainElement.classList.add('load');

        document.querySelectorAll('button')[0].disabled = true;

        setTimeout(() => {
            this.unload_moment = new Date();
            this.endSequence();
        }, 2000  + this.difficulty * 100); 
    }

    endSequence() {
        document.querySelectorAll('button')[1].disabled = false;

        var mainElement = document.querySelector('main');
        mainElement.classList.remove('load');
        mainElement.classList.add('unload');
    }

    stopReaction() {
        this.clic_moment = new Date();

        let reactionTime = this.clic_moment.getTime() - this.unload_moment.getTime();

        reactionTime = (reactionTime / 1000).toFixed(3);

        var reactionDisplay = document.createElement('p');
        reactionDisplay.textContent = `Tu tiempo de reacción es: ${reactionTime} segundos`;
        document.body.appendChild(reactionDisplay);

        var mainElement = document.querySelector('main');
        mainElement.classList.remove('load', 'unload');

        document.querySelectorAll('button')[1].disabled = true;
        document.querySelectorAll('button')[0].disabled = false;


        //ADDED
         // Llamar a createRecordForm para mostrar el formulario
        this.createRecordForm(this.difficulty, reactionTime);
    }





    createRecordForm(difficulty, reactionTime) {
        var existingForm = document.querySelector('form');
        if (existingForm) {
            existingForm.remove(); 
        }
        
        var formHtml = `
            <form action="semaforo.php" method="POST">
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