import React, { useState } from "react";
import Modal from "react-modal";
import "./Styles/Modal.css";

Modal.setAppElement("#root");

export const UserModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userRelationship, setUserRelationship] = useState("");
  const [userCurrentIssue, setUserCurrentIssue] = useState("");
  const [userFeelings, setUserFeelings] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      userName,
      userAge,
      userGender,
      userRelationship,
      userCurrentIssue,
      userFeelings,
    };
    console.log(userInfo);
    onSubmit(userInfo);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="User Information"
      className="modal"
      overlayClassName="modal-overlay"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      ariaHideApp={true}
    >
      <h2>사용자 정보 입력</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="userName">이름:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="이름을 입력하세요"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="userAge">나이:</label>
          <input
            type="number"
            id="userAge"
            value={userAge}
            onChange={(e) => setUserAge(e.target.value)}
            placeholder="나이를 입력하세요"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="userGender">성별:</label>
          <input
            type="text"
            id="userGender"
            value={userGender}
            onChange={(e) => setUserGender(e.target.value)}
            placeholder="성별을 입력하세요"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="userRelationship">사용자와 페르소나의 관계:</label>
          <input
            type="text"
            id="userRelationship"
            value={userRelationship}
            onChange={(e) => setUserRelationship(e.target.value)}
            placeholder="관계를 입력하세요"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="userCurrentIssue">현재 문제 상황:</label>
          <textarea
            id="userCurrentIssue"
            value={userCurrentIssue}
            onChange={(e) => setUserCurrentIssue(e.target.value)}
            placeholder="현재 문제 상황을 입력하세요"
            required
          ></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="userFeelings">
            현재 문제 상황에 대해 느끼는 감정:
          </label>
          <textarea
            id="userFeelings"
            value={userFeelings}
            onChange={(e) => setUserFeelings(e.target.value)}
            placeholder="감정을 입력하세요"
            required
          ></textarea>
        </div>
        <div className="button-group">
          <button type="submit" className="submitBtn">
            제출
          </button>
          <button type="button" onClick={onRequestClose} className="closeBtn">
            닫기
          </button>
        </div>
      </form>
    </Modal>
  );
};

export const PersonaModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [personaName, setPersonaName] = useState("");
  const [personaAge, setPersonaAge] = useState("");
  const [personaGender, setPersonaGender] = useState("");
  const [personaPersonality, setPersonaPersonality] = useState("");
  const [personaStyle, setPersonaStyle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const personaInfo = {
      personaName,
      personaAge,
      personaGender,
      personaPersonality,
      personaStyle,
    };
    console.log(personaInfo);
    onSubmit(personaInfo);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Persona Information"
      className="modal"
      overlayClassName="modal-overlay"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      ariaHideApp={true}
    >
      <h2>페르소나 정보 입력</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="personaName">이름:</label>
          <input
            type="text"
            id="personaName"
            value={personaName}
            onChange={(e) => setPersonaName(e.target.value)}
            placeholder="이름을 입력하세요"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="personaAge">나이:</label>
          <input
            type="number"
            id="personaAge"
            value={personaAge}
            onChange={(e) => setPersonaAge(e.target.value)}
            placeholder="나이를 입력하세요"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="personaGender">성별:</label>
          <input
            type="text"
            id="personaGender"
            value={personaGender}
            onChange={(e) => setPersonaGender(e.target.value)}
            placeholder="성별을 입력하세요"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="personaPersonality">성격:</label>
          <textarea
            id="personaPersonality"
            value={personaPersonality}
            onChange={(e) => setPersonaPersonality(e.target.value)}
            placeholder="성격을 입력하세요"
            required
          ></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="personaStyle">나와 대화할 때 스타일:</label>
          <textarea
            id="personaStyle"
            value={personaStyle}
            onChange={(e) => setPersonaStyle(e.target.value)}
            placeholder="대화 스타일을 입력하세요"
            required
          ></textarea>
        </div>
        <div className="button-group">
          <button type="submit" className="submitBtn">
            제출
          </button>
          <button type="button" onClick={onRequestClose} className="closeBtn">
            닫기
          </button>
        </div>
      </form>
    </Modal>
  );
};
