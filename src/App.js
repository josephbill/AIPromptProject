import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route,Link} from "react-router-dom"
import React, {useState} from "react";
import ProfileUpdate from './components/ProfileUpdate';

function App() {
  return (

    <BrowserRouter>
       {/* define an element like a navigation tag */}
       <nav
        style={{
          backgroundColor: 'black', height: '50px',
          display: 'flex', justifyContent: 'center',
          alignItems: 'center'
        }}
       >
        
        {/* links */}
        <img
    src="https://thumbs.dreamstime.com/b/happy-robot-positive-financial-graph-18038889.jpg"
    alt="Logo"
    style={{ height: "40px", marginLeft: "20px" }}
  />
        {/* <Link to={'/'} style={{marginLeft: 0 +'px', color: 'white'}}>Home</Link> */}
        <Link to={'/profileUpdate'} style={{marginLeft: 40 +'px', color: 'white'}}>Robo-Adviser</Link>

       </nav>
       <Routes>
           {/* <Route exact path="/" element={
              <Home/>
           }/> */}
    
              <Route exact path="/profileUpdate" element={
               <ProfileUpdate/>
           }/>
       </Routes>
    </BrowserRouter>
   
  );
}

export default App;
