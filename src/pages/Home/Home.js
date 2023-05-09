import React, { useEffect } from 'react'
import withNavbar from '../../hocs/withNavbar'
import './home.css'
import { getPodcasts } from '../../apis/server'
import { useContext } from 'react'
import { MyContext } from '../../App'
import Podcast from '../../components/Podcast/Podcast'

function Home() {
  const {podcasts, setPodcasts} = useContext(MyContext)
  console.log(podcasts);
  useEffect(()=>{
    getPodcasts()
    .then(res=>res.json())
    .then(res=>{
      setPodcasts(res.data.feeds)
    })
  },[])
  return (
    <div className='home'>
      {
        podcasts.map(podcast=>{
          return (
            <div key={podcast.id}>
              <Podcast data={podcast} />
            </div>
          )
        })
      }
    </div>
  )
}

export default withNavbar(Home)