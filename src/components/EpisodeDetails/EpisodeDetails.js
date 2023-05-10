import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getEpisodeDetails } from '../../apis/server'
import { useState } from 'react'
import AudioPlayer from '../AudioPlayer/AudioPlayer'
import { useRef } from 'react'

export default function EpisodeDetails() {
    const audioRef = useRef(null)
    const {feedId, episodeId} = useParams()
    const [episode, setEpisode] = useState({})
    useEffect(()=>{
        getEpisodeDetails(feedId, episodeId)
        .then(res=>res.json())
        .then(res=>{
            setEpisode(res.data)
        })
    },[])
    console.log(episode.enclosureUrl, episode.enclosureType);
  return (
    <div>
         <h3>{episode.title}</h3>
        {/* <div>{episode.description.replace(/(<p>Visit).*(<\/p>)/gi, '').replaceAll(/<p>|<\/p>/gi, '')}</div> */}
        <div>
        {
            episode.enclosureType && <AudioPlayer  audioRef = {audioRef} enclosureType={episode.enclosureType} enclosureUrl={episode.enclosureUrl} />
        }
        </div>
    </div>
  )
}
