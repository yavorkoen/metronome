import Timer from "./timer.js";

const tempo = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo-text');
const tempoSlider = document.querySelector('.tempo-slider');
const decreaseTempoBtn = document.querySelector('.decrease-tempo');
const increaseTempoBtn = document.querySelector('.increase-tempo');
const startStopBtn = document.querySelector('.start-stop-btn');
const decreaseBeats = document.querySelector('.decrease-beats');
const increaseBeats = document.querySelector('.increase-beats');
const measureCount = document.querySelector('.measure-count');

let bpm = 120;
let beatsPerMeasure = 4;
let count = 0;
let isRunning = false;

startStopBtn.addEventListener('click', (e) => {
    if(!isRunning) {
        metronome.start();
        isRunning = true;
        e.target.textContent = "STOP";
    } else {
        metronome.stop();
        isRunning = false;
        e.target.textContent = "START";
    }
})

decreaseTempoBtn.addEventListener('click', () => {
    bpm--;
    if(bpm <= 40) { return };
    validateTempo();
    updateMetronome();
});

increaseTempoBtn.addEventListener('click', () => {
    bpm++;
    if(bpm >= 340) { return };
    validateTempo();
    updateMetronome();
});

tempoSlider.addEventListener('input', (e) => {
    validateTempo();
    bpm = e.target.value
    updateMetronome();
});

decreaseBeats.addEventListener('click', () => {
    beatsPerMeasure--;
    measureCount.textContent = beatsPerMeasure;
    count=0;
});
increaseBeats.addEventListener('click', () => {
    if(beatsPerMeasure >= 19) { return };
    beatsPerMeasure++;
    measureCount.textContent = beatsPerMeasure;
    count=0;
});

function updateMetronome() {
    tempo.textContent = bpm;
    tempoSlider.value = bpm;
    metronome.timeInterval = 60000 / bpm;
}

function validateTempo() {
    if(bpm <= 40) { return };
    if(bpm >= 340) { return };
}

function playClick() {
    let clave1 = new Audio('clave1.mp3');
    let clave2 = new Audio('clave2.mp3');
    if(count === beatsPerMeasure) {
        count = 0;
    }
    if(count === 0) {
        clave1.play();
        clave2.currentTime = 0;
    }else{
        clave2.play();
        clave2.currentTime = 0;
    }
    count++;   
}

const metronome = new Timer(playClick, 60000 / bpm, {immediate: true});



