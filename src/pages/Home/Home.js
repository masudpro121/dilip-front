import React from 'react'
import withNavbar from '../../hocs/withNavbar'
import './home.css'
import SpeakIt from '../../components/SpeakIt/SpeakIt'
import RssFeed from '../../components/RssFeed/RssFeed'

function Home() {
  
  
  return (
    <div className='home'>
      <SpeakIt />
      <RssFeed />
    </div>
  )
}

export default withNavbar(Home)