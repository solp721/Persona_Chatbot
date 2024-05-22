import React, { useState } from "react";
import Modal from "react-modal";
import "./Styles/Modal.css";

Modal.setAppElement("#root");

export const UserModal = ({ isOpen, onRequestClose }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [relationship, setRelationship] = useState("");
  const [currentIssue, setCurrentIssue] = useState("");
  const [feelings, setFeelings] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      name,
      age,
      gender,
      relationship,
      currentIssue,
      feelings,
    };
    console.log("일단 사용자 정보: ", userInfo);
    onRequestClose();
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
          <label htmlFor="name">이름:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="age">나이:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="나이를 입력하세요"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="gender">성별:</label>
          <input
            type="text"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="성별을 입력하세요"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="relationship">사용자와 페르소나의 관계:</label>
          <input
            type="text"
            id="relationship"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            placeholder="관계를 입력하세요"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="currentIssue">현재 문제 상황:</label>
          <textarea
            id="currentIssue"
            value={currentIssue}
            onChange={(e) => setCurrentIssue(e.target.value)}
            placeholder="현재 문제 상황을 입력하세요"
            required
          ></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="feelings">현재 문제 상황에 대해 느끼는 감정:</label>
          <textarea
            id="feelings"
            value={feelings}
            onChange={(e) => setFeelings(e.target.value)}
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

export const PersonaModal = ({ isOpen, onRequestClose }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [personality, setPersonality] = useState("");
  const [style, setStyle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const personaInfo = {
      name,
      age,
      gender,
      personality,
      style,
    };
    console.log("일단 페르소나 정보:", personaInfo);
    onRequestClose();
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
          <label htmlFor="name">이름:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="age">나이:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="나이를 입력하세요"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="gender">성별:</label>
          <input
            type="text"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="성별을 입력하세요"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="personality">성격:</label>
          <textarea
            id="personality"
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
            placeholder="성격을 입력하세요"
            required
          ></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="style">나와 대화할 때 스타일:</label>
          <textarea
            id="style"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
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
