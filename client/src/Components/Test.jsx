import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './css/Test.css';

function Test() {
  const [userInput, setUserInput] = useState('');
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);  
  const chatEndRef = useRef(null);  

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]);

  const sendMessage = () => {
    if (!userInput.trim() || isSending) return;
    const message = userInput;
    setUserInput('');
    setIsSending(true); 
    setChat([...chat, { text: 'You: ' + message, sender: 'you' }]);
    console.log(message);
    setTimeout(() => {
      setIsTyping(true);
    }, 1000);

    axios.post('/send', { message: message })
      .then(response => {
        setIsTyping(false);
        setIsSending(false);  
        const replies = response.data.map(msg => ({ text: 'Bot: ' + msg.text, sender: 'bot' }));
        setChat(currentChat => [...currentChat, ...replies]);
        console.log(replies);
      })
      .catch(error => {
        setIsTyping(false);
        setIsSending(false);  
        console.error('Error sending message:', error);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chatContainer">
      <div className="chatbox">
        {chat.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isTyping && <div className="message bot typing">입력중 ..</div>}
        <div ref={chatEndRef} />  
      </div>
      <div className='inputbox'>
        <input 
          className="userInput" 
          value={userInput} 
          onChange={(e) => setUserInput(e.target.value)} 
          onKeyDown={handleKeyDown} 
          placeholder="입력하기..." 
          disabled={isSending} 
        />
        <button className="sendButton" onClick={sendMessage} disabled={isSending}>보내기</button>
      </div>
    </div>
  );
}

export default Test;

