import React from "react";
import "./Styles/SettingContainer.css";

export const UserContainer = ({ userSettings }) => {
  return (
    <div className="settingContainer">
      <div className="profile">
        <h1>{userSettings.profileTitle}</h1>
        <p>이름: {userSettings.name}</p>
        <p>성별: {userSettings.gender}</p>
        <p>{userSettings.class}</p>
      </div>
      <div className="setting">
        <h1>{userSettings.settingTitle}</h1>
      </div>
      <div className="settingBtn">
        <button className="addBtn">{userSettings.buttonText}</button>
      </div>
    </div>
  );
};

export const PersonaContainer = ({ personaSettings }) => {
  return (
    <div className="settingContainer">
      <div className="profile">
        <h1>{personaSettings.profileTitle}</h1>
        <p>이름: {personaSettings.name}</p>
        <p>성별: {personaSettings.gender}</p>
        <p>{personaSettings.class}</p>
      </div>
      <div className="setting">
        <h1>{personaSettings.settingTitle}</h1>
      </div>
      <div className="settingBtn">
        <button className="addBtn">{personaSettings.buttonText}</button>
      </div>
    </div>
  );
};
