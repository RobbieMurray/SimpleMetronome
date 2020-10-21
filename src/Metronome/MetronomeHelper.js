export function triggerSound(audioContext, deadline){
    const osc = audioContext.createOscillator();

    osc.frequency.setValueAtTime(330, deadline);
    osc.frequency.linearRampToValueAtTime(
      50,
      deadline + 0.15
    );

    const amplifier = audioContext.createGain();
    osc.connect(amplifier);
    amplifier.gain.setValueAtTime(0, deadline);
    amplifier.gain.linearRampToValueAtTime(
      0.5,
      deadline + 0.02
    );
    amplifier.gain.linearRampToValueAtTime(
      0,
      deadline + 0.20
    );
    amplifier.connect(audioContext.destination);
    osc.start(deadline);

    setTimeout(()=> {
      osc.disconnect();
      amplifier.disconnect();
    }, 3000);
  }