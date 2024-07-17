import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import calculatorIcon from './image/icon-calculator.svg';
import illustration from './image/illustration-empty.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [years, setYears] = useState('');
  const [rate, setRate] = useState('');
  const [mortgageType, setMortgageType] = useState('');

  const [amountError, setAmountError] = useState('');
  const [yearsError, setYearsError] = useState('');
  const [rateError, setRateError] = useState('');
  const [mortgageTypeError, setMortgageTypeError] = useState('');

  const handleClear = (event) => {
    event.preventDefault();
    document.getElementById('mortgage-form').reset();
    setAmount('');
    setYears('');
    setRate('');
    setMortgageType('');
  };

  const handleCalculate = (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      navigate('/results', {
        state: { amount, years, rate, mortgageType } 
      });
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!amount.trim()) {
      setAmountError('This field is required');
      isValid = false;
    } else {
      setAmountError('');
    }

    if (!years.trim()) {
      setYearsError('This field is required');
      isValid = false;
    } else {
      setYearsError('');
    }

    if (!rate.trim()) {
      setRateError('This field is required');
      isValid = false;
    } else {
      setRateError('');
    }

    if (!mortgageType) {
      setMortgageTypeError('Please select a Mortgage Type');
      isValid = false;
    } else {
      setMortgageTypeError('');
    }

    return isValid;
  };

  return (
    <div className="App col-lg-6 mb-4">
      <form id="mortgage-form" className='d-flex' onSubmit={handleCalculate}>
        <div className='content p-5'>
          <header>
            <h3>Mortgage Calculator</h3>
            <button className='clear-btn' onClick={handleClear}>Clear All</button>
          </header>
          
          <div className='amount'>
            <label className='mb-2'>Mortgage Amount</label>
            <div className='input-group mb-2'>
              <span className={`span input-group-text ${amountError ? 'error' : ''}`}>€</span>
              <input 
                type='text' 
                className='form-control' 
                id='amount' 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            {amountError && <p className="text-danger">{amountError}</p>}
          </div>
          
          <div className='row'>
            <div className='term col'>
              <label className='mb-2'>Mortgage Term</label>
              <div className='input-group mb-2'>
                <input 
                  type='text' 
                  className='form-control' 
                  id='years' 
                  value={years} 
                  onChange={(e) => setYears(e.target.value)}
                />
                <span className={`span input-group-text ${yearsError ? 'error' : ''}`}>years</span>
              </div>
              {yearsError && <p className="text-danger">{yearsError}</p>}
            </div>
  
            <div className='rate col'>
              <label className='mb-2'>Interest Rate</label>
              <div className='input-group mb-2'>
                <input 
                  type='text' 
                  className='form-control' 
                  id='rate' 
                  value={rate} 
                  onChange={(e) => setRate(e.target.value)}
                />
                <span className={`span input-group-text ${rateError ? 'error' : ''}`}>%</span>
              </div>
              {rateError && <p className="text-danger">{rateError}</p>}
            </div>
          </div>
  
          <div className='type'>
            <label className='mb-2'>Mortgage Type</label>
            <div className='form-check'>
              <input 
                className=' custom-radio form-check-input' 
                type='radio' 
                id='type1' 
                value='Repayment' 
                
                checked={mortgageType === 'Repayment'} 
                onChange={() => setMortgageType('Repayment')}
              />
              <label className='form-check-label'>Repayment</label>
            </div>
            <div className='form-check'>
              <input 
                className='custom-radio form-check-input' 
                type='radio' 
                id='type2' 
                value='InterestOnly' 
                checked={mortgageType === 'InterestOnly'} 
                onChange={() => setMortgageType('InterestOnly')}
              />
              <label className='form-check-label'>Interest Only</label>
            </div>
            {mortgageTypeError && <p className="text-danger">{mortgageTypeError}</p>}
          </div>
  
          <button className='submit' type="submit">
            <img src={calculatorIcon} alt='icon' /> Calculate Repayments
          </button>
        </div>
        
        <div className='results col-lg-6'>
          <img src={illustration} alt='results' />
          <h3>Results shown here</h3>
          <p>Complete the form and click "calculate repayments" to see what your monthly repayments would be.</p>
        </div>
      </form>
    </div>
  );
};

export default Home;
