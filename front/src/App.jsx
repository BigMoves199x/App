import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormContainer from './components/FormContainer';


const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormContainer />} />
      </Routes>
    </Router>
  );
};

export default App;
