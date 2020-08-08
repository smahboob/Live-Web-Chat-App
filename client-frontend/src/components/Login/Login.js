import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import Facebook from '../FacebookLogin/Facebook'
import Google from '../GoogleLogin/Google'

//create componenet for login page
const Login = () => {
    
    //using react hooks to set state for both the name of the user and the room selected by user
    const [name, setName] = useState('');
    const [room, setRoom] = useState('Software Engineering');

    return (
        <div className="join-container">
        <main className="join-main">
            <form>

                <div className="form-control">
                    <h1 className = "room">Welcome Back</h1>
                    <Facebook setName = {setName} ></Facebook>
                    <Google setName = {setName}></Google>
                </div>

                <div className="form-control">
                    <h3 className ="room">Select a room:</h3>
                    <select id="room" 
                            name="room" 
                            onChange={(event) => setRoom(event.target.value)}>

                        <option value= "Software Engineering">Software Engineering</option>
                        <option value= "Mobile Application Development">Mobile Application Development</option>
                        <option value= "Web Application Development">Web Application Development</option>
                        <option value= "Data Science">Data Science</option>
                        <option value= "Artifical Intelligence">Artificial Intelligence</option>

                    </select>
                </div>
                
                <Link onClick = {e => {
                        if(!name){
                            e.preventDefault();
                            alert("Enter Username")
                        }
                    }} 
                    
                    to={`/chatBox?name=${name}&room=${room}`}>
                        {console.log(name)}
                    <button type="submit" className="btn">Join Chat</button>
                </Link>

            </form>
        </main>
    </div> 
    );
}

export default Login;
