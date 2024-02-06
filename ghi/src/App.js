import { Routes, Route } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Login from "./pages/Login";
import LoginForm from "./pages/LoginForm";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import ItemsForm from "./pages/items/ItemsForm";
import RequireAuth from "./state/auth/RequireAuth";
import Test from "./pages/Test";
import Nav from './Nav';
import SignupForm from "./pages/SignupForm";
import TripOverview from './pages/TripOverview';
// import "./App.css";
// import './styles/main.scss';
import CreateTrip from "./pages/CreateTrip";
import CurrentDash from './pages/Dashboard/CurrentTripDash';
import PrevTripDash from './pages/Dashboard/PrevTripDash';
import Items from './pages/items/Items';
import UsersUpdate from './pages/UsersUpdate';

function App() {
   return (
    <div>
       <Nav /> 
    <Routes>
        <Route path='/'>
            {/* public routes */}
            <Route index element={<Landing />} />
            <Route path='token' element={<LoginForm />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<SignupForm />} />

            {/* protected routes */}
            <Route element={<RequireAuth />}>
                <Route path='items' element={<ItemsForm />} />
                <Route path='dashboard' element={<Dashboard />}>
                    <Route path='/dashboard/current' element={<CurrentDash />} />
                    <Route path='/dashboard/past' element={<PrevTripDash />} />
             </Route>
             <Route path='user/update' element={<UsersUpdate />} />


                <Route path='trip/' >
                    <Route index element={<Dashboard />} />
                    <Route path=':trip_id/' element={<TripOverview />} />
                    <Route path=':trip_id/:category_id/' element={<Items />} />
                </Route>

            </Route>
        </Route>

        <Route path='*' element={<p>Does not exist</p>} />
    </Routes>
    </div>
  );
}

export default App;
