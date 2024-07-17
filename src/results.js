import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import calculatorIcon from './image/icon-calculator.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './results.css';

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData] = useState(location.state || {});
  const [monthlyRepayment, setMonthlyRepayment] = useState(0);
  const [totalRepayment, setTotalRepayment] = useState(0);

  const calculateMortgage = useCallback(() => {
    const { amount, years, rate, mortgageType } = formData;
    const principal = parseFloat(amount);
    const annualInterestRate = parseFloat(rate) / 100;
    const monthlyInterestRate = annualInterestRate / 12;
    const totalPayments = parseFloat(years) * 12;

    let monthlyPayment;
    if (mortgageType === 'Repayment') {
      monthlyPayment = principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
    } else { // Interest Only
      monthlyPayment = principal * monthlyInterestRate;
    }

    setMonthlyRepayment(monthlyPayment.toFixed(4));
    setTotalRepayment((monthlyPayment * totalPayments).toFixed(4));
  }, [formData]);

  useEffect(() => {
    calculateMortgage();
  }, [formData, calculateMortgage]);

  const handleClear = (event) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <div className="App col-lg-6 mb-4">
      <form id="mortgage-form" className='d-flex'>
        <div className='content p-4'>
          <header>
            <h3>Mortgage Calculator</h3>
            <button className='clear-btn' onClick={handleClear}>Clear All</button>
          </header>
          
          <div className='amount'>
            <label className='mb-2'>Mortgage Amount</label>
            <div className='input-group mb-2'>
              <span className='span input-group-text'>€</span>
              <input type='text' className='form-control' id='amount' value={formData.amount} readOnly />
            </div>
          </div>
          
          <div className='row'>
            <div className='term col'>
              <label className='mb-2'>Mortgage Term</label>
              <div className='input-group mb-2'>
                <input type='text' className='form-control' id='years' value={formData.years} readOnly />
                <span className='span input-group-text'>years</span>
              </div>
            </div>
    
            <div className='rate col'>
              <label className='mb-2'>Interest Rate</label>
              <div className='input-group mb-2'>
                <input type='text' className='form-control' id='rate' value={formData.rate} readOnly />
                <span className='span input-group-text'>%</span>
              </div>
            </div>
          </div>
    
          <label>Mortgage Type</label>
          
          <div className='type input-group-text mb-2 mt-2'>
            <input 
              type='radio' 
              id='type1' 
              checked={formData.mortgageType === 'Repayment'} 
              readOnly 
              className='lime-radio'
            />
            <label>Repayment</label>
          </div>
          
          <div className='type input-group-text mb-2'>
            <input 
              type='radio' 
              id='type2' 
              checked={formData.mortgageType === 'InterestOnly'} 
              readOnly 
              className='lime-radio'
            />
            <label>Interest Only</label>
          </div>
    
          <button className='submit' type="button" onClick={calculateMortgage}>
            <img src={calculatorIcon} alt='icon' /> Recalculate Repayments
          </button>
        </div>
        
        <div className='resultss col-lg-6 p-4'>
          <h3>Your results</h3>
          <p>Your results are shown below based on the information you provided. To adjust the results, edit the form and click "calculate repayments" again.</p>
    
          <div className='outcome-box'>
            <p>Your monthly repayments</p>
            <div id='repayments'>
              €{parseFloat(monthlyRepayment).toLocaleString('en-US', {minimumFractionDigits: 4, maximumFractionDigits: 4})}
            </div>
            <hr />
    
            <p>Total you'll repay over the term</p>
            <div id='total'>
              €{parseFloat(totalRepayment).toLocaleString('en-US', {minimumFractionDigits: 4, maximumFractionDigits: 4})}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Results;
