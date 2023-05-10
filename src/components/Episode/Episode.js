import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import AudioPlayer from '../AudioPlayer/AudioPlayer';

export default function Episode({data}) {
    const audioRef = useRef(null)
  return (
    <div>
        <img style={{width:'200px'}} src={data.image} alt="" />
        <h3>{data.title}</h3>
        <div>{data.description.replace(/(<p>Visit).*(<\/p>)/gi, '').replaceAll(/<p>|<\/p>/gi, '')}</div>
        <div>
        <AudioPlayer audioRef = {audioRef} enclosureType={data.enclosureType} enclosureUrl={data.enclosureUrl} />
        <Link to={"/podcast/episode/"+data.feedId+"/"+data.id}>Visit here</Link>
        </div>
    </div>
  )
}




