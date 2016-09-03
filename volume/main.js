{
  const volumePercent = document.getElementById('volume');
  const meter = (document.getElementsByTagName('meter') || [])[0];

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
    volumePercent.value = Math.floor(rate * 100);
    meter.value = rate;
    requestAnimationFrame(() => analyze(analyser));
  }

  function main() {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    analyser.connect(audioContext.destination);
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        analyze(analyser);
      });
  }

  main();
}
