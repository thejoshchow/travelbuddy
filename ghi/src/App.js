import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Login from "./pages/Login";
import LoginForm from "./pages/LoginForm";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import RequireAuth from "./state/auth/RequireAuth";
import Test from "./pages/Test";
import Nav from './Nav';
import SignupForm from "./pages/SignupForm"
import CreateTrip from "./pages/CreateTrip";

function App() {
   return (
    <div>
      <Nav />
    <Routes>
        <Route path='/'>
          {/* public routes */}
          <Route index element={<Landing />} />
          <Route path='createtrip' element={<CreateTrip />} />
          <Route path='token' element={<LoginForm />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignupForm />} />
          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='test' element={<Test />} />
          </Route>
        </Route>
        <Route path='*' element={<p>Does not exist</p>} />
    </Routes>
    </div>
  );
}





export default App;
