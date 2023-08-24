// import Timer from "./timer";

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

decreaseTempoBtn.addEventListener('click', () => {
    if(bpm <= 40) { return };
    bpm--;
    updateMetronome()
});

increaseTempoBtn.addEventListener('click', () => {
    if(bpm >= 340) { return };
    bpm++;
    updateMetronome()
});

tempoSlider.addEventListener('input', (e) => {
    bpm = e.target.value
    updateMetronome()
});

decreaseBeats.addEventListener('click', () => {
    beatsPerMeasure--;
    measureCount.textContent = beatsPerMeasure;
});
increaseBeats.addEventListener('click', () => {
    if(beatsPerMeasure >= 19) { return };
    beatsPerMeasure++;
    measureCount.textContent = beatsPerMeasure;
});

function updateMetronome() {
    tempo.textContent = bpm;
    tempoSlider.value = bpm;
}
