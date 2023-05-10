import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getEpisodes } from '../../apis/server'
import { useState } from 'react'
import Episode from '../../components/Episode/Episode'

export default function PodcastDetails() {
    const [episodes, setEpisodes] = useState([])
    const {id} = useParams()
    useEffect(()=>{
        getEpisodes(id)
        .then(res=>res.json())
        .then(res=>{
            setEpisodes(res.data.items)
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
