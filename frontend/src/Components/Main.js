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
import StudentEvent from './studentEvent/event';
import StudentRegisteredEvent from './studentRegisteredEvent/studentregisteredevents';
import StudentAppliedJob from './studentAppliedJob/studentappliedjob';
import PostAJob from './postJob/postjob';
import PostAEvent from './postEvent/postevent';
import EmployerJobs from './employerJobs/employerjobs';
import EmployerEvents from './EmployerEvents/employerevents';
import EmployerStudentsTab from './employerStudentsTab/employerstudentstab';

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
				<Route path="/StudentEvent" component={StudentEvent}/>
				<Route path="/StudentRegisteredEvent" component={StudentRegisteredEvent}/>
				<Route path="/StudentAppliedJob" component={StudentAppliedJob}/>
				<Route path="/PostAJob" component={PostAJob}/>
				<Route path="/PostAEvent" component={PostAEvent}/>
				<Route path="/EmployerJobs" component={EmployerJobs}/>
				<Route path="/EmployerEvents" component={EmployerEvents}/>
				<Route path="/EmployerStudentsTab" component={EmployerStudentsTab}/>
				
            </div>
        )
    }
}


//Export The Main Component
export default Main;