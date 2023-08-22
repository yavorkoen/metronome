console.log('hello metronome');

let btn = document.getElementById('play-btn');
let tempoInput = document.getElementById('tempo');

let tempo = tempoInput.value;
let ratio = tempo / 60;

let interval;

btn.addEventListener('click', toggleMetronome);
tempoInput.addEventListener('change', changeTempo);

function toggleMetronome(e) {
    console.log(e.target.id);
    if (e.target.id === 'play-btn') {
        interval = setInterval(playSound, setTempo());
        playSound();
        e.target.id = 'stop-btn';
        e.target.textContent = 'stop';
    } else if(e.target.id === 'stop-btn') {
        clearInterval(interval)
        interval = null;
        e.target.id = 'play-btn';
        e.target.textContent = 'play';
    }
}


function playSound() {
    const audio = new Audio('clave-sound.mp3');
    audio.play();
}
function getTempo(e) {
    tempo = e.target.value;
    ratio = tempo/60;
}
function setTempo() {
    return 1000 / ratio;
}
function changeTempo(e) {
    tempo = e.target.value;
    ratio = tempo/60;
    clearInterval(interval);
    interval = null;
    interval = setInterval(playSound, setTempo());
}