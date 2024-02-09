import { Routes, Route } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/App.css";
import "./styles/Loginpage.css"
import "./styles/SignupPage.css"
import Landing from "./pages/oldStarterpages/Landing";
import RequireAuth from "./state/auth/RequireAuth";
import Nav from './Nav';
import SignupForm from "./pages/login_signup/SignupForm";
import TripOverview from './pages/tripOverview/TripOverview';
import CurrentDash from './pages/Dashboard/CurrentTripDash';
import PrevTripDash from './pages/Dashboard/PrevTripDash';
import Items from './pages/items/Items';
import UsersUpdate from './pages/UsersUpdate';
import CheckAuth from './state/auth/CheckAuth';
import AccountUpdate from './pages/AccountUpdate';
import LoginForm from "./pages/login_signup/LoginForm";

function App() {
   return (
    <>
    <Nav />
    <Routes>
        <Route path='/' element={<CheckAuth />}>
            {/* public routes */}
            <Route index element={<Landing />} />
            <Route path='login' element={<LoginForm />} />
            <Route path='signup' element={<SignupForm />} />

            {/* protected routes */}
            <Route element={<RequireAuth />}>
                <Route path='dashboard' element={<CurrentDash />} />
                <Route path='history' element={<PrevTripDash />} />
                <Route path='user' element={<UsersUpdate />} />
                <Route path='account' element={<AccountUpdate />} />

                <Route path='trip/' >
                    <Route index element={<CurrentDash />} />
                    <Route path=':trip_id/' element={<TripOverview />} />
                    <Route path=':trip_id/:category_id/' element={<Items />} />
                </Route>
            </Route>

            <Route path='*' element={<p>Does not exist</p>} />
        </Route>
    </Routes>
    </>
  );
}

export default App;

