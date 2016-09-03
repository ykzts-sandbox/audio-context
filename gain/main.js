{
  function readFile(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.addEventListener('load', function() {
        resolve(this.result);
      });
      fileReader.addEventListener('error', (...args) => {
        reject(...args)
      });
      fileReader.readAsArrayBuffer(file);
    });
  }

  function createAudioContext(arrayBuffer) {
    const audioContext = new AudioContext();
    return audioContext.decodeAudioData(arrayBuffer)
      .then((audioBuffer) => {
        return {
          audioContext,
          audioBuffer
        };
      });
  }

  function createGainNode({ audioContext, audioBuffer }) {
    const gainNode = audioContext.createGain();
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    source.loop = true;
    source.start(0);
    return gainNode;
  }

  function createGainSelector({ gain }) {
    const [ firstParagraph, ] = document.getElementsByTagName('p');
    const selector = document.createElement('input');
    selector.addEventListener('input', function() {
      gain.value = this.value;
    });
    selector.type = 'range';
    selector.max = 1;
    selector.min = 0;
    selector.step = 0.001;
    selector.value = gain.value;
    firstParagraph.appendChild(selector);
  }

  function fileSelect() {
    const [ file, ] = this.files;
    readFile(file)
      .then(createAudioContext)
      .then(createGainNode)
      .then(createGainSelector);
    this.parentNode.removeChild(this);
  }

  function main() {
    const fileSelector = document.getElementById('file-selector');
    fileSelector.addEventListener('change', fileSelect);
    if (fileSelector.files && fileSelector.files.length > 0) {
      fileSelector.call(fileSelector);
    }
  }

  main();
}
