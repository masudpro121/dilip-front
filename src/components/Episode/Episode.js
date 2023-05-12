import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import "./episode.css";
import getPrettyTime from "../../utils/getPrettyTime";
import { useContext } from "react";
import { MyContext } from "../../App";
import PodcastImg from '../../assets/img/podcast.png'
export default function Episode({ episode, podcast }) {
  const audioRef = useRef(null);
  const description = episode.description
    .replace(/(<p>Visit).*(<\/p>)/gi, "")
    .replaceAll(/<h2>|<\/h2>|<br\/>|<p>|<\/p>/gim, "")
    .slice(0,500)
  return (
    <div className="episode">
        <div className="section1">
          <div className="person">
            {
              episode.persons ? <img  src={episode.persons[0].img} alt="" /> 
              :<img src={PodcastImg}  alt="" /> 
            }
            <div>
              <b>{podcast.title}</b>
              {
                episode.persons ? <p>{episode.persons[0].name}</p>
                : <p>Artist Name</p>
              }
            </div>
          </div>
         <div>
          <h5>{episode.title}</h5>
          <div className="d-flex gap-3">
            <p>Release on: {episode.datePublishedPretty}</p>
            <p>Duration: {getPrettyTime(episode.duration)}</p>
          </div>
         </div>
        </div>
        <div className="section2">
          <div>
            <img  src={episode.image} alt="" />
          </div>
          <div>
            <Link to={"/podcast/episode/" + episode.feedId + "/" + episode.id}>
              <div className="mt-2">{description}...</div>
            </Link>
            {/* <div>
              <AudioPlayer
                audioRef={audioRef}
                enclosureType={episode.enclosureType}
                enclosureUrl={episode.enclosureUrl}
              />
            </div> */}
          </div>
        </div>
    </div>
  );
}
