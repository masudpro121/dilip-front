import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuthor, getEpisodeDetails, getDefaultTranscription, getAITranscription } from "../../apis/server";
import { useState } from "react";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import { useRef } from "react";
import "./episodeDetails.css"
import getPrettyTime from "../../utils/getPrettyTime";
export default function EpisodeDetails() {
  const audioRef = useRef(null);
  const { feedId, episodeId } = useParams();
  const [ author, setAuthor ] = useState({});
  const [episode, setEpisode] = useState({});
  const [transcription, setTranscription] = useState({});
  const [count, setCount] = useState(1);
  useEffect(() => {
    getEpisodeDetails(feedId, episodeId)
      .then((res) => res.json())
      .then((res) => {
        setEpisode(res.data);
      });
  }, []);

  useEffect(() => {
   if(episode.transcriptUrl && count==1){
    setCount(count+1)
    getDefaultTranscription(episode.transcriptUrl)
    .then(res=>res.json())
    .then(res=>{
      setTranscription(res.data)
    })
   }

   console.log(transcription, 'trans');
   if(!episode.transcriptUrl && episode.enclosureUrl && count==1){
    setCount(count+1)
    getAITranscription(episode.enclosureUrl)
    .then(res=>res.json())
    .then(res=>{
      setTranscription(res.data)
    })
   }
  }, [episode]);

 

  console.log(transcription);
  
  console.log(episode);
  return (
    <div>
      {episode.id  &&  (
        <div>
          <h3>{episode.title}</h3>
          <div className="d-flex align-items-center">
            <div>
              <img
                style={{ width: "80px" }}
                src={episode.persons[0].img}
                alt=""
              />
            </div>
            <div>
              <p>{episode.persons[0].name}</p>
            </div>
          </div>
          <p>Released: {episode.datePublishedPretty}</p>
          <p>Duration: {getPrettyTime(episode.duration)}</p>
          {/* <div>{episode.description.replace(/(<p>Visit).*(<\/p>)/gi, '').replaceAll(/<p>|<\/p>/gi, '')}</div> */}
          <div>
            {episode.enclosureType && (
              <AudioPlayer
                audioRef={audioRef}
                enclosureType={episode.enclosureType}
                enclosureUrl={episode.enclosureUrl}
              />
            )}
          </div>
          <div>
            <pre>{transcription.summarize}</pre>
            <pre>{transcription.keyInsights}</pre>
            <pre>{transcription.details}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
