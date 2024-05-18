import React from "react";
import Header from "../../Layouts/Header/Header";
// import Background1 from "../../Assets/Images/background1.png";
// import Background2 from "../../Assets/Images/background2.png";
import "../Main/Styles/Main.css";

export default function MainPage() {
  return (
    <>
      <Header />
      <div className="mainContainer">
        <div className="titleContainer">
          <div className="mainTitle">
            <h1>대화법 개선을위한 페르소나 기반 대화 시뮬레이션 시스템</h1>
          </div>
          <div className="subTitle">
            <h3>
              Persona-based Conversation Simulation System for Improving
              Conversation Skills
            </h3>
          </div>
          <div className="startBtn">
            <button>시작 버튼</button>
          </div>
        </div>
      </div>
    </>
  );
}
