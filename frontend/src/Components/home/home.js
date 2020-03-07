import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBar from "../NavBar";
import './home.css';

class Home extends Component{

    render() {

        return (
            <div>
                
                <div class="masthead">
                <NavBar />
                </div>
            </div>
        )
    }

}

export default Home;