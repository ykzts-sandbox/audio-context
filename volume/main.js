{
  const volumePercent = document.getElementById('volume');
  const volumeMeter = (document.getElementsByTagName('meter') || [])[0];

  const setVolume = (rate) => {
    volumePercent.value = Math.floor(rate * 100);
    volumeMeter.value = rate;
  };

  const analyze = (analyser) => {
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
  };

  const main = () => {
    const audioContext = new AudioContext();
    const processor = audioContext.createScriptProcessor(1024, 1, 1);
    const analyser = audioContext.createAnalyser();
    processor.addEventListener('audioprocess', (...args) => {
      analyze(analyser);
    });
    processor.connect(audioContext.destination);
    analyser.connect(processor);
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
      });
  };

  main();
}
