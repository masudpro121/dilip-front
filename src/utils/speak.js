export const speak = (text) => {
    window.speechSynthesis.cancel();
 const voices = window.speechSynthesis.getVoices();
 console.log(voices, 'voices');
  const chunks = text.match(/[^\.!\?]+[\.!\?]+/g); // split text into chunks by sentences
  for (let i = 0; i < chunks.length; i++) {
    const utterance = new SpeechSynthesisUtterance(chunks[i]);
    utterance.voice = voices.find((v) => v.name === "Google UK English Male");
    utterance.rate = 0.92;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }
};

export const cancelSpeak = () => {
  window.speechSynthesis.cancel();
};

