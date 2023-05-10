import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuthor, getEpisodeDetails, getTranscription } from "../../apis/server";
import { useState } from "react";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import { useRef } from "react";

export default function EpisodeDetails() {
  const audioRef = useRef(null);
  const { feedId, episodeId } = useParams();
  const [ author, setAuthor ] = useState({});
  const [episode, setEpisode] = useState({});
  const [transcription, setTranscription] = useState("");
  useEffect(() => {
    getEpisodeDetails(feedId, episodeId)
      .then((res) => res.json())
      .then((res) => {
        setEpisode(res.data);
      });
  }, []);

  useEffect(() => {
   if(episode.id){
    getTranscription(episode.transcriptUrl, episode.enclosureUrl)
    .then(res=>res.json())
    .then(res=>{
      setTranscription(res.data)
    })
   }
  }, [episode]);

  useEffect(() => {
    getAuthor(feedId)
      .then((res) => res.json())
      .then((res) => {
        setAuthor(res.data);
      });
  }, []);

  const getPrettyMinute = (seconds) => {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;
    let timeString = "";
    if (seconds > 3600) {
      timeString = `${hours}hr ${minutes}min ${remainingSeconds}s`;
    } else if (seconds > 60) {
      timeString = `${minutes}min ${remainingSeconds}s`;
    } else {
      timeString = `${remainingSeconds}s`;
    }
    return timeString;
  };
  return (
    <div>
      {episode.id && author.id &&  (
        <div>
          <h3>{episode.title}</h3>
          <div className="d-flex align-items-center">
            <div>
              <img
                style={{ width: "80px" }}
                src={author.image}
                alt=""
              />
            </div>
            <div>
              <p>{author.author}</p>
              <p>{author.title}</p>
            </div>
          </div>
          <p>Released: {episode.datePublishedPretty}</p>
          <p>Duration: {getPrettyMinute(episode.duration)}</p>
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
            {transcription}
          </div>
        </div>
      )}
    </div>
  );
}
