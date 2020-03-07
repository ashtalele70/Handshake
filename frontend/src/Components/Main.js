import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './home/home';
import UserSignUp from "./studentSignUp/studentsignup";
import UserLogin from './studentLogin/studentlogin';
import UserDashboard from './studentDashboard/studentDashboard';
import cookie from 'react-cookies';

class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route exact path='/' component={Home} />
                
                <Route path="/StudentSignUp" component={UserSignUp}/>
                <Route path="/StudentLogin" component={UserLogin}/>
				<Route path="/UserDashboard" component={UserDashboard}/>
                
            </div>
        )
    }
}


//Export The Main Component
export default Main;