import React, { useState } from "react";
import DsuLogo from "../../Assets/Images/DsuLogo.png";
import UbseLogo from "../../Assets/Images/UbseLogo.png";
import "../Header/Styles/Header.css";

export default function Header() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="headerWrap">
      <div className="leftWrap">
        <img src={DsuLogo} alt="dsu" width={80} />
        <img src={UbseLogo} alt="ubse" width={180} height={55} />
      </div>
      <div className="rightWrap">
        <div
          className={`toggleSwitch ${isToggled ? "toggled" : ""}`}
          onClick={handleToggle}
        >
          <div className="toggleCircle"></div>
        </div>
      </div>
    </div>
  );
}
