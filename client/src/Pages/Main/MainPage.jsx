import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import Header from "../../Layouts/Header/Header";
import Footer from "../../Layouts/Footer/Footer";
import Background1 from "../../Assets/Images/background1.png";
import Background2 from "../../Assets/Images/background2.png";
import "../Main/Styles/Main.css";

const TITLE = "대화법 개선을 위한 페르소나 기반 대화 시뮬레이션 시스템";
const SUBTITLE =
  "Persona-based Conversation Simulation System for Improving Conversation Skills";

const Robot1 = React.memo(({ src, alt, isHovered, position }) => (
  <div className={classNames("robot", position, { show: isHovered })}>
    <img src={src} alt={alt} className="robotImg1" />
  </div>
));

const Robot2 = React.memo(({ src, alt, isHovered, position }) => (
  <div className={classNames("robot", position, { show: isHovered })}>
    <img src={src} alt={alt} className="robotImg2" />
  </div>
));

export default function MainPage() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleButtonClick = useCallback(() => {
    navigate("/test");
  }, [navigate]);

  return (
    <>
      <Header />
      <div className="mainContainer">
        <div className="titleContainer">
          <div className="mainTitle">
            <h1>{TITLE}</h1>
          </div>
          <div className="subTitle">
            <h3>{SUBTITLE}</h3>
          </div>
          <div className="startBtn">
            <button
              onClick={handleButtonClick}
              className="hoverBtn"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              시작하기
            </button>
          </div>
        </div>
        <Footer />
        <div className="hoverContainer">
          <Robot1
            src={Background1}
            alt="robot1"
            isHovered={isHovered}
            position="leftRobot"
          />
          <Robot2
            src={Background2}
            alt="robot2"
            isHovered={isHovered}
            position="rightRobot"
          />
        </div>
      </div>
    </>
  );
}
