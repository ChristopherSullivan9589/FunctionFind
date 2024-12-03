import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import HostEvent from "./pages/HostEvent"
import Login from './pages/Login';
import Signup from './pages/Signup';
import FFPlus from './pages/FFPlus';
import BrowseEvents from './pages/BrowseEvents';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/host-an-event" element={<HostEvent />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ffplus" element={<FFPlus />} />
        <Route path="/browse-events" element={< BrowseEvents />} />
      </Routes>
    </Router>
  );
}

export default App;