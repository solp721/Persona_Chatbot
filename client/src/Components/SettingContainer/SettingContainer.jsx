import React, { useState } from "react";
import { UserModal, PersonaModal } from "../SettingModal/SettingModal.jsx";
import "./Styles/SettingContainer.css";

export const UserContainer = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="settingContainer">
      <div className="profile">
        {profileImage ? (
          <img src={profileImage} alt="Profile" className="profileImage" />
        ) : (
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        )}
      </div>
      <div className="setting">
        <button className="addBtn" onClick={openModal}></button>
      </div>
      <UserModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
};

export const PersonaContainer = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="settingContainer">
      <div className="profile">
        {profileImage ? (
          <img src={profileImage} alt="Profile" className="profileImage" />
        ) : (
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        )}
      </div>
      <div className="setting">
        <button className="addBtn" onClick={openModal}></button>
      </div>
      <PersonaModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
};
