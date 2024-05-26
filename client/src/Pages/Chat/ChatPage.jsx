import React from "react";
import Header from "../../Layouts/Header/Header";
import {
  UserContainer,
  PersonaContainer,
} from "../../Components/SettingContainer/SettingContainer.jsx";
import Test from "../../Components/Test.jsx";
import "./Styles/Chat.css";

export default function ChatPage() {
  return (
    <>
      <Header />
      <div className="mainChatContainer">
        <PersonaContainer />
        <div className="chatContainer">
          <Test />
        </div>
        <UserContainer />
      </div>
    </>
  );
}
