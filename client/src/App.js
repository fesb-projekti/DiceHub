import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
// Landing page layout and its pages
import LandingPageLayout from "./layout/LandingPageLayout";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
// Application layout and its pages
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home"
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Inventory from "./pages/Inventory";
import InventoryEdit from "./pages/InventoryEdit";
import Settings from "./pages/Settings";
import About from "./pages/About";

function App() {

  const [isAuthorized, setAuthorize] = useState(false); // Authorization state, default is false

  useEffect(() => {
    setAuthorize(false); // Change to false to view landing page, for development only
  }, []);

  // Change this to true or false if you want to render the LandingPage or the Application untill
  // proper login with accounts is implemented

  // Implement login and register, set the state after the client is authorized, if its an existing client get the
  // the previous stsate and redirect him to the app. Cookies, sessions, local storage ... ?!?
  // Also we always need to check this state in case someone tries to browser route manually so we don't show either if the 
  // state is not correct.

  if (isAuthorized) {
    // If the client is authorized show him the application so he can use it fully
    return (
      <MainLayout>
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/inventory/:id" element={<Inventory />} />
          <Route path="/inventory_edit" element={<InventoryEdit />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </MainLayout>)
  }
  else {
    // If the client is not authorized show him the landing page so he can login or register
    return (
      <LandingPageLayout>
        <Routes>
          <Route path="/" exact={true} element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </LandingPageLayout>)
  }
}

export default App;
