// Web Audio API Retro 8-Bit Synthesizer

class SoundEngine {
  private ctx: AudioContext | null = null;
  private bgmOsc1: OscillatorNode | null = null;
  private bgmOsc2: OscillatorNode | null = null;
  private bgmInterval: number | null = null;
  private isBgmPlaying = false;
  private masterGain: GainNode | null = null;

  public bgmMuted = false;
  public sfxMuted = false;
  public volume = 0.6;

  private initCtx(): AudioContext | null {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  // --- Retro Sound Effects ---

  public playKeyClick() {
    if (this.sfxMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain || ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }

  public playTileFlip(colIndex: number) {
    if (this.sfxMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    const baseFreq = 300 + colIndex * 70;
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.masterGain || ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  }

  public playTileResult(state: 'correct' | 'present' | 'absent') {
    if (this.sfxMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (state === 'correct') {
      // High bright ding
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.06); // A5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(this.masterGain || ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (state === 'present') {
      // Warm medium chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.05); // C#5
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.masterGain || ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else {
      // Low muted thud
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.masterGain || ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    }
  }

  public playSlash() {
    if (this.sfxMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    // White noise sweep for sword slash
    const bufferSize = ctx.sampleRate * 0.15;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.14);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain || ctx.destination);
    noise.start();
  }

  public playHit() {
    if (this.sfxMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.18);

    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(this.masterGain || ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  }

  public playBlock() {
    if (this.sfxMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Metallic shield clang (dual high-pitched square/triangle harmonics)
    [980, 1480].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx === 0 ? 'square' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.65, now + 0.16);

      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(gain);
      gain.connect(this.masterGain || ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    });
  }

  public playFootstep() {
    if (this.sfxMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(90 + Math.random() * 20, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGain || ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  }

  public playVictoryFanfare() {
    if (this.sfxMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const notes = [
      { f: 523.25, d: 0.12 }, // C5
      { f: 523.25, d: 0.12 }, // C5
      { f: 523.25, d: 0.12 }, // C5
      { f: 659.25, d: 0.35 }, // E5
      { f: 587.33, d: 0.15 }, // D5
      { f: 659.25, d: 0.15 }, // E5
      { f: 783.99, d: 0.55 }, // G5
    ];

    let time = ctx.currentTime;
    notes.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(note.f, time);

      gain.gain.setValueAtTime(0.2, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + note.d);

      osc.connect(gain);
      gain.connect(this.masterGain || ctx.destination);
      osc.start(time);
      osc.stop(time + note.d);
      time += note.d * 0.9;
    });
  }

  public playDefeatSound() {
    if (this.sfxMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const notes = [440, 415.3, 392, 349.23];
    let time = ctx.currentTime;
    notes.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.22, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.28);

      osc.connect(gain);
      gain.connect(this.masterGain || ctx.destination);
      osc.start(time);
      osc.stop(time + 0.28);
      time += 0.22;
    });
  }

  public playUnlockSound() {
    if (this.sfxMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const arpeggio = [523.25, 659.25, 783.99, 1046.5];
    let time = ctx.currentTime;
    arpeggio.forEach((f) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, time);

      gain.gain.setValueAtTime(0.25, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

      osc.connect(gain);
      gain.connect(this.masterGain || ctx.destination);
      osc.start(time);
      osc.stop(time + 0.2);
      time += 0.08;
    });
  }

  public playUltimateCutIn(who: 'knight' | 'enemy') {
    if (this.sfxMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Dramatic power-up sweep
    const sweepOsc = ctx.createOscillator();
    const sweepGain = ctx.createGain();
    sweepOsc.type = who === 'knight' ? 'sawtooth' : 'square';
    if (who === 'knight') {
      sweepOsc.frequency.setValueAtTime(220, now);
      sweepOsc.frequency.exponentialRampToValueAtTime(1320, now + 0.35);
    } else {
      sweepOsc.frequency.setValueAtTime(440, now);
      sweepOsc.frequency.exponentialRampToValueAtTime(85, now + 0.4);
    }
    sweepGain.gain.setValueAtTime(0.28, now);
    sweepGain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
    sweepOsc.connect(sweepGain);
    sweepGain.connect(this.masterGain || ctx.destination);
    sweepOsc.start(now);
    sweepOsc.stop(now + 0.45);

    // Chime / Dread Accent Notes
    const notes =
      who === 'knight'
        ? [523.25, 659.25, 783.99, 1046.5, 1318.5]
        : [311.13, 277.18, 220.0, 155.56];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = who === 'knight' ? 'triangle' : 'sawtooth';
      const t = now + 0.08 + i * 0.06;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.connect(gain);
      gain.connect(this.masterGain || ctx.destination);
      osc.start(t);
      osc.stop(t + 0.25);
    });
  }

  public playUltimateImpact(who: 'knight' | 'enemy') {
    if (this.sfxMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Rapid triple slash / energy burst
    [0, 0.12, 0.24].forEach((offset, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      const startFreq = who === 'knight' ? 600 + idx * 220 : 280 - idx * 50;
      const endFreq = who === 'knight' ? 120 : 35;
      osc.frequency.setValueAtTime(startFreq, now + offset);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + offset + 0.18);

      gain.gain.setValueAtTime(0.35, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.18);

      osc.connect(gain);
      gain.connect(this.masterGain || ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.18);
    });

    // Final heavy explosion boom at +0.32s
    const bufferSize = Math.floor(ctx.sampleRate * 0.45);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.15));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(who === 'knight' ? 1600 : 900, now + 0.3);
    filter.frequency.exponentialRampToValueAtTime(80, now + 0.75);

