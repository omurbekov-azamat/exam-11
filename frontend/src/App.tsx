import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "./containers/Home";
import Register from "./features/user/Register";
import Items from "./containers/Items";
import Login from "./features/user/Login";

function App() {
  return (
      <Routes>
          <Route path='/' element={<Home/>}>
              <Route path='/' element={<Items/>}/>
              <Route path='/items' element={<Items/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/login' element={<Login/>}/>
          </Route>
      </Routes>
  );
}

export default App;
