import React from "react";
import "./Styles/SettingContainer.css";

export default function SettingContainer({ settings }) {
  return (
    <div className="settingContainer">
      <div className="profile">
        <h1>{settings.profileTitle}</h1>
        <p>이름: {settings.name}</p>
        <p>성별: {settings.gender}</p>
      </div>
      <div className="setting">
        <h1>{settings.settingTitle}</h1>
      </div>
      <div className="settingBtn">
        <button>{settings.buttonText}</button>
      </div>
    </div>
  );
}
