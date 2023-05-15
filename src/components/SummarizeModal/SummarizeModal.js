import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import "./summarizeModal.css";
import { getSummary } from "../../apis/server";
import { cancelSpeak, speak } from "../../utils/speak";
import { CgEreader } from "react-icons/cg";
import formatTime from "../../utils/formatTime";

export default function SummarizeModal({ text, myclass }) {
  const [show, setShow] = useState(false);
  const [option, setOption] = useState("short");

  const handleClose = () => {
    setShow(false);
    cancelSpeak();
  };
  const handleReadMore = () => {
    setShow(true);
    handleChangeOption("medium");
  };
  const handleSummary = () => {
    setShow(true);
    handleChangeOption("short");
  };

  const handleChangeOption = (op) => {
    setOption(op);
    cancelSpeak();
  };
  const handlePlay = () => {
    speak(text[option]);
  };
  return (
    <div className="summarizeModal">
      <div className={myclass}>
        <div>
          <div>
            <div>
              <small>{text[option]}</small>
            </div>

            <div className="hov">
              <div >
                <p>{formatTime(text.endTime)} </p>
              </div>
              <div >
                <button onClick={handleReadMore}>
                    Read More
                </button>
                <button onClick={handleSummary} >
                    Summarize
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header >
            <div>{text.headline.split(' ').slice(0,15).join(' ')}. . .</div>
            <div style={{width:'100%', display:'flex', justifyContent:'flex-end'}}>
                <select  defaultValue={option} onChange={e=>handleChangeOption(e.target.value)}>
                    <option  value="short">Short</option>
                    <option  value="medium">Medium</option>
                    <option value="large">Long</option>
                </select>
            </div>
        </Modal.Header>
        <Modal.Body>
                {option=='short'&& <div>{text.short}</div>}
                {option=='medium' && <div>{text.medium}</div>}
                {option=='large' && <div>{text.large}</div>}
        </Modal.Body>
        <Modal.Footer>
          <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
            <button onClick={handlePlay}>
                Play
            </button>
            <button onClick={handleClose}>
                Close
            </button>
          </div>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
}
