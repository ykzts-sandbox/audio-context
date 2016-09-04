{
  const watchChangeFor = (element) => new Promise((resolve) => {
    const selectFile = ({ target }) => {
      const [ file, ] = target.files || [];
      if (file instanceof File && file.type.startsWith('audio/')) {
        const { parentNode } = element;
        element.removeEventListener('change', selectFile);
        parentNode.removeChild(element);
        parentNode.textContent = file.name;
        resolve(file);
      }
    };
    element.addEventListener('change', selectFile);
  });

  const readFile = (file) =>
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => resolve(fileReader.result));
      fileReader.addEventListener('error', reject);
      fileReader.readAsArrayBuffer(file);
    });

  const createAudioSource = (audioContext, audioBuffer) => {
    const audioSource = audioContext.createBufferSource();
    audioSource.buffer = audioBuffer;
    audioSource.loop = true;
    return audioSource;
  };

  const connectToDestination = (audioSource, destination) => {
    audioSource.connect(destination);
    audioSource.start(0);
    return audioSource;
  };

  const main = () => {
    const audioContext = new AudioContext();
    const destination = audioContext.destination;
    Promise.all([
      document.getElementById('audio-file1'),
      document.getElementById('audio-file2'),
      document.getElementById('audio-file3')
    ].map(watchChangeFor))
      .then((files) =>
        Promise.all(files.map(readFile)))
      .then((arrayBuffers) =>
        Promise.all(arrayBuffers.map((arrayBuffer) =>
          audioContext.decodeAudioData(arrayBuffer))))
      .then((audioBuffers) =>
        Promise.all(audioBuffers.map((audioBuffer) =>
          createAudioSource(audioContext, audioBuffer))))
      .then((audioSources) =>
        Promise.all(audioSources.map((audioSource) =>
          connectToDestination(audioSource, destination))))
  };

  main();
}
