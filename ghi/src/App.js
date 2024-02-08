import { Routes, Route } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import "./styles/Loginpage.css"
import "./styles/SignupPage.css"
import LoginForm from "./pages/LoginForm";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import ItemsForm from "./pages/items/ItemsForm";
import RequireAuth from "./state/auth/RequireAuth";
import Nav from './Nav';
import SignupForm from "./pages/SignupForm";
import TripOverview from './pages/TripOverview';
import CurrentDash from './pages/Dashboard/CurrentTripDash';
import PrevTripDash from './pages/Dashboard/PrevTripDash';
import Items from './pages/items/Items';
import UsersUpdate from './pages/UsersUpdate';
import AddBuddyModal from './pages/AddBuddyModal';
import CheckAuth from './state/auth/CheckAuth';
import AccountUpdate from './pages/AccountUpdate';

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
            <Route path='test' element={<AddBuddyModal />} />

            {/* protected routes */}
            <Route element={<RequireAuth />}>
                <Route path='items' element={<ItemsForm />} />
                <Route path='dashboard' element={<Dashboard />}>
                    <Route path='/dashboard/current' element={<CurrentDash />} />
                    <Route path='/dashboard/past' element={<PrevTripDash />} />
                </Route>
                <Route path='user/update' element={<UsersUpdate />} />
                <Route path='account/update' element={<AccountUpdate />} />


                <Route path='trip/' >
                    <Route index element={<Dashboard />} />
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
