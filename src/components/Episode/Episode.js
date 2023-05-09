import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';

export default function Episode({data}) {
    console.log(data, 'data');
    const audioRef = useRef(null);
    const handlePlayPause = () => {
        pauseAllAudio(); 
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
    <div>
        <img style={{width:'200px'}} src={data.image} alt="" />
        <h3>{data.title}</h3>
        <div></div>
        <div>
        <audio ref={audioRef} controls onPlay={handlePlayPause} >
            <source src={data.enclosureUrl} type={data.enclosureType} />
        </audio>
        </div>
    </div>
  )
}




