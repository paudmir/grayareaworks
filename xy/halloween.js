			
const buttonStart = document.getElementById("start-button");
var isPlaying = false;

function startTone() {
    //buttonStart.disabled = "true";
    Tone.Transport.timeSignature = [4, 4];
    if (isPlaying == false){
        Tone.start().then(() => { 
            console.log("audio is ready"); 
            Tone.Transport.start();
            isPlaying = true;
            buttonStart.textContent = "Stop me"
            //buttonStart.style.display = "none";
        }).catch((error) => { 
            console.log("audio not ready"); 
            buttonStart.disabled = "false"; 

        });
    }else if (isPlaying == true) {
        buttonStart.textContent = "Play me"
        Tone.Transport.pause();
        isPlaying = false;

    }
}


const playerS = new Tone.Player({
    url: "assets/screamM.wav",
}).toDestination();

const playerO = new Tone.Player({
    url: "assets/howl.wav",
}).toDestination();

const playerW = new Tone.Player({
    url: "assets/screamW.wav",
}).toDestination();

const playerC = new Tone.Player({
    url: "assets/cat.wav",
}).toDestination();

const reverb = new Tone.Reverb({
    decay: 5, 
    wet: 1, 
}).toDestination(); 

const synth = new Tone.MonoSynth({
  oscillator: { type: "square" },
  envelope: { attack: 0.01, decay: 0.2, sustain: 1, release: 0.5 },
}).toDestination();

const sequence = new Tone.Sequence((time, note) => {
    synth.triggerAttackRelease(note, "4n", time);
}, ["G4","G4", "G4","G4", ["G4","Ab4"], "F4", "F4", "F4", ["F4", "F4"], "F4", ["F4", "F4"], "F4", ["F4", "G4"], "Ab4", "G4", "G4", "G4","G4","G4","Ab4","Bb4",["Ab4","G4"], "F4", null, "F4", "F4", ["F4","G4"], "Ab4" , "G4", "Eb4", "D4", "G4"], "3n");
sequence.start(0);

// Map values between a range
function map(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// HTML elements
//const pad = document.getElementById('xy-pad');
//const dot = document.getElementById('dot');

// Handle mouse events
document.addEventListener('mousemove', (e) => {
    console.log("Mouse move");
        //const rect = pad.getBoundingClientRect();
    //const x = clamp(e.clientX - rect.left, 0, rect.width);
    //const y = clamp(e.clientY - rect.top, 0, rect.height);

    // Update dot position
   // dot.style.left = `${x}px`;
    //dot.style.top = `${y}px`;
});

var addedReverb = false;

// Play sound on mouse click
document.addEventListener('mousedown', () => {
    //synth.triggerAttack("C4");
    console.log("We should start here.");
    //Connecting all players to reverb
    if (addedReverb == false){
        playerS.connect(reverb);
        playerO.connect(reverb);
        playerW.connect(reverb);
        playerC.connect(reverb);
        addedReverb = true;
    } else if (addedReverb == false){
        playerS.disconnect(reverb);
        playerO.disconnect(reverb);
        playerW.disconnect(reverb);
        playerC.disconnect(reverb);
        addedReverb = false;
    }

    //Tone.Transport.start();
   // Tone.getTransport().start(); // restart sequence --->here
    //dot.classList.add("active");
});

// Stop sound on mouse release
document.addEventListener('mouseup', () => {
    synth.triggerRelease();
    console.log("We should release here.");
    //Tone.Transport.pause();
    //Tone.getTransport().pause(); // end sequence
    //dot.classList.remove("active");
});

document.addEventListener("keydown", (event) => {
  const keyName = event.key;
  console.log(keyName);
  if (keyName === 'a') {
    console.log("We pressed A");
    playerS.start();
    return;
  }else if (keyName === 'o') {
    console.log("We pressed o");
    playerO.start();
    return;
  } else if (keyName === 'f') {
    console.log("We pressed f");
    playerW.start();
    return;
  }  else if (keyName === 'y') {
    console.log("We pressed y");
    playerC.start();
    return;
  }

});
