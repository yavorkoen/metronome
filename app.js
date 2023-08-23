import Timer from "./timer";


let btn = document.getElementById('play-btn');
let tempoInput = document.getElementById('tempo');
let noteLengthSelect = document.getElementById('note-length');

let tempo = tempoInput.value;


const noteLengthsRatios = {
    'quarter': 1,
    'eight': 2,
    'qrt-tuple': 1.5,
    'eight-tuple': 3,
}

let ratio = tempo / 60 * noteLengthsRatios[noteLengthSelect.selectedOptions[0].value]

const noteLengthsBeats = {
    'quarter': 4,
    'eight': 2,
    'qrt-tuple': 3,
    'eight-tuple': 3,
}


let interval;
let counter = 2;
let beats = 4;

btn.addEventListener('click', toggleMetronome);
noteLengthSelect.addEventListener('change', setNoteLengthRatio);

function toggleMetronome(e) {
    if (e.target.id === 'play-btn') {
        e.target.id = 'stop-btn';
        e.target.textContent = 'stop';
        playSound();
        interval = setInterval(playSoundLoop, setTempo());
        tempoInput.addEventListener('change', getChangeTempo);
    } else if (e.target.id === 'stop-btn') {
        clearInterval(interval)
        interval = null;
        e.target.id = 'play-btn';
        e.target.textContent = 'play';
        tempoInput.removeEventListener('change', getChangeTempo);
        counter = 2;
    }
}


function playSound() {
    // console.log(tempo);
    // console.log(ratio);
    const audio = new Audio('clave-high.mp3');
    audio.play();
}

function playSoundLoop() {
    console.log(beats);
    if (counter === 1) {
        const claveHighSound = new Audio('clave-high.mp3');
        claveHighSound.play();
    } else {
        const claveSound = new Audio('clave-sound.mp3');
        claveSound.play();
    }
    if (counter < beats) {
        counter++;
    } else {
        counter = 1;
    }
    console.log(counter, 'counter');
}

function setTempo() {
    console.log(ratio, 'setTempo');
    return 1000 / ratio;
}
function getChangeTempo(e) {
    tempo = e.target.value;
    ratio = tempo / 60 * noteLengthsRatios[noteLengthSelect.selectedOptions[0].value];
    clearInterval(interval);
    interval = null;
    interval = setInterval(playSoundLoop, setTempo());
}
function setNoteLengthRatio(e) {
    ratio = tempo / 60 * noteLengthsRatios[e.target.selectedOptions[0].value];
    beats = noteLengthsBeats[e.target.selectedOptions[0].value]
    clearInterval(interval);
    interval = null;
    interval = setInterval(playSoundLoop, setTempo());
}