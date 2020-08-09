//import statements
import React from 'react';
import { useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './ChatBox.css';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import InputMessage from '../InputMessage/InputMessage';
import MessageBox from '../MessageBox/MessageBox';

//global variable
let socket;

//create chat page component
const ChatBox = ({location}) => {

    //set states
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const CLIENTENDPOINT = 'localhost:8000';


    //this is only in effect when either the url changes or the endpoint
    useEffect(() => {
        //get the current url to get the name of user and the room entered and set them in the state
        const {name, room} = queryString.parse(location.search);
        setName(name);
        setRoom(room);

        //create an instance of the socket
        socket = io(CLIENTENDPOINT);

        //emit the message when a user logs in 
        socket.emit('loggedIn', { name,room }, () => {
        });

        // when the page unmounted disconnect user and turn off that specific socket
        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [CLIENTENDPOINT, location.search]);


    //this is to handle messages received from backend
    useEffect(() => {
        socket.on('message', (message) => {
           setMessages([...messages, message]);
        })

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });

    }, [messages])


    //function to send the message from front end to backend
    const sendMessage = (event) => {
        event.preventDefault();

        if(message){
            socket.emit('messageSent', message, () => setMessage(''))
        }
    }

    return (
        <div className="chat-container">
            <TopBar room={room} ></TopBar>
            <main className="chat-main">
                <SideBar room={room} users={users}></SideBar>
                <MessageBox messages={messages} name={name} />
            </main>
            <InputMessage message={message} setMessage={setMessage} sendMessage={sendMessage} ></InputMessage>
        </div>
    );
}

export default ChatBox;