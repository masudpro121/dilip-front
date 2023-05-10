import React from 'react'
import { Link } from 'react-router-dom'

export default function Podcast({data}) {
  return (
    <Link to={"/podcast/"+data.id}>
        <img style={{width:'100px', height:'100px'}} src={data.image} alt="" />
        <h3>{data.title}</h3>
        <p>{data.description}</p>
    </Link>
  )
}
