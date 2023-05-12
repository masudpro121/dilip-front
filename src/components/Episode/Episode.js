import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import "./episode.css";
import getPrettyTime from "../../utils/getPrettyTime";

export default function Episode({ data }) {
  const audioRef = useRef(null);
  const description = data.description
    .replace(/(<p>Visit).*(<\/p>)/gi, "")
    .replaceAll(/<h2>|<\/h2>|<br\/>|<p>|<\/p>/gim, "")
    .slice(0,250)
  return (
    <div className="episode">
        <div className="section1">
         {
          data.persons &&
          <div className="person">
            <img  src={data.persons[0].img} alt="" />
            <div>
              <p>{data.persons[0].name}</p>
              <p>{data.persons[0].role}</p>
            </div>
          </div>
         }
         <div>
          <h5>{data.title}</h5>
         </div>
        </div>
        <div className="section2">
          <div>
            <img  src={data.image} alt="" />
          </div>
          <div>
            <Link to={"/podcast/episode/" + data.feedId + "/" + data.id}>
              <div className="mt-2">{description}...</div>
              <div className="mt-3">{getPrettyTime(data.duration)}</div>
            </Link>
            {/* <div>
              <AudioPlayer
                audioRef={audioRef}
                enclosureType={data.enclosureType}
                enclosureUrl={data.enclosureUrl}
              />
            </div> */}
          </div>
        </div>
    </div>
  );
}
