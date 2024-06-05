import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import "./Styles/PersonaChat.css";

export default function PersonaChat({ userInfo, personaInfo }) {
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const chatEndRef = useRef(null);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const sendMessage = useCallback(
    async (message = userInput) => {
      if (!message.trim() || isSending) return;
      setUserInput("");
      setIsSending(true);
      setChat([...chat, { text: "You: " + message, sender: "you" }]);
      console.log(message);
      setTimeout(() => {
        setIsTyping(true);
      }, 1500);

      try {
        const response = await axios.post("/send", { message });
        setIsTyping(false);
        setIsSending(false);
        const replies = response.data.map((msg) => ({
          text: "Bot: " + msg.text,
          sender: "bot",
        }));
        setChat((currentChat) => [...currentChat, ...replies]);
        console.log(replies);
      } catch (error) {
        setIsTyping(false);
        setIsSending(false);
        console.error("Error sending message:", error);
      }
    },
    [userInput, chat, isSending]
  );

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  useEffect(() => {
    if (!listening && transcript) {
      setUserInput(transcript);
      sendMessage(transcript);
      resetTranscript();
    }
  }, [listening, transcript, resetTranscript, sendMessage]);

  const toggleMic = () => {
    if (isMicOn) {
      SpeechRecognition.stopListening();
      console.log("마이크 활성화!");
    } else {
      SpeechRecognition.startListening({ continuous: true });
      console.log("마이크 비활성화!!");
    }
    setIsMicOn(!isMicOn);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const isDisabled = !userInfo || !personaInfo;

  return (
    <>
      {!isDisabled && (
        <div
          className={`micContainer ${isMicOn && listening ? "shaking" : ""}`}
          onClick={toggleMic}
        >
          {isMicOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
        </div>
      )}
      <div className="chatbox">
        {isDisabled && (
          <div className="tutorialContainer">
            <h1>시스템 튜토리얼</h1>
            <h3>1. 대화할 페르소나의 정보와 나의 정보를 입력하세요! </h3>
            <small>* 자세할수록 좋아요</small>
            <h3>2. 페르소나의 사진과 나의 사진을 넣어보세요! </h3>
            <small>* 넣지않으면 기본사진으로 설정되요</small>
            <h3>3. 설정완료 버튼을 눌러서 대화를 시작해요!</h3>
            <small>
              * 대화 시작후 상단에 마이크 버튼을 누르면 마이크로 대화가
              가능해요!
            </small>
            <h3>
              4. 대화가 끝나면 종료버튼을 눌러서 나의 대화법에 대한 피드백을
              들어요!
            </h3>
          </div>
        )}
        {chat.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isTyping && <div className="message bot typing">입력중 ..</div>}
        <div ref={chatEndRef} />
      </div>
      <div className="inputbox">
        <input
          className="userInput"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="입력하기..."
          disabled={isDisabled || isSending}
        />
        <button
          className="sendButton"
          onClick={() => sendMessage()}
          disabled={isDisabled || isSending}
        >
          보내기
        </button>
      </div>
    </>
  );
}
