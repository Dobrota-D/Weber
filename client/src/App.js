import { Routes, Route } from "react-router-dom";

import Home from './components/pages/Home.js';
import Jobs from './components/pages/Jobs.js';
import Admin from './components/pages/Admin.js';
import About from './components/pages/About.js';
import PageNotFound from './components/pages/PageNotFound.js';

import Menu from './components/Menu'

function App() {
  return (
    <div className="App">
      <Menu />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
