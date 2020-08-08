import React from 'react';
import './InputMessage.css';

const InputMessage = ({ message , setMessage, sendMessage}) => (
    <div className="chat-form-container" id = "chat-form">
        <form id="chat-form">
            <input
                id="msg"
                type="text"
                placeholder="Enter Message"
                autoComplete="off"
                value = {message}
                onChange = {(event) => setMessage(event.target.value)}
                onKeyPress = {event => event.key === 'enter' ? sendMessage(event): null}
            />
            <button 
                className="btn" onClick = {(event) => sendMessage(event)}
                ><i className="fas fa-paper-plane"></i> 
                Send
                </button>
        </form>
    </div>
);

export default InputMessage;