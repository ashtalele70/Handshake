import React, { Component } from 'react';
import { Route } from 'react-router';

class Main extends Component {

    render() {

        return (

            < div >
                <Route to='/' component='Navbar'></Route>
            </div >

        )
    }
}

export default Main;