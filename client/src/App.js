import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Home from "./components/pages/Home.js";
import Login from "./components/pages/Login.js";
import Jobs from "./components/pages/Jobs.js";
import Ranking from "./components/pages/Ranking.js";
import Admin from "./components/pages/Admin.js";
import About from "./components/pages/About.js";
import PageNotFound from "./components/pages/PageNotFound.js";

import Menu from "./components/Menu";

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isAdmin, setisAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const URL = process.env.REACT_APP_BACKEND_URL
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  
  useEffect(() => {
    // Check if user is already auth
    if (token) {
      setIsAuth(true)
      // Get user
      fetch(`${URL}/auth`, { headers: { 'authorization': `Bearer ${token}` }})
      .then(res => res.json())
      .then(res => {
        // Check if user is admin
        setisAdmin(res.user.isAdmin)
        setIsLoading(false)
      })
    } else {
      navigate('/login')
      setIsLoading(false)
    }
    
  }, [])
  
  if (isLoading) return( <div className="loading">Chargement...</div> )
  
  return (
    <div className="App">
      <Menu />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin isAdmin={isAdmin} />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
