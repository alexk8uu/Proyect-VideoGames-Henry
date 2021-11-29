import React from 'react';
import './App.css';
import Home from '../src/componets/Home.jsx';
import LandingPage from './componets/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {  
 
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path= '/' element= {<LandingPage/>}/>
        <Route path= '/home' element= {<Home/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
