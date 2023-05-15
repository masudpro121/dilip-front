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
  const [transcriptions, setTranscriptions] = useState([]);
  const [count, setCount] = useState(1);
  const [summary, setSummary] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [textLength, setTextLength] = useState(0);
  const formatDescription = (text) => {
    return text
      .replace(/(<p>Visit).*(<\/p>)/gi, "")
      .replaceAll(/<p>|<\/p>/gi, "");
  };

  console.log(episode, 'episode');
  useEffect(() => {
    getEpisodeDetails(feedId, episodeId)
      .then((res) => res.json())
      .then((res) => {
        setEpisode(res.data);
      });
  }, []);

  useEffect(() => {
    if (episode.enclosureUrl && count == 1) {
      setCount(count + 1);
      getAITranscription(episode.enclosureUrl)
        .then((res) => res.json())
        .then((res) => {
          console.log(res.data, 'original response');
          const formattedTranscriptions = res.data.map((transcription, index)=>{
            if(transcription.endTime>10){
              return {
                headline: transcription.text.match(/^(<Headline>)(.+)(<\/Headline>$)/gm)[0].replaceAll(/(<Headline>)|(<\/Headline>)/g, ''),
                summarize: transcription.text.match(/^(<Summarize>)(.+)(<\/Summarize>$)/gm)[0].replaceAll(/(<Summarize>)|(<\/Summarize>)/g, ''),
                short: transcription.text.match(/^(<Short>)(.+)(<\/Short>$)/gm)[0].replaceAll(/(<Short>)|(<\/Short>)/g, ''),
                medium: transcription.text.match(/^(<Medium>)(.+)(<\/Medium>$)/gm)[0].replaceAll(/(<Medium>)|(<\/Medium>)/g, ''),
                large: transcription.text.match(/^(<Large>)(.+)(<\/Large>$)/gm)[0].replaceAll(/(<Large>)|(<\/Large>)/g, ''),
                endTime: res.data.reduce((total, current, position)=>{
                  if(index==0){
                    return 0
                  }
                  if(position<index){
                    return total  + current.endTime
                  }
                  return total
                },0)
              }
            }
          })
          setTranscriptions(formattedTranscriptions.filter(i=>i))
          const tl = formattedTranscriptions.filter(i=>i).reduce((total, current)=>{
            return total+current.summarize.length
          },0)
          setTextLength(tl)
          console.log(tl, 'text length')
        });
      }
    }, [episode]);
    
    // console.log();
    console.log(transcriptions);
  
  
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
            {
              (textLength/250)>0 && <div className="reader">
              <CgEreader style={{ fontSize: "25px" }} />
              <p>{Math.floor(textLength/250)} Minute Read</p>
            </div>
            }
            <img
              src={ListenImg}
              className="playerBtn"
              onClick={() => {
                isPlaying ? audioRef.current.pause() : audioRef.current.play();
                setIsPlaying(!isPlaying);
              }}
            ></img>
          </div>
          <div className="mt-5">
            {
              transcriptions.map((transcription, id)=>{
                return(
                  <div key={id} className="mt-4">
                    <h5 className="mb-2">{transcription.headline}</h5>
                    <SummarizeModal text={transcription}  myclass='descrip' />
                  </div>
                )
              })
            }
          </div>
          {/* <div>
            <div className="mb-4 mt-4">
              <h5 className="mb-2">Summary:</h5>
              <small style={{marginTop:'-30px'}}>{transcription.summarize} </small>
            </div>
            <div className="keyInsights">
              <h5 className="mb-2 mt-5">Key Insights:</h5>
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
                      {
                        transcription.detailsOfTitles[i] && transcription.detailsOfTitles[i].split('\n').filter(i=>i.length).map(descrip=>{
                          return <SummarizeModal text={descrip} myclass="descrip" />
                           
                        })
                      }
                    </div>
                  )
                })
            }
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
}

export default withNavbar(EpisodeDetails);
