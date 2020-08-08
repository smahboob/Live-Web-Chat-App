import React from 'react';
import './MessageBox.css';
import ScrollToBottom from 'react-scroll-to-bottom';
import IndividualMessage from '../IndividualMessage/IndividualMessage'

const MessageBox = ({ messages , name}) => (

  <ScrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}><IndividualMessage message={message} name={name}/></div>)}
  </ScrollToBottom>

);

export default MessageBox;