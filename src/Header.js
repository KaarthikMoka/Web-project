import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Ensure you still have access to relevant styles

function Header() {
  return (
    <header>
      <nav>
        <ul className="pop">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/genres">Movies by Genre</Link></li>
          <li><Link to="/languages">Movies by Language</Link></li>
          <li><Link to="/years">Movies by Year</Link></li>
          <li><Link to="/rating">Movies by Rating</Link></li>
          {/* Logo in the middle */}
          <li id="logo" className="logo">FRAMECINI</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
