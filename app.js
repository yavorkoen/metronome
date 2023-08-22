console.log('hello metronome');
let interval;

let btn = document.getElementById('play-btn');
btn.addEventListener('click', toggleMetronome);
function toggleMetronome(e) {
    console.log(e.target.id);
    if (e.target.id === 'play-btn') {
        let time = 1000;
        interval = setInterval(playSound, time);
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