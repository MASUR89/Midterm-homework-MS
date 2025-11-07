import React, { useState } from 'react';
import './data.css';
import Cards from '../Cards/Cards.jsx';

const cardNumberFormat = (raw) => {
  const digits = raw.replace(/\D/g, '').slice(0, 16);
  const groups = digits.match(/.{1,4}/g);
  return groups ? groups.join(' ') : digits;
};

const onlyDigits = (raw, maxLen) => raw.replace(/\D/g, '').slice(0, maxLen);

export default function Dataentry() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [errors, setErrors] = useState({});

  const nameRegex = /^\p{L}[\p{L}\s\-']{1,29}$/u;
  const monthRegex = /^(0[1-9]|1[0-2])$/;
  const yearRegex = /^\d{2}$/;
  const cvcRegex = /^\d{3}$/;

  const handleNameChange = (e) => setName(e.target.value.slice(0, 30));
  const handleNumberChange = (e) => setNumber(cardNumberFormat(e.target.value));
  const handleMonthChange = (e) => setMonth(onlyDigits(e.target.value, 2));
  const handleYearChange = (e) => setYear(onlyDigits(e.target.value, 2));
  const handleCvcChange = (e) => setCvc(onlyDigits(e.target.value, 3));

  const validateAll = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Cant be blank';
    else if (!nameRegex.test(name.trim())) errs.name = 'Incorrect name format';

    const plainNumber = number.replace(/\s/g, '');
    if (!plainNumber) errs.number = 'Cant be blank';
    else if (plainNumber.length !== 16) errs.number = 'Wrong format, numbers only';

    if (!month) errs.month = 'Cant be blank';
    else if (!monthRegex.test(month.padStart(2, '0'))) errs.month = 'Should be 01-12';

    if (!year) errs.year = 'Cant be blank';
    else if (!yearRegex.test(year)) errs.year = 'Digits only';

    if (!cvc) errs.cvc = 'Cant be blank';
    else if (!cvcRegex.test(cvc)) errs.cvc = '3 digits only';

    return errs;
  };

  const handleSubmit = () => {
    const validation = validateAll();
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      console.log('Form submitted:', { name, number, month, year, cvc });
    }
  };

  const hasError = Object.keys(errors).length > 0;

  return (

    <div className="page-container">

      <div className="cards-section">
        <Cards name={name} number={number} month={month} year={year} cvc={cvc} />
      </div>  
    
      <div className="main">
          <div className="cardholder">
          <div><p>CARDHOLDER NAME</p></div>
          <div>
            <input
              className={`name ${errors.name ? 'input-error' : ''}`}
              type="text"
              placeholder="e.g. Nino Ninidze"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div></div>{errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div className="cardnumber">
          <div><p>CARD NUMBER</p></div>
          <div>
            <input
              className={`number ${errors.number ? 'input-error' : ''}`}
              type="text"
              placeholder="e.g. 1234 5678 9123 0000"
              value={number}
              onChange={handleNumberChange}
              inputMode="numeric"
            />
          </div>
          <div></div>{errors.number && <div className="error">{errors.number}</div>}
        </div>

        <div className="datecvc">
          <div className="date-fields">
            <div><p>EXP. DATE (MM/YY)</p></div>
            <div className="date-inputs">
              <div>
                <input
                  className={`${errors.month ? 'input-error' : ''}`}
                  type="text"
                  placeholder="MM"
                  value={month}
                  onChange={handleMonthChange}
                  inputMode="numeric"
                />
                <div></div>{errors.month && <div className="error">{errors.month}</div>}
              </div>
              <div>
                <input
                  className={`${errors.year ? 'input-error' : ''}`}
                  type="text"
                  placeholder="YY"
                  value={year}
                  onChange={handleYearChange}
                  inputMode="numeric"
                />
                <div></div>{errors.year && <div className="error">{errors.year}</div>}
              </div>
            </div>
          </div>

          <div className="cvc-field">
            <div><p>CVC</p></div>
            <div>
              <input
                className={`${errors.cvc ? 'input-error' : ''}`}
                type="text"
                placeholder="e.g. 123"
                value={cvc}
                onChange={handleCvcChange}
                inputMode="numeric"
              />
            </div>
            <div></div>
            {errors.cvc && <div className="error">{errors.cvc}</div>}
          </div>
        </div>
    </div> 

      <button type="button" onClick={handleSubmit}>Confirm</button>
    </div>
  );
}
