import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getAuthor,
  getEpisodeDetails,
  getAITranscription,
  getSummary,
  getTranscriptionByUrl,
  getDetailsTranscription,
} from "../../apis/server";
import { useState } from "react";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import { useRef } from "react";
import "./episodeDetails.css";
import getPrettyTime from "../../utils/getPrettyTime";
import PodcastImg from "../../assets/img/podcast.png";
import withNavbar from "../../hocs/withNavbar";
import ListenImg from "../../assets/img/listen.png";
import { CgEreader } from "react-icons/cg";
import SummarizeModal from "../SummarizeModal/SummarizeModal";

function EpisodeDetails() {
  const audioRef = useRef(null);
  const { feedId, episodeId } = useParams();
  const [episode, setEpisode] = useState({});
  // const [transcription, setTranscription] = useState({});
  const [transcription, setTranscription] = useState("");
  const [count, setCount] = useState(1);
  const [summary, setSummary] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const formatDescription = (text) => {
    return text
      .replace(/(<p>Visit).*(<\/p>)/gi, "")
      .replaceAll(/<p>|<\/p>/gi, "");
  };
  useEffect(() => {
    getEpisodeDetails(feedId, episodeId)
      .then((res) => res.json())
      .then((res) => {
        setEpisode(res.data);

        if (res.data) {
          const mydescription = formatDescription(res.data.description);
          getSummary(mydescription, "short")
            .then((res) => res.json())
            .then((result) => {
              setSummary(result.data);
            });
        }
      });
  }, []);
  useEffect(() => {
    if (episode.transcriptUrl && count == 1) {
      setCount(count + 1);
      getDetailsTranscription(episode.transcriptUrl)
        .then((result) => result.json())
        .then((result) => {
          setTranscription(result.data);
        });
    }
  }, [episode]);
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
  console.log(transcription, "tras");
  return (
    <div className="episodeDetails">
      {episode.id && (
        <div>
          <div className="mb-4">
            <div className="person">
              <div>
                {episode.persons ? (
                  <img src={episode.persons[0].img} alt="" />
                ) : (
                  <img src={PodcastImg} alt="" />
                )}
              </div>
              <div>
                <p>{episode.podcast.title}</p>
                <p>
                  {episode.persons ? episode.persons[0].name : "Artist Name"}
                </p>
              </div>
            </div>
            <h2 className="title">{episode.title}</h2>
            <div className="times">
              <p>Released: {episode.datePublishedPretty}</p>
              <p>Duration: {getPrettyTime(episode.duration)}</p>
            </div>
          </div>

          <div className="listen-section">
            {episode.enclosureType && (
              <div style={{ display: "none" }}>
                <AudioPlayer
                  audioRef={audioRef}
                  enclosureType={episode.enclosureType}
                  enclosureUrl={episode.enclosureUrl}
                />
              </div>
            )}
            <div className="reader">
              <CgEreader style={{ fontSize: "25px" }} />
              <p>12 Minute Read</p>
            </div>
            <img
              src={ListenImg}
              className="playerBtn"
              onClick={() => {
                isPlaying ? audioRef.current.pause() : audioRef.current.play();
                setIsPlaying(!isPlaying);
              }}
            ></img>
          </div>
          {/* {summary && transcription && (
            <div className="descriptions">
              <div>
                <h5 className="mb-2 mt-3">Summary:</h5>
                <p>{summary}</p>
              </div>
              <div>
                <h5 className="mb-2 mt-3">Description:</h5>
                <p> {formatDescription(episode.description)}</p>
              </div>
              <div>
                <h5 className="mb-2 mt-3">Transcription:</h5>
                <p>{transcription}</p>
              </div>
            </div>
          )} */}
          <div>
            <div className="mb-4 mt-4">
              <h5 className="mb-2">Summary:</h5>
              <small style={{marginTop:'-30px'}}>{transcription.summarize} </small>
            </div>
            <div className="keyInsights">
              <h5 className="mb-2 mt-5">Key Insights:</h5>
              {/* <pre style={{marginTop:'-30px'}}>{transcription.keyInsights}</pre> */}
              {
                transcription && transcription.keyInsights.split('\n').filter(i=>i.length).map(insight=>{
                  return <SummarizeModal text={insight} myclass="insight" /> 
                })
              }
            </div>
            <div className="details">
            {
              transcription && 
                transcription.titles.map((title, i)=>{
                  return (
                    <div >
                      <h6 className="title mt-5 mb-2">{title}</h6>
                      {/* <pre style={{marginTop:'-30px'}} className="description">{transcription.detailsOfTitles[i]}</pre> */}
                      {
                        transcription.detailsOfTitles[i].split('\n').filter(i=>i.length).map(descrip=>{
                          return <SummarizeModal text={descrip} myclass="descrip" />
                           
                        })
                      }
                    </div>
                  )
                })
            }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default withNavbar(EpisodeDetails);
