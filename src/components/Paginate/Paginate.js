import React, { useEffect } from 'react'
import { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import "./paginate.css"
import { useContext } from 'react';
import { MyContext } from '../../App';

function Paginate({totalPage}) {
  const {currentProjectPage, setCurrentProjectPage} = useContext(MyContext)
  const handlePageChange = (pageNumber) => {
    if(pageNumber>=1 && pageNumber<=totalPage){
      setCurrentProjectPage(pageNumber)
    }
  }
  const prevPages = [currentProjectPage-5, currentProjectPage-4, currentProjectPage-3, currentProjectPage-2, currentProjectPage-1]
  const nextPages = [currentProjectPage+1, currentProjectPage+2, currentProjectPage+3, currentProjectPage+4, currentProjectPage+5]
  return (
        <Pagination size="sm">
            <Pagination.First onClick={() => handlePageChange(1)} />
            <Pagination.Prev onClick={() => handlePageChange(currentProjectPage-1)} />
            {
              prevPages.map(p=>{
                return p>=1 &&  <Pagination.Item key={p+Math.random()*999999} onClick={() => handlePageChange(p)} >{p}</Pagination.Item>
              })
            }
            <Pagination.Item onClick={() => handlePageChange(currentProjectPage)} active={true}>
              {currentProjectPage}</Pagination.Item>
            {
              nextPages.map(p=>{
                return p<=totalPage && <Pagination.Item key={p+Math.random()*999999} onClick={() => handlePageChange(p)} >{p}</Pagination.Item>
              })
            }
            <Pagination.Next onClick={() => handlePageChange(currentProjectPage+1)}/>
            <Pagination.Last onClick={() => handlePageChange(totalPage)}/>
        </Pagination>
  )
}

export default Paginate





