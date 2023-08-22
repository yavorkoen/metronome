let btn = document.getElementById('play-btn');
let tempoInput = document.getElementById('tempo');
let noteLengthSelect = document.getElementById('note-length');

let tempo = tempoInput.value;
let ratio = tempo / 60;

const noteLengthsRatios = {
    'quarter': tempo / 60,
    'eight': tempo / 60 * 2,
    'qrt-tuple': tempo / 60 / 2 * 3,
    'eight-tuple': tempo / 60 * 3,
}

let interval;

btn.addEventListener('click', toggleMetronome);
noteLengthSelect.addEventListener('change', setNoteLengthRatio);

function toggleMetronome(e) {
    console.log(e.target.id);
    if (e.target.id === 'play-btn') {
        e.target.id = 'stop-btn';
        e.target.textContent = 'stop';
        interval = setInterval(playSound, setTempo());
        playSound();
        tempoInput.addEventListener('change', getChangeTempo);
    } else if(e.target.id === 'stop-btn') {
        clearInterval(interval)
        interval = null;
        e.target.id = 'play-btn';
        e.target.textContent = 'play';
        tempoInput.removeEventListener('change', getChangeTempo);
    }
}


function playSound() {
    const audio = new Audio('clave-sound.mp3');
    audio.play();
}
function setTempo() {
    return 1000 / ratio;
}
function getChangeTempo(e) {
    tempo = e.target.value;
    ratio = tempo/60;
    clearInterval(interval);
    interval = null;
    interval = setInterval(playSound, setTempo());
}
function setNoteLengthRatio(e) {
    tempo = tempoInput.value;
    ratio = noteLengthsRatios[e.target.selectedOptions[0].value];
    clearInterval(interval);
    interval = null;
    console.log(ratio);
}