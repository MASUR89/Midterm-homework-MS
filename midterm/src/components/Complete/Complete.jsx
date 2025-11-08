import React from 'react'
import './complete.css'
import doneIcon from '../../assets/images/Group 9.png'

function Complete() {
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
            <button >Continue</button>
        </div>
    </div>
  )
}

export default Complete