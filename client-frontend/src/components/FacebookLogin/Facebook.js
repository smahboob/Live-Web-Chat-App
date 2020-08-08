import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login';

export class Facebook extends Component {

    state = {
        isLoggedIn: false,
        userID: "",
        name: "",
        email: "",
        picture: ""
    };

    responseFacebook = response => {
        this.setState({
          isLoggedIn: true,
          userID: response.userID,
          name: response.name,
          email: response.email,
          picture: response.picture.data.url
        });
        const finalName = this.state.name.split(" ")[1] + this.state.userID.substring(1,4) 
        this.props.setName(finalName);        
      };
    
    componentClicked = () => console.log("clicked");
    

    render() {
    let fbContent;

    if (this.state.isLoggedIn) {
      fbContent = (
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
      fbContent = (
        <FacebookLogin
          appId="" //removed id for secutiry reasons
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
          cssClass="btnFacebook"
        />
      );
    }
    return <div>{fbContent}</div>;
  }
}

export default Facebook
