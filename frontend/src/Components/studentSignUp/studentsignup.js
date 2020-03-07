import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBar from "../NavBar";
import './studentsignup.css';
import axios from 'axios';
import {rooturl} from '../../config';
import { signup, signin } from '../../Actions/loginAction';
import { connect } from 'react-redux';

function mapStateToProps(state){
    return {
        userLoginData: state.userLoginData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signup: (signupdata) => dispatch(signup(signupdata)),
        signin: (signindata) => dispatch(signin(signindata))
    };
}

class UserSignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            fname : "",
            lname : "",
            username : "",
			password : "",
			collegename: "",
            confirmpassword : "",
            signupcheck : ""
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    changeHandler(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        if (this.state.email == "" || this.state.password == "") {
            alert("Username and Password cannot be empty");
        } else if(this.state.password != this.state.confirmpassword){
            alert("Passwords do not match");
        } else {
            const data = {
				FIRST_NAME : this.state.fname,
				LAST_NAME : this.state.lname,
				EMAIL_ID : this.state.email,
				PASSWORD : this.state.password,
				COLLEGE_NAME : this.state.collegename
                //name : this.state.fname + " " + this.state.lname
            }
            axios.defaults.withCredentials = true;

            axios.post(rooturl + '/students', data)
            .then(response => {
                console.log("Response Status: " + response.status);
                if(response.status === 200){
                    console.log(response.status);
                    var signupdata = {
                        signupstatus : true,
                        signupmessage : "Sign Up Successful"
                    }
                    this.props.signup(signupdata);
                    this.setState({
                        signupcheck : true
                    })
                } else {
                    var signupdata = {
                        signupstatus : false,
                        signupmessage : "Sign Up Unsuccessful"
                    }
                    this.props.signup(signupdata);
                    this.setState({
                        signupcheck : false
                    })
                    alert("Signup Failed. Please try again!");
                }
            })
            .catch(err => {
                console.log(err);
                var signupdata = {
                    signupstatus : false,
                    signupmessage : "Sign Up Unsuccessful"
                }
                this.props.signup(signupdata);
                alert("Signup Failed. Please try again!");
                this.setState({
                    signupcheck : false
                })
                
            })
        }
    }

    render() {
        let redirectVar = null;
        if(this.state.signupcheck){
            redirectVar = <Redirect to= "/"/>
        }

        return (
            <div>
            {redirectVar}
                <div class="container">
                <div class="row">
                <div class="col-lg-10 col-xl-9 mx-auto">
                <div class="card card-signin flex-row my-5">
                
                <div class="card-body">
                <h5 class="card-title text-center">User Registration</h5>
                <form class="form-signin">
                    <div class="form-label-group">
                    <input type="text" name="fname" onChange={this.changeHandler} class="form-control" placeholder="First Name" id="fname" required />
                    <label for="fname">First Name</label>
                    </div>
                    <div class="form-label-group">
                    <input type="text" name="lname" onChange={this.changeHandler} class="form-control" placeholder="Last Name" id="lname"/>
                    <label for="lname">Last Name</label>
                    </div>
                    <div class="form-label-group">
                    <input type="email" name="email" onChange = {this.changeHandler} class="form-control" placeholder="Email address" id="email" required/>
                    <label for="email">Email address</label>
                    </div>
                    <div class="form-label-group">
                    <input type="text" name="collegename" onChange = {this.changeHandler} class="form-control" placeholder="College Name" id="collegename" required/>
                    <label for="collegename">College Name</label>
                    </div>
                    <div class="form-label-group">
                    <input type="password" name="password" onChange = {this.changeHandler} class="form-control" placeholder="Password" id="password" required/>
                    <label for="password">Password</label>
                    </div>              
                    <div class="form-label-group">
                    <input type="password" name="confirmpassword" onChange = {this.changeHandler} class="form-control" placeholder=" Confirm Password"  id="confirmpassword" required/>
                    <label for="confirmpassword">Confirm password</label>
                    </div>
                    <button class="btn btn-lg btn-block text-uppercase" type="submit" onClick={this.onSubmit}>SignUp</button>
                </form>
                </div>
                </div> 
                </div>
                </div> 
                </div>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(UserSignUp);