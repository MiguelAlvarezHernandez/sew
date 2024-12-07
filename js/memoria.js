class Memoria {
    hasFlippedCard;
    lockBoard;
    firstCard;
    secondCard;
    elements;

    constructor() {
        this.hasFlippedCard = false;

        this.lockBoard = false;

        this.firstCard = null;

        this.secondCard = null;

        this.elements = [
            { element: "RedBull", source: "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg" },
            { element: "RedBull", source: "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg" },
            { element: "McLaren", source: "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg" },
            { element: "McLaren", source: "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg" },
            { element: "Alpine", source: "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg" },
            { element: "Alpine", source: "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg" },
            { element: "AstonMartin", source: "https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg" },
            { element: "AstonMartin", source: "https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg" },
            { element: "Ferrari", source: "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg" },
            { element: "Ferrari", source: "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg" },
            { element: "Mercedes", source: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg" },
            { element: "Mercedes", source: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg" }
        ];


        this.shuffleElements();
        this.createElements();
        this.addEventListeners();
    }


    shuffleElements() {
        for (let i = this.elements.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.elements[i], this.elements[j]] = [this.elements[j], this.elements[i]]; 
        }
    }

    unflipCards() {
        this.lockBoard = true; 
        setTimeout(() => {
            this.firstCard.dataset.state = "unflip";
            this.secondCard.dataset.state = "unflip"; 
            this.resetBoard();
        }, 1500); 
    }

    resetBoard() {
        this.firstCard = null;
        this.secondCard = null;
        this.hasFlippedCard = false;
        this.lockBoard = false;
    }

    checkForMatch() {
        const isMatch = this.firstCard.dataset.element === this.secondCard.dataset.element;
        isMatch ? this.disableCards() : this.unflipCards(); 
    }

    disableCards() {
        this.firstCard.dataset.state = "revealed"; 
        this.secondCard.dataset.state = "revealed";
        this.resetBoard(); 
    }

    createElements() {
        const gameBoard = document.querySelector('section');

        this.elements.forEach(card => {
            const cardElement = document.createElement("article");
            //cardElement.classList.add("card");
            cardElement.dataset.element = card.element;
            cardElement.dataset.state = "unflip";

            const cardTitle = document.createElement("h3");
            cardTitle.textContent = "Tarjeta de memoria";

            const cardImage = document.createElement("img");
            cardImage.src = card.source;
            cardImage.alt = card.element;
            //cardImage.classList.add("hidden");

            cardElement.appendChild(cardTitle);
            cardElement.appendChild(cardImage);
            gameBoard.appendChild(cardElement);

            //cardElement.addEventListener("click", () => this.flipCard(cardElement,this));
        });
    }

    flipCard(card, game) {
        if (card.dataset.state === "revealed") return;

        if (game.lockBoard) return;

        if (card === game.firstCard) return;

        card.dataset.state = "flip";
        //card.classList.add("flipped");
        if (!game.hasFlippedCard) {
            game.hasFlippedCard = true;
            game.firstCard = card;
        } else {
            game.secondCard = card;
            game.checkForMatch();
        }
    }

    addEventListeners() {
        const cards = document.querySelectorAll('article');
    
        cards.forEach(card => {
            card.addEventListener("click", () => this.flipCard(card,this));
        });
    }
    
}



