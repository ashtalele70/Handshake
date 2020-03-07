import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBar from "../NavBar";
import './studentlogin.css';
import { connect } from 'react-redux'; 
import axios from 'axios';
import {rooturl} from '../../config';
//import { signup, signin } from '../../Actions/loginAction';
import { signin } from '../../Actions/loginAction';

function mapStateToProps(state){
    return {
        userLoginData: state.userLoginData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // signup: (signupdata) => dispatch(signup(signupdata)),
        signin: (signindata) => dispatch(signin(signindata))
    };
}

class UserLogin extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : "",
            logincheck : "",
            errorMessage : ""
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }



    onSubmit(e){
        e.preventDefault();
        if (this.state.username == "" || this.state.password == "") {
            alert("Username and Password cannot be empty");
        }
        else {
            const data = {
                EMAIL_ID : this.state.username,
                PASSWORD : this.state.password
            }
            axios.defaults.withCredentials = true;

            axios.post(rooturl + '/auth', data)
            .then(response => {
                console.log("Response Status: " + response.status);
                if(response.status === 200){
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('cookie', "studentcookie");
                    localStorage.setItem('cookieemail', response.data.username);
                    localStorage.setItem('cookiename', response.data.name);

                    console.log(response.data.responseMessage);
                    console.log(response.data.token);
                    var signindata = {
                        signinstatus : true,
                        signinmessage : response.data.name + " signed in"
                    }
					this.props.signin(signindata);
					this.props.history.push('/UserDashboard');
                    // this.setState({
                    //     logincheck : true
                    // })
                } else {
                    var signindata = {
                        signinstatus : false,
                        signinmessage : "Sign In Failed"
                    }
                    this.props.signin(signindata);
                    // this.setState({
                    //     logincheck : false,
                    // })
                }
            })
            .catch(err => {
                console.log(err);
                var signindata = {
                    signinstatus : false,
                    signinmessage : "Sign In Failed"
                }
                this.props.signin(signindata);
                // this.setState({
                //     logincheck : false
				// })
				
                alert("Login failed. Try again!");
            })
        }
    }

    render() {
        let redirectVar = null;
        if (localStorage.getItem('token') || cookie.load("cookie")) {
            redirectVar = <Redirect to="/" />;
        }

        return (
            <div>
                {redirectVar}
                <div class="container">
                <div class="row">
                <div class="col-lg-10 col-xl-9 mx-auto">
                <div class="card card-signin flex-row my-5">
                
                <div class="card-body">
                <h5 class="card-title text-center">Student Login</h5>
                <form class="form-signin">
                    
                    
                    <div class="form-label-group">
                    <input type="email" id="email" class="form-control"  onChange = {this.changeHandler} name="username" placeholder="Email address" required/>
                    <label for="email">Email address</label>
                    </div>
                    <hr/>
                    <div class="form-label-group">
                    <input type="password" id="password" class="form-control" onChange = {this.changeHandler} name="password" placeholder="Password" required/>
                    <label for="password">Password</label>
                    </div>              
                    
                    </form>
                
                <button class="btn btn-lg text-uppercase" type="submit" onClick = {this.onSubmit}>Login</button>
                </div>
                </div> 
                </div>
                </div> 
                </div>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);