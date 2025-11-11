import React from "react";
import './cards.css';
import CardLogo from '../../assets/images/Group8.png';
import Sometext from '../../assets/images/Group15.png';

function Cards({ name, number, month, year, cvc }) {
  return (
    <div className="cards-container">
        <div className="card-front">
            <div className="front-iner">
                <div className="img">
                    <img src={CardLogo} alt="Logo" />
                </div>
                <div className="card-number-display">
                    {number || "0000 0000 0000 0000"}
                </div>
                <div className="name-line">
                    <div className="cardholder-name-display">
                        {name || "JANE APPLESEED"}
                    </div>
                    <div className="exp-date-display">
                        {(month || "00") + "/" + (year || "00")}
                    </div>
                </div>
            </div>
        </div>
        <div className="card-back"> 
            <div className="back-iner"> 
                <div className="black"></div>
                <div className="cvc-display">
                    {cvc || "000"}
                </div>
                <div className="sometext">
                    <img src={Sometext} alt="Some text" />
                </div>
            </div>
        </div>
    </div>
  );
}

export default Cards