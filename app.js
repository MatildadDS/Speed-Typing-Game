//1. VARIABLES GLOBALES 

const APICALL = 'http://api.quotable.io/random';

const chronoDisplay = document.querySelector('.chrono');
const scoreDisplay = document.querySelector('.score');

const phraseToWrite = document.querySelector('.phrase-to-write');
const phraseTest = document.querySelector('.phrase-test');

//2. initialisation du temps et du score
let chrono = 60;
let score = 0;

chronoDisplay.innerText = `Chrono : ${chrono}`;
scoreDisplay.innerText = `Score : ${score}`;


//FONCTIONS

//3. initilisation de l'intervalle en secondes, qui va tourner jusqu'à la fin du timer
let timer = setInterval(time, 1000);

//4. à chaque fois qu'elle va s'exécuter/à chaque seconde, la fonction time va décrémenter et actualiser les décomptes du chrono
function time() {
    chrono--;
    chronoDisplay.innerText = `Chrono : ${chrono}`;
    scoreDisplay.innerText = `Score : ${score}`;

    //4b. si mon timer arrive à 0, il s'efface
    if (chrono === 0) {
        clearInterval(timer);
    }
}

//5. Récupérer une phrase de l'API

//5b. j'appelle l'API avec une fonction asynchrone, stocke ses datas, puis les transforme au format JSON  et les stocke à nouveau
async function showNewPhrase() {

    const data = await fetch(APICALL);
    const results = await data.json();
    console.log(results);
    const phrase = results.content; //5c. je vais stocker la citation de dans une variable phrase
    console.log(phrase);

    //5d. je vide la div où injecter les citations
    phraseToWrite.innerHTML = '';

    //5e. je vais split chaque lettre des citations en une case de tableau
    phrase.split('').forEach(carac => {
        // 5f. puis creer un span pour chaque caractère
        const caracSpan = document.createElement('span');
        //5g. et rajouter chaque span un à un
        caracSpan.innerText = carac;
        phraseToWrite.appendChild(caracSpan);

    })
    //6. clean
    phraseTest.value = null;
}

showNewPhrase();










