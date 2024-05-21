import React from "react";
import Header from "../../Layouts/Header/Header";
import SettingContainer from "../../Components/SettingContainer/SettingContainer.jsx";
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
    title: "페르소나 설정",
    profileTitle: "페르소나 머리",
    settingTitle: "페르소나 설정",
    buttonText: "버튼2",
    name: "페르소나 이름",
    gender: "여성",
  };

  return (
    <>
      <Header />
      <div className="mainChatContainer">
        <SettingContainer settings={userSettings} />
        <div className="chatContainer">
          <h1>채팅</h1>
        </div>
        <SettingContainer settings={personaSettings} />
      </div>
    </>
  );
}
