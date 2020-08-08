import React from 'react';
import './SideBar.css';

const SideBar = ({ room , users}) => (
    <div className="chat-sidebar">
        <h3><i className="fas fa-comments"></i> Room Name:</h3>
        <h2 id="room-name">{room}</h2>
        <h3><i className="fas fa-users"></i> Users Online:</h3>
        {
      users
        ? (
          <div>
            <div >
              <h4>
                {users.map(({name}) => (
                  <div key={name}>
                    {name}
                  </div>
                ))}
              </h4>
            </div>
          </div>
        )
        : null
    }
    </div>
);

export default SideBar;