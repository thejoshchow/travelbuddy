import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import LoginForm from "./pages/LoginForm";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import RequireAuth from "./features/auth/RequireAuth";
import CheckAuth from "./features/auth/CheckAuth";
// import "./App.css";
// import './styles/main.scss';

function App() {

  return (
    <Routes>
      <Route element={<CheckAuth />}>
        <Route path='/'>

          {/* public routes */}
          <Route index element={<Landing />} />
          <Route path='token' element={<LoginForm />} />
          <Route path='login' element={<Login />} />

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path='dashboard' element={<Dashboard />} />
          </Route>

        </Route>
      </Route>
    </Routes>
  );
}

export default App;
