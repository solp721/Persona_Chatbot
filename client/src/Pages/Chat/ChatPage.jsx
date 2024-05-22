import React from "react";
import Header from "../../Layouts/Header/Header";
import {
  UserContainer,
  PersonaContainer,
} from "../../Components/SettingContainer/SettingContainer.jsx";
import Test from "../../Components/Test.jsx";
import "./Styles/Chat.css";

export default function ChatPage() {
  const userSettings = {
    title: "사용자 설정",
    profileTitle: "사용자",
    settingTitle: "설정",
    buttonText: "버튼1",
  };

  const personaSettings = {
    title: "사용자 설정",
    profileTitle: "페르소나",
    settingTitle: "설정",
    buttonText: "버튼1",
  };

  return (
    <>
      <Header />
      <div className="mainChatContainer">
        <PersonaContainer personaSettings={personaSettings} />
        <div className="chatContainer">
          <Test />
        </div>
        <UserContainer userSettings={userSettings} />
      </div>
    </>
  );
}
