import React from "react";
import './cards.css';

function Cards({ name, number, month, year, cvc }) {
  return (
    <div className="cards-container">
        <div className="card-front">
            <div className="front-iner">
                <div className="img"></div>
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
            </div>
        </div>
    </div>
  );
}

export default Cards