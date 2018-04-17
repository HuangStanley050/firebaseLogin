import React from "react";
import "./authenticate.css";
import firebase from "firebase";


//=============Firebase init======================/

var config = {
    apiKey: "AIzaSyAr0Ckw0-j9KMfydGNDGd_qHor7GEUO288",
    authDomain: "surveyfirebase-51d78.firebaseapp.com",
    databaseURL: "https://surveyfirebase-51d78.firebaseio.com",
    projectId: "surveyfirebase-51d78",
    storageBucket: "surveyfirebase-51d78.appspot.com",
    messagingSenderId: "871507352234"
};
firebase.initializeApp(config);

//===============end firebase init=====================//

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            err: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
        this.logOut = this.logOut.bind(this);
        this.google=this.google.bind(this);
    }

    handleChange(e) {
        //alert(e.target.value);
        //this.setState({username:e.target.value});
        this.setState({
            [e.target.name]: e.target.value });
    }

    login() {
        const email = this.state.username;
        const passwd = this.state.password;
        //alert(email+" "+passwd);
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email, passwd);

        promise.then(user => {
            var logout = document.getElementById("logout");
            this.setState({ err: "Welcome " + user.email });
            logout.classList.remove("hide");

        });

        promise.catch(e => {
            var error = e.message;
            alert(error);
            this.setState({ err: error });

        });
    }

    signUp() {
        const email = this.state.username;
        const passwd = this.state.password;
        //alert(email+" "+passwd);
        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(email, passwd);

        promise
            .then(user => {
                var error = "Welcome " + user.email;
                firebase.database().ref("users/" + user.uid).set({
                    email: user.email
                });
                //console.log(user);
                this.setState({ err: error });
            });

        promise
            .catch(e => {
                var error = e.message;
                alert(error);
                this.setState({ err: error });
            });
    }

    logOut() {
        firebase.auth().signOut();
        var logout=document.getElementById("logout");
        var msg="Logged out, thank you";
        this.setState({err:msg});
        logout.classList.add("hide");

    }
    google(){
        var provider=new firebase.auth.GoogleAuthProvider();
        var promise=firebase.auth().signInWithPopup(provider);
        
        promise.then(result=>{
            var logout=document.getElementById("logout");
            logout.classList.remove("hide");
            var user=result.user;
            firebase.database().ref("users/"+user.uid).set({
                email:user.email,
                name:user.displayName
            });
            this.setState({err:"Welcome "+user.displayName});
        });
        
        promise.catch(e=>{
            var msg=e.message;
            this.setState({err:msg});
        });
        
    }

    render() {
        return (
            <div className="wrapper">
                  
                
                  <div className="container">
                    <label for="uname"><b>Username</b></label>
                    <input id="email" type="text" placeholder="Enter email" name="username" onChange={this.handleChange} />
                
                    <label for="psw"><b>Password</b></label>
                    <input id="password" type="password" placeholder="Enter Password" name="password" onChange={this.handleChange}/>
                        
                    <button type="submit" onClick={this.login}>Login</button>
                    <p>{this.state.err}</p>
                    
                  </div>
                
                  <div className="container" >
                    <button onClick={this.signUp} type="button" className="cancelbtn">Sign Up</button>
                     <button onClick={this.google} type="button" className="google">Sign in with Google</button>
                    
                    <button onClick={this.logOut} id="logout" type="button" className="logoutbtn hide">Log Out</button>
                    
                  </div>
                </div>
        );
    }
}

export default Auth;
