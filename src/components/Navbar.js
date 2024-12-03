import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase'; // Import Firebase auth
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './Navbar.css';

function Navbar() {
  const [user, setUser] = useState(null);

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup the listener
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo navbarrr">Function Find</Link>
      <ul className="nav-links">
        <li>
          <Link to="/host-an-event">Host an Event</Link>
        </li>
        <li>
          <Link to="/browse-events">Browse Event</Link>
        </li>
        <li>
          <Link to="/ffplus">FFPlus</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
  {user ? (
    <button onClick={handleLogout} className="logout-btn">Logout</button>
  ) : (
    <>
      <Link to="/login">Login</Link>
    </> 
  )}
</li>
<li>
  {user ? null : (
    <Link to="/signup">Signup</Link>
  )}
</li>
      </ul>
    </nav>
  );
}

export default Navbar;