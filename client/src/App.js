import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
// Landing page layout and its pages
import LandingPageLayout from "./layout/LandingPageLayout";
import LandingPage from "./pages/LandingPage";
//Sign-up and registration
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
import ErrorPage from "./pages/ErrorPage";

function App() {

  const [isAuthorized, setAuthorize] = useState(false); // Authorization state, default is false
  
  const session = localStorage.getItem("username");
  useEffect(() => {
    if (session != undefined)
    setAuthorize(true);
  else
    setAuthorize(false);
  }, []);

  if (isAuthorized) {
    // If the client is authorized show him the application so he can use it fully
    return (
      <MainLayout logout={setAuthorize}>
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<Chat />}>
            <Route path=":username" element={<Chat />} />
          </Route>
          <Route path="/profile" element={<Profile />}>
            <Route path=":username" element={<Profile />} />
          </Route>
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory_edit" element={<InventoryEdit />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<ErrorPage />} />
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
          <Route path="/login" element={<Login login={setAuthorize} />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </LandingPageLayout>)
  }
}

export default App;