    const boomGain = ctx.createGain();
    boomGain.gain.setValueAtTime(0.45, now + 0.3);
    boomGain.gain.exponentialRampToValueAtTime(0.01, now + 0.75);

    noise.connect(filter);
    filter.connect(boomGain);
    boomGain.connect(this.masterGain || ctx.destination);
    noise.start(now + 0.3);
  }

  // --- Chiptune Looping BGM ---

  public startBgm(mode: 'explore' | 'combat' = 'explore') {
    if (this.bgmMuted) return;
    this.stopBgm();

    const ctx = this.initCtx();
    if (!ctx) return;

    this.isBgmPlaying = true;
    const tempo = mode === 'combat' ? 140 : 105;
    const beatMs = (60 / tempo) * 1000;

    // Bassline and arpeggios pattern
    const exploreMelody = [
      261.63, 329.63, 392.00, 523.25,
      220.00, 261.63, 329.63, 440.00,
      174.61, 220.00, 261.63, 349.23,
      196.00, 246.94, 293.66, 392.00,
    ];

    const combatMelody = [
      130.81, 130.81, 196.00, 155.56,
      130.81, 261.63, 233.08, 196.00,
      116.54, 116.54, 174.61, 138.59,
      146.83, 146.83, 220.00, 174.61,
    ];

    const melody = mode === 'combat' ? combatMelody : exploreMelody;
    let step = 0;

    this.bgmInterval = window.setInterval(() => {
      if (!this.isBgmPlaying || this.bgmMuted || !this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = mode === 'combat' ? 'sawtooth' : 'triangle';
      const freq = melody[step % melody.length];
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(mode === 'combat' ? 0.08 : 0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + (beatMs / 1000) * 0.9);

      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + (beatMs / 1000) * 0.9);

      step++;
    }, beatMs / 2);
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    if (this.bgmOsc1) {
      try { this.bgmOsc1.stop(); } catch { /* ignore */ }
      this.bgmOsc1 = null;
    }
    if (this.bgmOsc2) {
      try { this.bgmOsc2.stop(); } catch { /* ignore */ }
      this.bgmOsc2 = null;
    }
  }

  public toggleBgm(): boolean {
    this.bgmMuted = !this.bgmMuted;
    if (this.bgmMuted) {
      this.stopBgm();
    } else {
      this.startBgm('explore');
    }
    return this.bgmMuted;
  }

  public toggleSfx(): boolean {
    this.sfxMuted = !this.sfxMuted;
    return this.sfxMuted;
  }
}

export const soundEngine = new SoundEngine();
