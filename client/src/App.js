import React from 'react';
import './App.css';
import Home from '../src/componets/Home.jsx';
/* import LandingPage from './componets/LandingPage.jsx'; */
import CardDetails from './componets/CardDetails.jsx';
import VidegameText from './componets/VidegameText.jsx'
import CreateVideogame from './componets/CreateVideogame.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {  
 
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path= '/' element= {<VidegameText/>}/>
        <Route path= '/home' element= {<Home/>}/>
        <Route path= '/create' element= {<CreateVideogame/>}/>
        <Route path= '/videogame/:id' element= {<CardDetails/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
