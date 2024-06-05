import React, { useState } from "react";
import { UserModal, PersonaModal } from "../SettingModal/SettingModal.jsx";
import "./Styles/SettingContainer.css";

export const UserContainer = ({ setUserInfo }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [userInfo, setLocalUserInfo] = useState(null);

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

  const handleUserInfoSubmit = (info) => {
    setLocalUserInfo(info);
    setUserInfo(info);
    closeModal();
  };

  return (
    <div className="settingContainer">
      <div className="profile">
        {profileImage ? (
          <img src={profileImage} alt="Profile" className="profileImage" />
        ) : (
          <div className="fileUploadContainer">
            <p className="fileUploadMessage">선택된 사진 없음</p>
            <label className="fileUploadBtn">
              사진 선택
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </label>
          </div>
        )}
      </div>
      <div className="setting">
        {userInfo ? (
          <div className="userInfoDisplay">
            <h3>사용자님의 정보입니다.</h3>
            <p>
              <strong>이름:</strong> {userInfo.name}
            </p>
            <p>
              <strong>나이:</strong> {userInfo.age}
            </p>
            <p>
              <strong>성별:</strong> {userInfo.gender}
            </p>
            <p>
              <strong>사용자와 페르소나의 관계:</strong> {userInfo.relationship}
            </p>
            <p>
              <strong>현재 문제 상황:</strong> {userInfo.currentIssue}
            </p>
            <p>
              <strong>현재 문제 상황에 대해 느끼는 감정:</strong>{" "}
              {userInfo.feelings}
            </p>
          </div>
        ) : (
          <button className="addBtn" onClick={openModal}>
            정보 추가
          </button>
        )}
      </div>
      <UserModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onSubmit={handleUserInfoSubmit}
      />
    </div>
  );
};

export const PersonaContainer = ({ setPersonaInfo }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [personaInfo, setLocalPersonaInfo] = useState(null);

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

  const handlePersonaInfoSubmit = (info) => {
    setLocalPersonaInfo(info);
    setPersonaInfo(info);
    closeModal();
  };

  return (
    <div className="settingContainer">
      <div className="profile">
        {profileImage ? (
          <img src={profileImage} alt="Profile" className="profileImage" />
        ) : (
          <div className="fileUploadContainer">
            <p className="fileUploadMessage">선택된 사진 없음</p>
            <label className="fileUploadBtn">
              사진 선택
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </label>
          </div>
        )}
      </div>
      <div className="setting">
        {personaInfo ? (
          <div className="personaInfoDisplay">
            <h3>페르소나의 정보입니다.</h3>
            <p>
              <strong>이름:</strong> {personaInfo.name}
            </p>
            <p>
              <strong>나이:</strong> {personaInfo.age}
            </p>
            <p>
              <strong>성별:</strong> {personaInfo.gender}
            </p>
            <p>
              <strong>성격:</strong> {personaInfo.personality}
            </p>
            <p>
              <strong>나와 대화할 때 스타일:</strong> {personaInfo.style}
            </p>
          </div>
        ) : (
          <button className="addBtn" onClick={openModal}>
            정보 추가
          </button>
        )}
      </div>
      <PersonaModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onSubmit={handlePersonaInfoSubmit}
      />
    </div>
  );
};
