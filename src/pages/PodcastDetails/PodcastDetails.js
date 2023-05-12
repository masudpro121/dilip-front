import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getEpisodes } from '../../apis/server'
import { useState } from 'react'
import Episode from '../../components/Episode/Episode'
import withNavbar from '../../hocs/withNavbar'

 function PodcastDetails() {
    const [episodes, setEpisodes] = useState([])
    const {id} = useParams()
    useEffect(()=>{
        getEpisodes(id)
        .then(res=>res.json())
        .then(res=>{
            console.log(res.data, 'episodes');
            setEpisodes(res.data)
        })
    },[])
  return (
    <div>
        {
            episodes.map(episode=>{
                return (
                    <div key={episode.id}>
                        <Episode data={episode} />
                    </div>

                )
            })
        }
    </div>
  )
}

export default withNavbar(PodcastDetails)