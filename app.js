import Timer from "./timer.js";

const tempo = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo-text');
const tempoSlider = document.querySelector('.tempo-slider');
const decreaseBtn = document.querySelector('.decrease-tempo');
const increaseBtn = document.querySelector('.increase-tempo');
const startStopBtn = document.querySelector('.start-stop-btn');
const toggleSettingsBtn = document.querySelector('.toggle-settings-btn');
const toggleSettings = document.querySelector('.toggle-settings');
const decreaseBeats = document.querySelector('.decrease-beats');
const increaseBeats = document.querySelector('.increase-beats');
const measureCount = document.querySelector('.measure-count');
const noteLength = document.querySelector('.note-length');

let bpm = 120;
let beatsPerMeasure = 4;
let count = 0;
let isRunning = false;
let toggleSettingsBPM = true;

startStopBtn.addEventListener('click', (e) => {
    if (!isRunning) {
        metronome.start();
        isRunning = true;
        e.target.textContent = "stop";
    } else {
        metronome.stop();
        isRunning = false;
        e.target.textContent = "start";
        count = 0;
    }
})

decreaseBtn.addEventListener('click', () => {
    setDecreaseBtns();
    validateTempo();
    updateMetronome();
});

increaseBtn.addEventListener('click', () => {
    setIncreaseBtns();
    validateTempo();
    updateMetronome();
});

tempoSlider.addEventListener('input', (e) => {
    validateTempo();
    bpm = e.target.value;
    updateMetronome();
});
toggleSettings.addEventListener('click', (e) => {
    if (toggleSettingsBPM) {
        toggleSettingsBtn.style.transform = 'translateX(25px)'
        toggleSettingsBPM = false;
    } else {
        toggleSettingsBtn.style.transform = 'translateX(0px)'
        toggleSettingsBPM = true;
    }
})

// decreaseBeats.addEventListener('click', () => {
//     beatsPerMeasure--;
//     measureCount.textContent = beatsPerMeasure;
//     count=0;
// });
// increaseBeats.addEventListener('click', () => {
//     if(beatsPerMeasure >= 19) { return };
//     beatsPerMeasure++;
//     measureCount.textContent = beatsPerMeasure;
//     count=0;
// });

// noteLength.addEventListener('change', () => {
//     let noteLengthsRatios = {
//         'quarter': 1,
//         'eight': 2,
//         'qrt-tuple': 1.5,
//         'eight-tuple': 3,
//         '16th-note': 4
//     }
//     metronome.timeInterval = 60000 / bpm / noteLengthsRatios[noteLength.value];
// })

function updateMetronome() {
    tempo.textContent = bpm;
    tempoSlider.value = bpm;
    metronome.timeInterval = 60000 / bpm;
    setRotationAngles(tempoSlider, (bpm - 40) * 0.29, 180 - ((bpm - 40) * 0.29), 60000 / bpm);
}

function validateTempo() {
    if (bpm <= 40) { return };
    if (bpm >= 340) { return };
}

function setDecreaseBtns() {
    if (toggleSettingsBPM) {
        bpm--;
        if (bpm <= 40) { return };
    } else {
        beatsPerMeasure--;
        measureCount.textContent = beatsPerMeasure;
        count = 0;
    }
}
function setIncreaseBtns() {
    if (toggleSettingsBPM) {
        bpm++;
        if (bpm >= 340) { return };
    } else {
        beatsPerMeasure++;
        measureCount.textContent = beatsPerMeasure;
        count = 0;
    }
}

function playClick() {
    let clave1 = new Audio('clave1.mp3');
    let clave2 = new Audio('clave2.mp3');
    if (count === beatsPerMeasure) {
        count = 0;
    }
    if (count === 0) {
        clave1.play();
        clave2.currentTime = 0;
    } else {
        clave2.play();
        clave2.currentTime = 0;
    }
    count++;
    setRotation(tempoSlider, (bpm - 40) * 0.29, 180 - ((bpm - 40) * 0.29), 60000 / bpm);
}
function setRotation(element, angleLeft, angleRight, duration) {
    element.style.setProperty('--angleLeft', angleLeft);
    element.style.setProperty('--angleRight', angleRight);
    element.style.setProperty('--duration', duration);
}

const metronome = new Timer(playClick, 60000 / bpm, { immediate: true, el: tempoSlider });



