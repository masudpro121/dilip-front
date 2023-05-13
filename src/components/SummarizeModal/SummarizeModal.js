import React from 'react'
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import "./summarizeModal.css"
import { getSummary } from '../../apis/server';

export default function SummarizeModal({text, myclass}) {
    const [show, setShow] = useState(false);
    const [option, setOption] = useState('short');
    const [summary, setSummary] = useState({})
    console.log(summary);
    const summaryIt = (opt) =>{
        console.log('sum');
        getSummary(text, option)
        .then(res=>res.json())
        .then(res=>{
            setSummary({...summary, [opt]:res.data})
        })
    }
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
        summaryIt(option)
    };

    const handleChangeOption = (op) =>{
        setOption(op)
        summaryIt(op)
    }
    
  return (
    <div className='summarizeModal'>
        <div className={myclass}>
            <div>
                <div>
                <div>
                    <small>{text}</small>
                </div>
                <button onClick={handleShow} className='readmore'>Read More</button>
                </div>
            </div>
        </div>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <div>{text}</div>
            <div>
                <select onChange={e=>handleChangeOption(e.target.value)}>
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="large">Long</option>
                </select>
            </div>
        </Modal.Header>
        <Modal.Body>
                {option=='short'&& <div>{summary["short"]}</div>}
                {option=='medium' && <div>{summary["medium"]}</div>}
                {option=='large' && <div>{summary["large"]}</div>}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
