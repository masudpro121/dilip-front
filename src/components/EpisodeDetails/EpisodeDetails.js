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
    console.log(episode);
    const getPrettyMinute =(seconds) => {
      let hours = Math.floor(seconds / 3600);
      let minutes = Math.floor((seconds % 3600) / 60);
      let remainingSeconds = seconds % 60;
      let timeString = ''
      if(seconds>3600){
        timeString = `${hours}hr ${minutes}min ${remainingSeconds}s`;
      }else if(seconds>60){
        timeString =`${minutes}min ${remainingSeconds}s`;
      }else{
        timeString =`${remainingSeconds}s`;
      }
      return timeString;
    }
  return (
    <div>
         <h3>{episode.title}</h3>
         <div className="d-flex align-items-center">
          <div>
            <img style={{width:'80px'}} src={episode.podcast.image} alt="" />
          </div>
          <div>
            <p>{episode.podcast.author}</p>
            <p>{episode.podcast.title}</p>
          </div>
         </div>
         <p>Released: {episode.datePublishedPretty}</p>
         <p>Duration: {getPrettyMinute(episode.duration)}</p>
        {/* <div>{episode.description.replace(/(<p>Visit).*(<\/p>)/gi, '').replaceAll(/<p>|<\/p>/gi, '')}</div> */}
        <div>
        {
            episode.enclosureType && <AudioPlayer  audioRef = {audioRef} enclosureType={episode.enclosureType} enclosureUrl={episode.enclosureUrl} />
        }
        </div>
    </div>
  )
}
