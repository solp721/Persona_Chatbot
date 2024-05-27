import React, { useState } from "react";
import Header from "../../Layouts/Header/Header";
import {
  UserContainer,
  PersonaContainer,
} from "../../Components/SettingContainer/SettingContainer.jsx";
import Chat from "../../Components/ChatContainer/PersonaChat.jsx";
import "./Styles/Chat.css";

export default function ChatPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [personaInfo, setPersonaInfo] = useState(null);

  return (
    <>
      <Header />
      <div className="mainChatContainer">
        <PersonaContainer setPersonaInfo={setPersonaInfo} />
        <div className="chatContainer">
          <Chat userInfo={userInfo} personaInfo={personaInfo} />
        </div>
        <UserContainer setUserInfo={setUserInfo} />
      </div>
    </>
  );
}
