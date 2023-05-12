import React from "react";
import { Link } from "react-router-dom";
import "./podcast.css";

export default function Podcast({ data }) {
 
  return (
    <div className="podcast">
      <div className="item">
        <div>
          <img
            style={{ width: "100px", height: "100px" }}
            src={data.image}
            alt=""
          />
        </div>
        <div>
          <Link to={"/podcast/" + data.id}>
            <h5>{data.title}</h5>
            <p className="mt-2">{data.description.slice(0, 250)}...</p>
          </Link>
          <div className="categories">
           {
            Object.values(data.categories).map((category, id)=>{
              return (
                <small key={category+id}>#{category}</small>
              )
            })
           }
          </div>
        </div>
      </div>
    </div>
  );
}
