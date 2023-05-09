import React, { useState, useEffect } from 'react';
import { xmlToJson, xmlhttprequest } from '../../utils/xml';
function RssFeed() {
  const [rssData, setRssData] = useState([]);

  useEffect(() => {

  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const targetUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCxHoBXkY88Tb8z1Ssj6CWsQ';

  fetch(targetUrl)
    .then(response => response.text())
    .then(data => {
      // fetch('http://localhost:8000/xml', {
      //   method: 'POST',
      //   headers : {
      //     'Content-Type' : 'application/json'
      //   },
      //   body: JSON.stringify({txt: data})
      // })
      // .then(result=>{
      //   console.log(result, 'result');
      // })
      console.log(data, 'cors');
    })
    .catch(error => console.error(error));
    }, []);

  return (
    <div>
      <h1>My RSS Feed</h1>
      {/* <ul>
        {rssData.map((item, index) => (
          <li key={index}>
            <a href={item.link}>{item.title}</a> - {item.pubDate}
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default RssFeed;
