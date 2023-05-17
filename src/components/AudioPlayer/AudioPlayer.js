import React from 'react'
import { useRef } from 'react';

export default function AudioPlayer({fn, audioRef, enclosureType, enclosureUrl, timeStamp}) {
    const aRef = audioRef
    const handlePlayPause = () => {
        pauseAllAudio(); 
        audioRef.current.currentTime = timeStamp;
        audioRef.current.play();
      };
    
      const pauseAllAudio = () => {
        const audios = document.getElementsByTagName('audio');
        for (let i = 0; i < audios.length; i++) {
          if (audios[i] !== audioRef.current) {
            audios[i].pause();
          }
        }
      };

  return (
        <audio style={{height:'30px', width:'120px'}} ref={aRef} controls onPause={()=>fn('paused')} onPlay={handlePlayPause} >
            <source  type={enclosureType} src={enclosureUrl} />
        </audio>
  )
}
// export default function AudioPlayer({ audioRef, enclosureType, enclosureUrl}) {
//     const aRef = audioRef
//     const handlePlayPause = () => {
//         pauseAllAudio(); 
//         audioRef.current.play();
//       };
    
//       const pauseAllAudio = () => {
//         const audios = document.getElementsByTagName('audio');
//         for (let i = 0; i < audios.length; i++) {
//           if (audios[i] !== audioRef.current) {
//             audios[i].pause();
//           }
//         }
//       };
//   return (
//     <div>
//         <audio ref={aRef} controls onPlay={handlePlayPause} >
//             <source  type={enclosureType} src={enclosureUrl} />
//         </audio>
//     </div>
//   )
// }
