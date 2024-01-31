import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Login from "./pages/Login";
import LoginForm from "./pages/LoginForm";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import RequireAuth from "./features/auth/RequireAuth";
import CheckAuth from "./features/auth/CheckAuth";
import ItemsForm from "./pages/items/ItemsForm";
import Nav from './Nav';
import SignupForm from "./pages/SignupForm"
// import "./App.css";
// import './styles/main.scss';

function App() {
   return (
    <div>
      <Nav />
    <Routes>
      <Route element={<CheckAuth />}>
        <Route path='/'>
          {/* public routes */}
          <Route index element={<Landing />} />
          <Route path='token' element={<LoginForm />} />
          <Route path='login' element={<Login />} />
             <Route path='signup' element={<SignupForm />} />
             
          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path='items' element={<ItemsForm />} />
            <Route path='dashboard' element={<Dashboard />} />
          </Route>
        </Route>
      </Route>
    </Routes>
    </div>
  );
}
  
         



export default App;

