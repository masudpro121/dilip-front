import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import "./summarizeModal.css";
import { getSummary } from "../../apis/server";
import { cancelSpeak, speak } from "../../utils/speak";
import { CgEreader } from "react-icons/cg";
import formatTime from "../../utils/formatTime";
import ListenImg from "../../assets/img/listen2.png";
import SummarizeImg from "../../assets/img/summarize.png";
import ReadMoreImg from "../../assets/img/readmore.png";
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
              <div className="listen">
                <div>
                  <img src={ListenImg} style={{ width: "30px" }} />
                </div>
                <div>
                  <p style={{ fontWeight: "500" }}>Listen to this section</p>
                  <p>{formatTime(text.endTime)} </p>
                </div>
              </div>
              <div>
                <div className="btns">
                  <div className="summarizeBtn">
                    <img style={{ width: "20px" }} src={SummarizeImg} alt="" />
                    <div onClick={handleSummary}>Summarize</div>
                  </div>
                  <div className="readmoreBtn">
                    <img style={{width:'20px'}} src={ReadMoreImg} alt="" />
                    <div style={{color:'black'}} onClick={handleReadMore}>Read More</div>
                  </div>
                </div>
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
