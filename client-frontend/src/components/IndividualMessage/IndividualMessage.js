import React from 'react';
import './IndividualMessage.css';
import ReactEmoji from 'react-emoji';

const IndividualMessage = ({ message: { text, user }, name }) => {

    let messageByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName) {
        messageByCurrentUser = true;
      }

      return (
      messageByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl-10 ">{user}</p>
          </div>
        )
  );

};

export default IndividualMessage;