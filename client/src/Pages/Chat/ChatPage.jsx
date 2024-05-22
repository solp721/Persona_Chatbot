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
    profileTitle: "머리",
    settingTitle: "설정",
    buttonText: "버튼1",
    name: "사용자 이름",
    gender: "남성",
  };

  const personaSettings = {
    title: "사용자 설정",
    profileTitle: "페르소나",
    settingTitle: "설정",
    buttonText: "버튼1",
    name: "사용자 이름",
    gender: "남성",
  };

  return (
    <>
      <Header />
      <div className="mainChatContainer">
        <UserContainer userSettings={userSettings} />
        <div className="chatContainer">
          <Test />
        </div>
        <PersonaContainer personaSettings={personaSettings} />
      </div>
    </>
  );
}
