{
  const volumePercent = document.getElementById('volume');
  const volumeMeter = (document.getElementsByTagName('meter') || [])[0];

  function setVolume(rate) {
    volumePercent.value = Math.floor(rate * 100);
    volumeMeter.value = rate;
  }

  function analyze(analyser) {
    const byteLength = analyser.frequencyBinCount;
    const maxVolume = byteLength * 255;
    const frequency = new Uint8Array(byteLength);
    let volume = 0;
    analyser.getByteFrequencyData(frequency);
    for (let i = 0; i < byteLength; ++i) {
      volume += frequency[i];
    }
    const rate = volume / maxVolume;
    setVolume(rate);
    requestAnimationFrame(() => analyze(analyser));
  }

  function main() {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        analyze(analyser);
      });
  }

  main();
}
