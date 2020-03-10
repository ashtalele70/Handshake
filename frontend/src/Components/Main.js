import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './home/home';
import EmployerHome from './employerHome/employerhome'
import UserSignUp from "./studentSignUp/studentsignup";
import UserLogin from './studentLogin/studentlogin';
import EmployerLogin from './employerLogin/employerlogin';
import EmployerSignUp from './employerSignUp/employersignup';
import StudentDashboard from './studentDashboard/studentdashboard';
import EmployerDashboard from './employerDashboard/employerdashboard';
import StudentProfile from './studentProfile/profile';
import cookie from 'react-cookies';

class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route exact path='/' component={Home} />
                <Route exact path='/employer' component={EmployerHome} />
                <Route path="/StudentSignUp" component={UserSignUp}/>
                <Route path="/StudentLogin" component={UserLogin}/>
				<Route path="/EmployerSignUp" component={EmployerSignUp}/>
                <Route path="/EmployerLogin" component={EmployerLogin}/>
				<Route path="/StudentDashboard" component={StudentDashboard}/>
				<Route path="/EmployerDashboard" component={EmployerDashboard}/>
                <Route path="/StudentProfile" component={StudentProfile}/>
            </div>
        )
    }
}


//Export The Main Component
export default Main;