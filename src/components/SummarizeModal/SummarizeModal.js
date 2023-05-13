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
        getSummary(text, opt)
        .then(res=>res.json())
        .then(res=>{
            console.log(res, 'res');
            setSummary({...summary, [opt]:res.data})
        })
    }
    const handleClose = () => setShow(false);
    const handleReadMore = () => {
        setShow(true)
        setOption('short')
        summaryIt(option)
    };
    const handleSummary = () => {
        setShow(true)
        setOption('little')
        summaryIt('little')
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
                <button onClick={handleReadMore} className='readmore'>Read More</button>
                <button onClick={handleSummary} className='summary mx-2'>Summarize</button>
                </div>
            </div>
        </div>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header >
            <div>{text.split(' ').slice(0,15).join(' ')}. . .</div>
            <div>
                <select  onChange={e=>handleChangeOption(e.target.value)}>
                    <option selected={option=="little"} value="little">Summarize</option>
                    <option selected={option=="short"} value="short">Short</option>
                    <option selected={option=="medium"} value="medium">Medium</option>
                    <option selected={option=="large"} value="large">Long</option>
                </select>
            </div>
        </Modal.Header>
        <Modal.Body>
                {option=='little'&& <div>{summary["little"]}</div>}
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
