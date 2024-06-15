
import React, { useState } from 'react';
import './App.scss';
import Home from './components/Home.js';
import Login from './components/login.js'
import Onboarding from './components/registration.js';
import Dashboard from './components/dashboard';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoomPost from './components/RoomPostContainer/RoomPost.js';
import FeedbackForm from './components/Feedback';



const App = () => {
//Adding Routes to all the pages
  const [formData, setFormData] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/Onboarding" element={<Onboarding />} />
        <Route path="/FeedbackForm" element={<FeedbackForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/postroom" element={<RoomPost formData={formData} />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App;
