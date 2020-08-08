import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import ChatBox from './components/ChatBox/ChatBox';

class App extends  Component {

  render(){
    return (
      <Router>
        <Route path = "/" exact component = {Login}/>
        <Route path = "/chatBox" component = {ChatBox}/>
      </Router>

    );
  }
}


export default App;



