import React from 'react';
import './complete.css';
import doneIcon from '../../assets/images/group9.png';

interface CompleteProps {
  onContinue: () => void;
}

function Complete({ onContinue }: CompleteProps) {
  return (
    <div className='final'>
      <div className='done-img'>
        <img src={doneIcon} alt="Done" />
      </div>
      <div className="madloba">
        <div className='thankyou'>
          <p>THANK YOU!</p>
        </div>
        <div className='sub-thankyou'>
          <p>We've added your card details</p>
        </div>
      </div>
      <div className='continue-btn'>
        <button onClick={onContinue}>Continue</button>
      </div>
    </div>
  );
}

export default Complete;
