import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Place from './components/Place';
import TurnOn from './components/TurnOn';
import Form from './components/Form';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Place />} />
        <Route path="/turnon" element={<TurnOn />} />
        <Route path="/form" element={<Form />} />
      </Routes>
  );
};

export default App;
