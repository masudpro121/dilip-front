import React, { useState, useEffect } from 'react';

function SpeakIt() {
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState(null);
  const voices = window.speechSynthesis.getVoices();


  const speak = () => {
    window.speechSynthesis.cancel()
    const chunks = text.match(/[^\.!\?]+[\.!\?]+/g); // split text into chunks by sentences
    for (let i = 0; i < chunks.length; i++) {
      const utterance = new SpeechSynthesisUtterance(chunks[i]);
      utterance.voice = voices.find(v => v.name === "Google UK English Male");
      utterance.rate = 0.92;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const cancelSpeak = () => {
    window.speechSynthesis.cancel()
  }
 
  return (
    <div >
      <textarea style={{width:'500px', height:'300px', background:'black'}}  onChange={(e) => setText(e.target.value)} />
     <div>
     {/* <select style={{background:'black'}} onChange={handleVoiceChange} defaultValue={selectedVoice?.name}>
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name}
          </option>
        ))}
      </select> */}
     </div> 
      {/* <label>
        Rate:
        <input type="range" min="0.1" max="10" step="0.1" value={rate} onChange={handleRateChange} />
      </label>
      <label>
        Pitch:
        <input type="range" min="0.1" max="10" step="0.1" value={pitch} onChange={handlePitchChange} />
      </label> */}
      <button onClick={speak}>Speak</button>
      <button onClick={cancelSpeak}>cancel</button>
    </div>
  );
}

export default SpeakIt;
