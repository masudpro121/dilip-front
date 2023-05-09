import React, { useState, useEffect } from 'react';

function SpeakIt() {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(1.0);
  const [pitch, setPitch] = useState(1.0);
const synth = window.speechSynthesis;
  useEffect(() => {
    const voices = synth.getVoices();
    setVoices(voices);
    setSelectedVoice(voices[0]);
  }, []);
console.log(voices, 'voices');
  const speak = () => {
    if (selectedVoice) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      utterance.rate = rate;
      utterance.pitch = pitch;
      synth.speak(utterance);
    }
  };

  const handleVoiceChange = (event) => {
    setSelectedVoice(voices.find((voice) => voice.name === event.target.value));
  };

  const handleRateChange = (event) => {
    setRate(event.target.value);
  };

  const handlePitchChange = (event) => {
    setPitch(event.target.value);
  };

  return (
    <div>
      <textarea onChange={(e) => setText(e.target.value)} />
     <div>
     <select onChange={handleVoiceChange}>
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name}
          </option>
        ))}
      </select>
     </div> 
      <label>
        Rate:
        <input type="range" min="0.1" max="10" step="0.1" value={rate} onChange={handleRateChange} />
      </label>
      <label>
        Pitch:
        <input type="range" min="0.1" max="10" step="0.1" value={pitch} onChange={handlePitchChange} />
      </label>
      <button onClick={speak}>Speak</button>
    </div>
  );
}

export default SpeakIt;
