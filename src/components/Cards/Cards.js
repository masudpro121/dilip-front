import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";
import "./cards.css";
import wordwrap from "wordwrap";
import { MyContext } from "../../App";

function Card({ data: { id, prompt, value } }) {
  const { outputs, setOutputs } = useContext(MyContext);
  const [show, setShow] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [val, setVal] =useState(value)
  const handleClose = () =>{
    setShow(false)
    setIsEditable(false)
    const myoutputs = outputs.map(o=>{
      if(o.id==id){
        const op = {...o, value: val}
        return op
      }else{
        return o
      }
    })
    setOutputs(myoutputs)
  };
  const handleShow = () => setShow(true);
 

  const handleEditable = () => {
    setIsEditable(true);
    setVal(value)
  }
  const shortPrompt = prompt.slice(0, 100);
  const shortValue = value?.slice(0, 150);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    handleClose();
    toast.success("Copied! " + prompt.split(" ").slice(0, 3).join(" ") + "...");
  };
  const handleDelete = (cardId, e) => {
    e.stopPropagation();
    const filtered = outputs.filter((i) => i.id != cardId);
    setOutputs(filtered);
  };

  return (
    value && (
      <>
        {/* <div className='mycard' onClick={handleShow}>
            <div className='s-prompt'>{shortPrompt}</div>
            <div className='s-value'  >{shortValue}</div>
            <div className="del" onClick={(e)=>handleDelete(id, e)} >
              <AiOutlineDelete />
            </div>
          </div> */}

        <div className="c-card">
          <div className="c-bg"></div>
          <div className="c-content" onClick={handleShow}>
            <div className="s-prompt">{shortPrompt}</div>
            <div className="s-value">{shortValue}</div>
            <div className="del" onClick={(e) => handleDelete(id, e)}>
              <AiOutlineDelete />
            </div>
          </div>
        </div>

        <Modal
          className="mymodal"
          size="lg"
          show={show}
          onHide={handleClose}
          centered
        >
          <Modal.Body className="modal-body">
            <h5 className="modal-head">{prompt}</h5>
            <div className="modal-inner">
              {
                !isEditable && 
                <div>
                  {window.innerWidth < 527 && <pre>{wordwrap(38)(value)}</pre>}
                  {window.innerWidth > 527 && window.innerWidth < 992 && (
                    <pre>{wordwrap(55)(value)}</pre>
                  )}
                  {window.innerWidth > 991 && <pre>{wordwrap(90)(value)}</pre>}
                  <div className="mt-5">
                <div className="d-flex gap-2 flex-wrap  justify-content-end">
                  <button onClick={handleEditable}>Edit</button>
                  <button onClick={handleCopy}>Copy text</button>
                  <button onClick={handleClose}>Close</button>
                </div>
              </div>
              </div>
              }

              {
                isEditable && 
                <div className="editable">
                  <textarea onChange={e=>setVal(e.target.value)} value={val}></textarea>
                  <div className="mt-3">
                <div className="d-flex gap-2 flex-wrap  justify-content-end">
                  <button onClick={handleClose}>Close</button>
                </div>
              </div>
                </div>
              }

              
            </div>
          </Modal.Body>
        </Modal>
      </>
    )
  );
}

export default function Cards({ data }) {
  return (
    <div className="mycards">
      {data && data.map((output, id) => <Card key={id} data={output} />)}
      <ToastContainer autoClose={2000} theme="dark" />
    </div>
  );
}
