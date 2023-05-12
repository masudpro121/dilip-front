import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getAuthor,
  getEpisodeDetails,
  getDefaultTranscription,
  getAITranscription,
  getSummary,
} from "../../apis/server";
import { useState } from "react";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import { useRef } from "react";
import "./episodeDetails.css";
import getPrettyTime from "../../utils/getPrettyTime";
import PodcastImg from "../../assets/img/podcast.png";
import withNavbar from "../../hocs/withNavbar";
function EpisodeDetails() {
  const audioRef = useRef(null);
  const { feedId, episodeId } = useParams();
  const [episode, setEpisode] = useState({});
  // const [transcription, setTranscription] = useState({});
  const [transcription, setTranscription] = useState("");
  const [count, setCount] = useState(1);
  const [summary, setSummary] = useState('')

  useEffect(() => {
    getEpisodeDetails(feedId, episodeId)
      .then((res) => res.json())
      .then((res) => {
        setEpisode(res.data);
        
        if(res.data){
          const mydescription = res.data.description.replace(/(<p>Visit).*(<\/p>)/gi, '').replaceAll(/<p>|<\/p>/gi, '')
          getSummary(mydescription, 'short')
          .then((res) => res.json())
          .then(result=>{
            setSummary(result.data)
          })
        }

        if(res.data){
          fetch(episode.transcriptUrl)
          .then(result=>result.text())
          .then(result=>{
            setTranscription(result.replace(/^\d(.+)?/gm, "").replaceAll("\n", ""))
          })
        }
      
      });
  }, []);
console.log(episode);

  // useEffect(() => {
  //   if (episode.transcriptUrl && count == 1) {
  //     setCount(count + 1);
  //     getDefaultTranscription(episode.transcriptUrl)
  //       .then((res) => res.json())
  //       .then((res) => {
  //         setTranscription(res.data);
  //       });
  //   }

  //   console.log(transcription, "trans");
  //   if (!episode.transcriptUrl && episode.enclosureUrl && count == 1) {
  //     setCount(count + 1);
  //     getAITranscription(episode.enclosureUrl)
  //       .then((res) => res.json())
  //       .then((res) => {
  //         setTranscription(res.data);
  //       });
  //   }
  // }, [episode]);


  return (
    <div className="episodeDetails">
      {episode.id && (
        <div>
          
          <div className="d-flex align-items-center">
            <div>
              {episode.persons ? (
                <img
                  style={{ width: "80px" }}
                  src={episode.persons[0].img}
                  alt=""
                />
              ) : (
                <img style={{ width: "80px" }} src={PodcastImg} alt="" />
              )}
            </div>
            <div>
              <p>{episode.podcast.title}</p>
              <p>{episode.persons ? episode.persons[0].name : "Artist Name"}</p>
            </div>
          </div>
          <p>Released: {episode.datePublishedPretty}</p>
          <p>Duration: {getPrettyTime(episode.duration)}</p>
          {/* <div>{episode.description.replace(/(<p>Visit).*(<\/p>)/gi, '').replaceAll(/<p>|<\/p>/gi, '')}</div> */}
          <h3>{episode.title}</h3>
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
            <pre>{summary}</pre>
            <pre>{transcription}</pre>
            {/* <pre>{transcription.details}</pre> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default withNavbar(EpisodeDetails);
