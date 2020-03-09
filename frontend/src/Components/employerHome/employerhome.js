import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBarE from "../NavBarE";
import './employerhome.css';

class EmployerHome extends Component{

    render() {

        return (
            <div>
                
                <div class="">
                <NavBarE />
                </div>
            </div>
        )
    }

}

export default EmployerHome;