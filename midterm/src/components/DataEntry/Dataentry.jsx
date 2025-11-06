import React, { useState } from 'react';
import './data.css';

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
  const cardNumberRegex = /^(?:\d{4} ){3}\d{4}$|^\d{16}$/; 
  const monthRegex = /^(0[1-9]|1[0-2])$/;
  const yearRegex = /^\d{2}$/; 
  const cvcRegex = /^\d{3}$/; 

  const handleNameChange = (e) => {
    const v = e.target.value;
    setName(v.slice(0, 30));
  };

  const handleNumberChange = (e) => {
    const formatted = cardNumberFormat(e.target.value);
    setNumber(formatted);
  };

  const handleMonthChange = (e) => {
    const digits = onlyDigits(e.target.value, 2);
    setMonth(digits);
  };

  const handleYearChange = (e) => {
    setYear(onlyDigits(e.target.value, 2));
  };

  const handleCvcChange = (e) => {
    setCvc(onlyDigits(e.target.value, 3));
  };

  const validateAll = () => {
    const errs = {};

    if (!name.trim()) errs.name = 'Cant be blank';
    else if (!nameRegex.test(name.trim())) errs.name = 'Incorrect name format';

    const plainNumber = number.replace(/\s/g, '');
    if (!plainNumber) errs.number = 'Cant be blank';
    else if (plainNumber.length !== 16) errs.number =  'Wrong format, numbers only';

    if (!month) errs.month = 'Cant be blank';
    else if (!monthRegex.test(month.padStart(2, '0'))) errs.month = 'Should be 01-12';

    if (!year) errs.year = 'Cant be blank';
    else if (!yearRegex.test(year)) errs.year = 'Dijits only';

    if (!cvc) errs.cvc = 'Cant be blank';
    else if (!cvcRegex.test(cvc)) errs.cvc = '3 digits only';

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateAll();
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      console.log('Form submitted:', { name, number, month, year, cvc });
    }
  };

  return (
    <div className="main">
      <form onSubmit={handleSubmit} className="data-form">
        <div className="cardholder">
          <p> CARDHOLDER NAME</p> 
          <input
            className="name"
            type="text"
            placeholder="e.g. Nino Ninidze"
            value={name}
            onChange={handleNameChange}
            aria-invalid={!!errors.name}
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div className="cardnumber">
          <p> CARD NUMBER</p>
          <input
            className="number"
            type="text"
            placeholder="e.g. 1234 5678 9123 0000"
            value={number}
            onChange={handleNumberChange}
            inputMode="numeric"
            aria-invalid={!!errors.number}
          />
          {errors.number && <div className="error">{errors.number}</div>}
        </div>

         <div className="datecvc">
          <p>EXP. DATE (MM/YY)</p>
          <div className="date-fields">
            <div>
              <input
                type="text"
                placeholder="MM"
                value={month}
                onChange={handleMonthChange}
                inputMode="numeric"
                aria-invalid={!!errors.month}
              />
              {errors.month && <div className="error">{errors.month}</div>}
            </div>

            <div>
              <input
                type="text"
                placeholder="YY"
                value={year}
                onChange={handleYearChange}
                inputMode="numeric"
                aria-invalid={!!errors.year}
              />
              {errors.year && <div className="error">{errors.year}</div>}
            </div>
          </div>

          <div className="cvc-field">
            <p>CVC</p>
            <input
              type="text"
              placeholder="e.g. 123"
              value={cvc}
              onChange={handleCvcChange}
              inputMode="numeric"
              aria-invalid={!!errors.cvc}
            />
            {errors.cvc && <div className="error">{errors.cvc}</div>}
          </div>
        </div>

        <button type="submit">Confirm</button>
      </form>
    </div>
  );
}
