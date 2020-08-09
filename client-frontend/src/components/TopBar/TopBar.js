import React from 'react';
import './TopBar.css';

const TopBar = ({ room}) => (
  <div>
        <header className="chat-header">
            <h1><i className="fas fa-smile"></i>DevChat</h1>
            <a href="/" className="btn1">Leave Room</a>
        </header>
  </div>
);

export default TopBar;