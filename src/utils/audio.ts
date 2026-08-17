let ctx: AudioContext | null = null;
let musikOn = true;
let musicTimer: number | null = null;
let musicPaused = false;
let musicStep = 0;

const STEP_MS = 230;

const MELODI = [
  523.25, 659.25, 783.99, 659.25,
  880.0, 783.99, 698.46, 659.25,
  587.33, 698.46, 880.0, 698.46,
  783.99, 1046.5, 783.99, 659.25,
];

const BASS = [
  130.81, 130.81, 174.61, 174.61,
  196.0, 196.0, 174.61, 174.61,
  146.83, 146.83, 196.0, 196.0,
  196.0, 196.0, 174.61, 174.61,
];

function getCtx(): AudioContext {
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC();
  }
  return ctx;
}

function resume() {
  const ac = getCtx();
  if (ac.state === 'suspended') ac.resume();
}

function nada(freq: number, time: number, dur: number, type: OscillatorType, vol: number) {
  const ac = getCtx();
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(vol, time + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);
  osc.connect(gain);
  gain.connect(ac.destination);
  osc.start(time);
  osc.stop(time + dur + 0.05);
}

function wah(time: number, dur: number, f0: number, f1: number, vol: number) {
  const ac = getCtx();
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  const lfo = ac.createOscillator();
  const lfoGain = ac.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(f0, time);
  osc.frequency.exponentialRampToValueAtTime(f1, time + dur);

  lfo.frequency.value = 25;
  lfoGain.gain.value = 22;
  lfo.connect(lfoGain);
  lfoGain.connect(osc.frequency);

  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(vol, time + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);

  osc.connect(gain);
  gain.connect(ac.destination);
  lfo.connect(lfoGain);
  osc.start(time);
  osc.stop(time + dur + 0.05);
  lfo.start(time);
  lfo.stop(time + dur + 0.05);
}

function scheduleStep() {
  const ac = getCtx();
  const t = ac.currentTime;
  const idx = musicStep % MELODI.length;
  nada(MELODI[idx], t, (STEP_MS / 1000) * 0.85, 'triangle', 0.055);
  if (musicStep % 4 === 0) {
    nada(BASS[idx], t, (STEP_MS / 1000) * 3.9, 'sine', 0.08);
  }
  musicStep++;
}

function startTimer() {
  if (musicTimer !== null) return;
  musicTimer = window.setInterval(scheduleStep, STEP_MS);
}

function stopTimer() {
  if (musicTimer !== null) {
    clearInterval(musicTimer);
    musicTimer = null;
  }
}

function jedaMusik() {
  const sempatMain = musicTimer !== null || musicPaused;
  stopTimer();
  musicPaused = sempatMain && musikOn;
}

function lanjutMusik() {
  if (musikOn && musicPaused) {
    musicPaused = false;
    startTimer();
  }
}

function putarEfek(efek: () => void, jedaMs: number) {
  resume();
  jedaMusik();
  efek();
  setTimeout(lanjutMusik, jedaMs);
}

export const pustakaAudio = {
  mulaiMusik() {
    resume();
    if (!musikOn || musicTimer !== null) return;
    startTimer();
  },

  hentikanMusik() {
    stopTimer();
    musicPaused = false;
  },

  toggleMusik(): boolean {
    musikOn = !musikOn;
    if (musikOn) {
      musicPaused = false;
      startTimer();
    } else {
      stopTimer();
    }
    return musikOn;
  },

  benar() {
    putarEfek(() => {
      const ac = getCtx();
      const t = ac.currentTime;
      const arpeggio = [523.25, 659.25, 783.99, 1046.5];
      arpeggio.forEach((f, i) => nada(f, t + i * 0.09, 0.28, 'triangle', 0.2));
    }, 1800);
  },

  salah() {
    putarEfek(() => {
      const ac = getCtx();
      const t = ac.currentTime;
      const segmen = [
        { f0: 340, f1: 300, dur: 0.24 },
        { f0: 300, f1: 255, dur: 0.24 },
        { f0: 255, f1: 225, dur: 0.24 },
        { f0: 225, f1: 140, dur: 0.72 },
      ];
      let waktu = t;
      segmen.forEach((s) => {
        wah(waktu, s.dur, s.f0, s.f1, 0.16);
        waktu += s.dur;
      });
    }, 2200);
  },

  mulaiPutar() {
    resume();
    jedaMusik();
  },

  tick() {
    resume();
    const ac = getCtx();
    nada(1700, ac.currentTime, 0.05, 'square', 0.045);
  },

  selesaiPutar() {
    const ac = getCtx();
    const t = ac.currentTime;
    const fanfare = [523.25, 659.25, 783.99, 1046.5, 1318.5, 1046.5, 1318.5];
    fanfare.forEach((f, i) => nada(f, t + i * 0.11, 0.32, 'triangle', 0.22));
    setTimeout(lanjutMusik, 1600);
  },
};