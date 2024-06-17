import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import "./Styles/PersonaChat.css";
import Modal from "react-modal";

export default function PersonaChat({ userInfo, personaInfo }) {
  const [userInput, setUserInput] = useState("");
  const [userChat, setUserChat] = useState([]);
  const [personaChat, setPersonaChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isPersonaSet, setIsPersonaSet] = useState(false);
  const [endConversationMessages, setEndConversationMessages] = useState([]);
  const [isConversationEnded, setIsConversationEnded] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);
  const chatEndRef = useRef(null);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const shouldDisplayUserMessage = (message) => {
    return !(
      message.text.includes("대화 종료") || message.text.includes("나는 이름")
    );
  };

  const shouldDisplayBotMessage = (message) => {
    return !(
      message.text.toLowerCase().includes("yes") ||
      message.text.toLowerCase().includes("피드백")
    );
  };

  const sendMessage = useCallback(
    async (message = userInput) => {
      if (!message.trim() || isSending) return;
      setUserInput("");
      setIsSending(true);
      setUserChat((currentChat) => [
        ...currentChat,
        { text: message, sender: "you" },
      ]);
      console.log("You:", message);
      setTimeout(() => {
        setIsTyping(true);
      }, 1500);

      try {
        const response = await axios.post("http://localhost:5000/send", {
          message,
          chat_history: [...userChat, ...personaChat].map((msg) => ({
            role: msg.sender === "you" ? "user" : "assistant",
            content: msg.text,
          })),
        });
        if (response.data.choices && response.data.choices.length > 0) {
          const reply = response.data.choices[0].message.content;
          setTimeout(() => {
            setIsTyping(false);
            setPersonaChat((currentChat) => [
              ...currentChat,
              { text: reply, sender: "bot" },
            ]);
          }, 2000);
          console.log("Bot:", reply);
          if (!isPersonaSet && reply.trim().toLowerCase() === "yes") {
            setIsPersonaSet(true);
          }
        } else {
          console.error("Unexpected response format:", response.data);
        }
        setIsSending(false);
      } catch (error) {
        setIsTyping(false);
        setIsSending(false);
        console.error("Error sending message:", error);
      }
    },
    [userInput, userChat, personaChat, isSending, isPersonaSet]
  );

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [userChat, personaChat]);

  useEffect(() => {
    if (!listening && transcript) {
      setUserInput(transcript);
      sendMessage(transcript);
      resetTranscript();
    }
  }, [listening, transcript, resetTranscript, sendMessage]);

  useEffect(() => {
    if (userInfo && personaInfo && !isPersonaSet) {
      const combined = {
        //
      };

      setIsLoading(true);
      setTimeout(() => {
        sendMessage(combined.message).finally(() => {
          setIsLoading(false);
        });
      }, 3000);
    }
  }, [userInfo, personaInfo, isPersonaSet, sendMessage]);

  const toggleMic = () => {
    if (isMicOn) {
      SpeechRecognition.stopListening();
      console.log("마이크 비활성화!");
    } else {
      SpeechRecognition.startListening({ continuous: true });
      console.log("마이크 활성화!");
    }
    setIsMicOn(!isMicOn);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleEndConversation = async () => {
    const endMessage = "대화 종료";
    setUserChat((currentChat) => [
      ...currentChat,
      { text: endMessage, sender: "you" },
    ]);
    setIsSending(true);
    setIsConversationEnded(true);
    setTimeout(() => {
      setIsTyping(true);
    }, 1500);
    setIsFeedbackLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/send", {
        message: endMessage,
        chat_history: [...userChat, ...personaChat].map((msg) => ({
          role: msg.sender === "you" ? "user" : "assistant",
          content: msg.text,
        })),
      });
      if (response.data.choices && response.data.choices.length > 0) {
        const reply = response.data.choices[0].message.content;
        setTimeout(() => {
          setIsTyping(false);
          setPersonaChat((currentChat) => [
            ...currentChat,
            { text: reply, sender: "bot" },
          ]);
          setIsFeedbackLoading(false);
          setShowFeedbackModal(true);
        }, 2000);
        setEndConversationMessages((currentMessages) => [
          ...currentMessages,
          reply,
        ]);
        console.log("Bot (End Conversation):", reply);
      } else {
        console.error("Unexpected response format:", response.data);
      }
      setIsSending(false);
    } catch (error) {
      setIsTyping(false);
      setIsSending(false);
      setIsFeedbackLoading(false);
      console.error("Error sending end conversation message:", error);
    }
  };

  const handleResetConversation = () => {
    window.location.reload();
  };

  const isDisabled = !userInfo || !personaInfo || !isPersonaSet || isLoading;

  const combinedChat = [];
  const maxLength = Math.max(userChat.length, personaChat.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < userChat.length) {
      combinedChat.push({ ...userChat[i], sender: "you" });
    }
    if (i < personaChat.length) {
      combinedChat.push({ ...personaChat[i], sender: "bot" });
    }
  }

  return (
    <>
      {!isDisabled && !isConversationEnded && (
        <button
          className="endConversationButton"
          onClick={handleEndConversation}
        >
          대화 종료
        </button>
      )}
      {isConversationEnded && (
        <button
          className="endConversationButton"
          onClick={handleResetConversation}
        >
          대화 초기화
        </button>
      )}
      {!isDisabled && (
        <div
          className={`micContainer ${isMicOn && listening ? "shaking" : ""}`}
          onClick={toggleMic}
        >
          {isMicOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
        </div>
      )}
      {(isLoading || isFeedbackLoading) && (
        <div className="loadingSpinner">
          <div className="spinner" />
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
        {combinedChat.map((msg, index) => {
          if (
            (msg.sender === "you" && shouldDisplayUserMessage(msg)) ||
            (msg.sender === "bot" && shouldDisplayBotMessage(msg))
          ) {
            return (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.sender === "you" ? "You: " : "Bot: "}
                {msg.text}
              </div>
            );
          }
          return null;
        })}
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

      <Modal
        isOpen={showFeedbackModal}
        onRequestClose={() => setShowFeedbackModal(false)}
        className="feedbackmodalContent"
        overlayClassName="feedbackmodal"
      >
        <h2>피드백</h2>
        {endConversationMessages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
        <button
          onClick={() => {
            setShowFeedbackModal(false);
          }}
          className="feedbackmodalbtn"
        >
          닫기
        </button>
      </Modal>
    </>
  );
}
