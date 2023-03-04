import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "./containers/Home";
import Register from "./features/user/Register";
import Items from "./containers/Items";
import Login from "./features/user/Login";
import AddProduct from "./features/product/AddProduct";
import Item from "./containers/Item";

function App() {
  return (
      <Routes>
          <Route path='/' element={<Home/>}>
              <Route path='/' element={<Items/>}/>
              <Route path='/items' element={<Items/>}/>
              <Route path='/items/:id' element={<Item/>}/>
              <Route path='/category/:categoryName' element={<Items/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/new-item' element={<AddProduct/>}/>
          </Route>
      </Routes>
  );
}

export default App;
