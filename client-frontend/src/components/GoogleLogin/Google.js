import React, { Component } from 'react'
import GoogleLogin from 'react-google-login';

export class Google extends Component {

    state = {
        isLoggedIn: false,
        userID: "",
        name: "",
        email: "",
        picture: ""
    };

    responseGoogle = response => {
        this.setState({
          isLoggedIn: true,
          userID: response.googleId,
          name: response.profileObj.name,
          email: response.profileObj.email,
          picture: response.profileObj.imageUrl
        });
        const finalName = this.state.name.split(" ")[1] + this.state.userID.substring(1,4) 
        this.props.setName(finalName);        
      };
    
    componentClicked = () => console.log("clicked");
    

    render() {
    let googleContent;

    if (this.state.isLoggedIn) {
      googleContent = (
        <div
          style={{
            width: "400px",
            margin: "auto",
            padding: "5px",
            color: 'black',
            textAlign: 'center',
          }}
        >
          <img className = "imgShow" src={this.state.picture} alt={this.state.name} />
          <h3>Username: {this.state.name}</h3>
        </div>
      );
    } else {
    googleContent = (
        <GoogleLogin
          clientId= "" // removed clientID for security reasons     
          render={renderProps => (
            <button className  = "btnGoogle" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login with Google</button>
          )}
          buttonText="Login with Google"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
          className="btnGoogle"
        />
      );
    }
    return <div>{googleContent}</div>;
  }
}

export default Google
