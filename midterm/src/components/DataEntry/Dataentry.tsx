import React, { useState, useRef, useEffect } from 'react';
import './data.css';
import Cards from '../Cards/Cards.jsx';
import Complete from '../Complete/Complete.tsx';

const cardNumberFormat = (raw: string): string => {
  const digits = raw.replace(/\D/g, '').slice(0, 16);
  const groups = digits.match(/.{1,4}/g);
  return groups ? groups.join(' ') : digits;
};

const onlyDigits = (raw: string, maxLen: number): string => raw.replace(/\D/g, '').slice(0, maxLen);

function Dataentry() {
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const cvcRef = useRef<HTMLInputElement>(null);

   const [preview, setPreview] = useState({
    name: '',
    number: '',
    month: '',
    year: '',
    cvc: ''
  });


  useEffect(() => {
    const stored = localStorage.getItem('cardData');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (nameRef.current) nameRef.current.value = parsed.name || '';
      if (numberRef.current) numberRef.current.value = parsed.number || '';
      if (monthRef.current) monthRef.current.value = parsed.month || '';
      if (yearRef.current) yearRef.current.value = parsed.year || '';
      if (cvcRef.current) cvcRef.current.value = parsed.cvc || '';
      setPreview(parsed);
    }
  }, []);

  const updateStorage = () => {
    const data = {
      name: nameRef.current?.value || '',
      number: numberRef.current?.value || '',
      month: monthRef.current?.value || '',
      year: yearRef.current?.value || '',
      cvc: cvcRef.current?.value || ''
    };
    localStorage.setItem('cardData', JSON.stringify(data));
  };

  const handleChange = () => {
    const data = {
      name: nameRef.current?.value || '',
      number: cardNumberFormat(numberRef.current?.value || ''),
      month: onlyDigits(monthRef.current?.value || '', 2),
      year: onlyDigits(yearRef.current?.value || '', 2),
      cvc: onlyDigits(cvcRef.current?.value || '', 3)
    };

    if (numberRef.current) numberRef.current.value = data.number;
    if (monthRef.current) monthRef.current.value = data.month;
    if (yearRef.current) yearRef.current.value = data.year;
    if (cvcRef.current) cvcRef.current.value = data.cvc;

    updateStorage();
    setPreview(data);
  };

  const validateAll = () => {
    const errs: Record<string, string> = {};
    const name = nameRef.current?.value.trim() || '';
    const number = (numberRef.current?.value || '').replace(/\s/g, '');
    const month = monthRef.current?.value || '';
    const year = yearRef.current?.value || '';
    const cvc = cvcRef.current?.value || '';

    const nameRegex = /^\p{L}[\p{L}\s\-']{1,29}$/u;
    const monthRegex = /^(0[1-9]|1[0-2])$/;
    const yearRegex = /^\d{2}$/;
    const cvcRegex = /^\d{3}$/;

    const currentYear = new Date().getFullYear() % 100; 
    const maxYear = (currentYear + 10) % 100;

    if (!name) errs.name = 'Cant be blank';
    else if (!nameRegex.test(name)) errs.name = 'Incorrect name format';

    if (!number) errs.number = 'Cant be blank';
    else if (number.length !== 16) errs.number = 'Wrong format, 16 digits required';

    if (!month) errs.month = 'Cant be blank';
    else if (!monthRegex.test(month.padStart(2, '0'))) errs.month = 'Should be 01-12';

    if (!year) errs.year = 'Cant be blank';
    else if (!yearRegex.test(year)) errs.year = 'Digits only';
    else {
      const numYear = parseInt(year, 10);
      if (numYear < currentYear || numYear > maxYear) {
        errs.year = `Wrong year`;
      }
    }

    if (!cvc) errs.cvc = 'Cant be blank';
    else if (!cvcRegex.test(cvc)) errs.cvc = '3 digits only';

    return errs;
  };

  const handleSubmit = () => {
    const validation = validateAll();
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      updateStorage();
      setIsComplete(true);
    }
  };

  return (
    <div className="page-container">
      <div className="cards-section">
        <Cards
          name={preview.name}
          number={preview.number}
          month={preview.month}
          year={preview.year}
          cvc={preview.cvc}
        />
      </div>

      <div className="main">
        {isComplete ? (
          <Complete
            onContinue={() => {
              if (nameRef.current) nameRef.current.value = '';
              if (numberRef.current) numberRef.current.value = '';
              if (monthRef.current) monthRef.current.value = '';
              if (yearRef.current) yearRef.current.value = '';
              if (cvcRef.current) cvcRef.current.value = '';
              localStorage.removeItem('cardData');
              setPreview({ name: '', number: '', month: '', year: '', cvc: '' });
              setErrors({});
              setIsComplete(false);
            }}
          />
        ) : (
          <>
            <div className="cardholder">
              <div className='title'>CARDHOLDER NAME</div>
              <div>
                <input
                  className={`name ${errors.name ? 'input-error' : ''}`}
                  type="text"
                  placeholder="e.g. Nino Ninidze"
                  ref={nameRef}
                  onChange={handleChange}
                />
              </div>
              {errors.name && <div className="error">{errors.name}</div>}
            </div>

            <div className="cardnumber">
              <div className='title'>CARD NUMBER</div>
              <div>
                <input
                  className={`number ${errors.number ? 'input-error' : ''}`}
                  type="text"
                  placeholder="e.g. 1234 5678 9123 0000"
                  ref={numberRef}
                  onChange={handleChange}
                  inputMode="numeric"
                />
              </div>
              {errors.number && <div className="error">{errors.number}</div>}
            </div>

            <div className="datecvc">
              <div className="date-fields">
                <div className='title'>EXP. DATE (MM/YY)</div>
                <div className="date-inputs">
                  <div>
                    <input
                      className={`${errors.month ? 'input-error' : ''}`}
                      type="text"
                      placeholder="MM"
                      ref={monthRef}
                      onChange={handleChange}
                      inputMode="numeric"
                    />
                    {errors.month && <div className="error">{errors.month}</div>}
                  </div>
                  <div>
                    <input
                      className={`${errors.year ? 'input-error' : ''}`}
                      type="text"
                      placeholder="YY"
                      ref={yearRef}
                      onChange={handleChange}
                      inputMode="numeric"
                    />
                    {errors.year && <div className="error">{errors.year}</div>}
                  </div>
                </div>
              </div>

              <div className="cvc-field">
                <div className='title'>CVC</div>
                <div>
                  <input
                    className={`${errors.cvc ? 'input-error' : ''}`}
                    type="text"
                    placeholder="e.g. 123"
                    ref={cvcRef}
                    onChange={handleChange}
                    inputMode="numeric"
                  />
                </div>
                {errors.cvc && <div className="error">{errors.cvc}</div>}
              </div>
            </div>

            <button type="button" onClick={handleSubmit}>Confirm</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Dataentry;
