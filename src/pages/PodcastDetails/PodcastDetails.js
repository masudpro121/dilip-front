import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getEpisodes } from '../../apis/server'
import { useState } from 'react'
import Episode from '../../components/Episode/Episode'
import withNavbar from '../../hocs/withNavbar'

 function PodcastDetails() {
    const [episodes, setEpisodes] = useState([])
    const [podcast, setPodcast] = useState({})
    const {id} = useParams()
    useEffect(()=>{
        getEpisodes(id)
        .then(res=>res.json())
        .then(res=>{
            console.log(res.data, 'episodes');
            setEpisodes(res.data.items)
            setPodcast(res.data.podcast)
        })
    },[])
  return (
    <div>
        {
            episodes.map(episode=>{
                return (
                    <div key={episode.id}>
                        <Episode episode={episode} podcast={podcast} />
                    </div>

                )
            })
        }
    </div>
  )
}

export default withNavbar(PodcastDetails)