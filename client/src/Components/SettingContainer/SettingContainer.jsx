import React, { useState } from "react";
import { UserModal, PersonaModal } from "../SettingModal/SettingModal.jsx";
import "./Styles/SettingContainer.css";

export const UserContainer = ({ userSettings }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="settingContainer">
      <div className="profile">
        <h1>{userSettings.profileTitle}</h1>
        <p>{userSettings.class}</p>
      </div>
      <div className="setting">
        <button className="addBtn" onClick={openModal}>
          {userSettings.buttonText}
        </button>
      </div>
      <UserModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
};

export const PersonaContainer = ({ personaSettings }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="settingContainer">
      <div className="profile">
        <h1>{personaSettings.profileTitle}</h1>
        <p>{personaSettings.class}</p>
      </div>
      <div className="setting">
        <button className="addBtn" onClick={openModal}>
          {personaSettings.buttonText}
        </button>
      </div>
      <PersonaModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
};
