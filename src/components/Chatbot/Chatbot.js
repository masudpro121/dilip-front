import { useEffect, useRef, useState } from "react";
import "./chatbot.css";
import UserImg from "../../assets/img/user.png";
import BotImg from "../../assets/img/bot.jpg";
import {  BsFillFileArrowDownFill } from "react-icons/bs";
import {  AiOutlineAppstoreAdd } from "react-icons/ai";
import { createChatCompletion } from "../../apis/chatgpt";
import withNavbar from "../../hocs/withNavbar";
function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [trainedMsg, setTrainedMsg] = useState([]);
  const [inp, setInp] = useState("");
  const [saved, setSaved] = useState({});
  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + "/message/all")
      .then((res) => res.json())
      .then((res) => {
        setTrainedMsg(res.result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [saved]);
  console.log(trainedMsg, 'tr');
  const handleMessage = () => {
    const qs = inp.includes("Q:") && inp.includes("A:");
    if (!qs) {
      const currentMsg = { role: "user", content: inp };
      setMessages([...messages, currentMsg]);
      setInp("");
      console.log([...trainedMsg, currentMsg], "trai and curr");
      createChatCompletion([...trainedMsg, currentMsg])
        .then((res) => {
          setMessages([...messages, currentMsg, res.data.choices[0].message]);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    if (qs) {
      const questions = inp.split(";")
      const myMsgs=[]
      for(let i=0; i<questions.length; i++){
        const inputs = questions[i].match(/^( *?Q: .+)(?= A: ) (A: .+)/);
        const userContent = inputs[1].replace("Q: ", "");
        const assistantContent = inputs[2].replace("A: ", "");
        myMsgs.push({ role: "user", content: userContent })
        myMsgs.push({ role: "assistant", content: assistantContent })
      }
      handleSave(myMsgs);
    }
  };
  const handleSave = (data) => {
    fetch(process.env.REACT_APP_SERVER + "/message/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        setSaved(res);
        setInp("");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const contentRef = useRef(null);

  const scrollToBottom = () => {
    contentRef.current.scrollTo(0, contentRef.current.scrollHeight);
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className="chatbot">
      <div className="scroll-bottom" onClick={scrollToBottom}>
        <BsFillFileArrowDownFill />
      </div>
      <div className="content" ref={contentRef}>
        <div className="header">
          <p>AI Chatbot</p>
        </div>
        <div className="messages">
          {messages.map((msg, id) => {
            return (
              <div className="msg">
                <img src={msg.role == "assistant" ? BotImg : UserImg} alt="" />
                <p className="text">{msg.content}</p>
                {/* {
                msg.role == 'assistant' && <div className="savedb" onClick={()=>handleSave([messages[id-1], messages[id]])}>
                  <AiOutlineAppstoreAdd />
                </div>
              } */}
              </div>
              
            );
          })}
        </div>
        <div className="inputField">
          <input
            onChange={(e) => setInp(e.target.value)}
            onKeyDown={(e)=>{
              if(e.code=="Enter"){
                handleMessage()
              }
            }}
            value={inp}
            type="text"
            placeholder="type your message"
          />
          <button onClick={handleMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default withNavbar(Chatbot);
