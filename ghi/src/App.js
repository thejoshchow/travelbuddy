import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import RequireAuth from "./features/auth/RequireAuth";
import CheckAuth from "./features/auth/CheckAuth";
import ItemsForm from "./pages/items/ItemsForm";

function App() {

  return (
    <Routes>
      <Route element={<CheckAuth />}>
        <Route path='/'>

          {/* public routes */}
          <Route index element={<Landing />} />
          <Route path='login' element={<Login />} />

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path='items' element={<ItemsForm />} />
            <Route path='dashboard' element={<Dashboard />} />
          </Route>

        </Route>
      </Route>
    </Routes>
  );
}

export default App;
