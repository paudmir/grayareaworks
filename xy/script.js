			
const buttonStart = document.getElementById("start-button");

function startTone() {
    buttonStart.disabled = "true";
	Tone.start().then(() => { 
        console.log("audio is ready"); 
        buttonStart.style.display = "none";
    }).catch((error) => { 
        console.log("audio not ready"); 
        buttonStart.disabled = "false"; 
    });
}

const synth = new Tone.MonoSynth({
  oscillator: { type: "square" },
  envelope: { attack: 0.01, decay: 0.2, sustain: 1, release: 0.5 },
});

const sequence = new Tone.Sequence((time, note) => {
    synth.triggerAttackRelease(note, "3n", time);
}, ["A4", "A3", "A2", "E4", "A4", "D4", "A4","D4", "A4", "E4"], "3n");
sequence.start(0);

const synthBass = new Tone.Synth().toDestination();

const loop = new Tone.Loop((time) => {
    synthBass.triggerAttackRelease("A3", "3n", time);
}, "6n").start(0);


const vibrato = new Tone.Vibrato({
  frequency: 5,
  depth: 0.1,
}).toDestination();

const phaseob = new Tone.Phaser({
    frequency: 15,
    octaves: 5,
    baseFrequency: 1000
}).toDestination();

const chorusob = new Tone.Chorus(4, 2.5, 0.5).toDestination();

// Add a gain node to control volume
const volumeGain = new Tone.Gain(1).toDestination();

// Create an LFO to control the volume
const volumeLFO = new Tone.LFO({
  type: "square",
  frequency: 1, // Slow oscillation
  min: 0,       // Fully silent
  max: 1,       // Full volume
  amplitude: 1, // Full-range modulation
}).start();

// Connect the LFO to the gain's volume
volumeLFO.connect(volumeGain.gain);

// Chain the effects
//synth.chain(vibrato, volumeGain);
synth.chain(volumeGain, phaseob);
//synthBass.chain(volumeGain);


// Map values between a range
function map(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// HTML elements
const pad = document.getElementById('xy-pad');
const dot = document.getElementById('dot');

// Handle mouse events
pad.addEventListener('mousemove', (e) => {
    const rect = pad.getBoundingClientRect();
    const x = clamp(e.clientX - rect.left, 0, rect.width);
    const y = clamp(e.clientY - rect.top, 0, rect.height);

    // Update dot position
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;

    const phasefreq  = map(x, 0, rect.width, 0, 20);
    const phasebasef = map(x, 0, rect.width, 500, 4000);
    phaseob.frequency.value = phasefreq;
    phaseob.baseFrequency.value = phasebasef; 

    //const vibratoDepth = map(x, 0, rect.width, 0, 0.5);
    //const vibratoFrequency = map(x, 0, rect.width, 0.1, 8);
    //vibrato.depth.value = vibratoDepth;
    //vibrato.frequency.value = vibratoFrequency;

    const chorusf = map(y, 0, rect.height, 1, 10);
    const chorusd = map(y, 0, rect.height, 0, 1);
    chorusob.frequency.value = chorusf;
    chorusob.depth.value = chorusd;
    
    //const lfoFrequency = map(y, 0, rect.height, 0.1, 15); // Slow to fast modulation
    //volumeLFO.frequency.value = lfoFrequency;
    //const lfoDepth = map(y, 0, rect.height, 0, 1); // None to full depth
    //volumeLFO.amplitude.value = lfoDepth; // Apply depth directly to amplitude
});

// Play sound on mouse click
pad.addEventListener('mousedown', () => {
    //synth.triggerAttack("C4");
    Tone.getTransport().start(); // restart sequence
    dot.classList.add("active");
});

// Stop sound on mouse release
pad.addEventListener('mouseup', () => {
    //synth.triggerRelease();
    Tone.getTransport().pause(); // end sequence
    dot.classList.remove("active");
});