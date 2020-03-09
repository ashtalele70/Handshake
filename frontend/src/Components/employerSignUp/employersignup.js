import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBar from "../NavBarE";
import './employersignup.css'; 
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

class OwnerSignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            companyname : "",
            location : "",
            email : "",
            password : "",
            confirmpassword : "",
            signupcheck : ""
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
        if (this.state.email == "" || this.state.password == "" || this.state.password != this.state.confirmpassword) {
            alert("Provide all valid inputs");
        } else {
            const data = {
                EMAIL_ID : this.state.email,
                PASSWORD : this.state.password,
                COMPANY_NAME : this.state.companyname,
                LOCATION : this.state.location
            }
            axios.defaults.withCredentials = true;

            axios.post(rooturl + '/companies', data)
            .then(response => {
                console.log("Response Status: " + response.status);
                if(response.status === 200){
                    console.log(response.status);
                    var signupdata = {
                        signupstatus : true,
                        signupmessage : "Sign Up Successful"
                    }
                    this.props.signup(signupdata);
                    // this.setState({
                    //     logincheck : true
                    // })
                    // this.setState({
                    //     signupcheck : true
                    // })
                } else {
                    var signupdata = {
                        signupstatus : false,
                        signupmessage : "Sign Up Unsuccessful"
                    }
                    this.props.signup(signupdata);
                    // this.setState({
                    //     signupcheck : false
                    // })
                    alert("Signup Failed. Please try again!");
                }
            })
            .catch(err => {
                console.log(err);
                alert("Signup Failed. Please try again!");
                var signupdata = {
                    signupstatus : false,
                    signupmessage : "Sign Up Unsuccessful"
                }
                this.props.signup(signupdata);
                // this.setState({
                //     signupcheck : false
                // })
                
            })
        }
    }

    render() {
        let redirectVar = null;
        if(this.state.signupcheck){
            redirectVar = <Redirect to= "/employer"/>
        }

        return (
            <div>
            {redirectVar}
                <div class="container">
                <div class="row">
                <div class="col-lg-10 col-xl-9 mx-auto">
                <div class="card card-signin flex-row my-5">
                
                <div class="card-body">
                <h5 class="card-title text-center">Employer Registration</h5>
                <form class="form-signin" onSubmit={this.onSubmit}>
                    <div class="form-label-group">
                    <input type="text" name="companyname" id="companyname" onChange={this.changeHandler} class="form-control" placeholder="Company Name" required />
                    <label for="companyname">Company Name</label>
                    </div>
                    <div class="form-label-group">
                    <input type="text" name="location" id="location" onChange={this.changeHandler} class="form-control" placeholder="Location"/>
                    <label for="location">Location</label>
                    </div>
                    <div class="form-label-group">
                    <input type="email" name="email" id="email" onChange={this.changeHandler} class="form-control" placeholder="Email address" required/>
                    <label for="email">Email address</label>
                    </div>
                    <hr/>
                    <div class="form-label-group">
                    <input type="password" name="password" id="password" onChange={this.changeHandler} class="form-control" placeholder="Password" required/>
                    <label for="password">Password</label>
                    </div>              
                    <div class="form-label-group">
                    <input type="password" name="confirmpassword" id="confirmpassword" onChange={this.changeHandler} class="form-control" placeholder="Password" required/>
                    <label for="confirmpassword">Confirm password</label>
                    </div>
                    <button class="btn btn-lg btn-block text-uppercase" type="submit">SignUp</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(OwnerSignUp);