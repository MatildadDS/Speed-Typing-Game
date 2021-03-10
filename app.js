//1. VARIABLES GLOBALES 

const APICALL = 'http://api.quotable.io/random';

const chronoDisplay = document.querySelector('.chrono');
const scoreDisplay = document.querySelector('.score');

const phraseToWrite = document.querySelector('.phrase-to-write');
const phraseTest = document.querySelector('.phrase-test');

//2. initialisation du temps et du score
let chrono = 60;
let score = 0;
let phraseForScore; //10. Initialisation du score en fonction du temps de frappe de la phrase

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
    const phrase = results.content; //5c. je vais stocker la citation dans une variable phrase
    console.log(phrase);


    //10. quand la phrase arrive de l'API, je mets sa longueur dans ma variable phraseForScore
    phraseForScore = phrase.length;
    //5d. je vide la div où injecter les citations
    phraseToWrite.innerHTML = '';

    //5e. je vais split chaque lettre des citations dans une case de tableau, pour les vérifier une à une à chaque entrée
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

//Vérification des entrées et des erreurs

//7. à l'entrée de nouveaux caractères
phraseTest.addEventListener('input', () => {

    //7.b je récupère tous les spans qu'il y a dans la phrase à écrire
    const arrPhrase = phraseToWrite.querySelectorAll('span');
    //7c. je récupère toutes les lettres/valeurs que je suis en train d'écrire et les split dans un tableau
    const arrTest = phraseTest.value.split('');

    let correct = true;

    //8. pour chaque lettre que l'on va taper (ou chaque élément du tableau de la phrase que l'on doit vérifier), je vais obtenir l'index de la valeur courante(caracSpan). C'est donc la valeur courante qui va changer.
    arrPhrase.forEach((caracSpan, index) => {
        console.log(caracSpan);

        //8b. je vais vérifier chaque caractère de la phrase qui a été tapée
        const caractere = arrTest[index];

        //8e. donc je vais d'abord comparer mes spans uniquement à ce qui est entré
        if (caractere === undefined) {
            caracSpan.classList.remove('correct');
            caracSpan.classList.remove('incorrect');
            correct = false;
        }
        //8c. dans un premier temps, à l'aide d'un IF, je vais vérifier si les caractères correspondent ou pas
        //si les caractères entrés correspondent à mes spans, les spans passent en vert
        else if (caractere === caracSpan.innerText) {
            caracSpan.classList.add('correct');
            caracSpan.classList.remove('incorrect');
            //8d. sinon ils passent en rouge (MAIS jusque là, en cas d'erreur, c'est toute la phrase qui va passer en rouge)...
        } else {
            caracSpan.classList.remove('correct');
            caracSpan.classList.add('incorrect');
            correct = false;
        }
    })
    //9. si j'arrive à passer toutes les conditions sans passer par un false alors j'affiche une nouvelle citation
    if (correct) {
        showNewPhrase();
        //10. Affichage du score en fonction du temps de frappe
        score += phraseForScore;
    }
})

