import React, { Component } from 'react';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';
import bootstrap from 'bootstrap';
import {Redirect} from 'react-router';
import { signout } from '../Actions/loginAction';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'


function mapStateToProps(state){
    return {
        userLoginData: state.userLoginData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signout : () => dispatch(signout())
    };
}

class NavBarLoginLE extends Component{
    constructor(props){
        super(props);
        this.state = {
            user : ""
        }
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount(){
        let username = localStorage.getItem("cookiename");;
        this.setState({
            user : username
        })
        //console.log("Cookie Name : " + this.state.user);
    }

    handleLogout = () => {
        cookie.remove('cookie', { path: '/' });
        cookie.remove('cookieemail', { path: '/' });
        cookie.remove('cookiename', { path: '/' });
        cookie.remove('cookieempname', { path: '/' });
        localStorage.clear();
        this.props.signout();

    }

    render() {
        let redirectVar = null;
        let dashboard = null;
        if (!localStorage.getItem("token")) {
            console.log("LocalStorage: " + localStorage.getItem("token"));
            localStorage.clear();
            redirectVar = <Redirect to="/" />;
        } else {
            if(localStorage.getItem("cookie") == "employercookie")
                dashboard = "/EmployerDashboard"
            else{
                dashboard = "/StudentDashboard"
            }
        }

        
        return (    
            <div>
            {redirectVar}
            <Navbar bg="light" expand="lg">
				<Navbar.Brand href="/StudentDashboard">Dashboard</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
					<Nav.Link href="/StudentDashboard">Home</Nav.Link>
					{/* <Nav.Link href="#link">Dashboard</Nav.Link> */}
					<NavDropdown title="Menu" id="collasible-nav-dropdown">
						<NavDropdown.Item style={{color:'black'}} href="/PostAJob">Post a Job</NavDropdown.Item>
						<NavDropdown.Item style={{color:'black'}} href="/PostEvent">Post an Event</NavDropdown.Item>
						<NavDropdown.Item style={{color:'black'}} href="/StudentRegisteredEvent">Registered Events</NavDropdown.Item>
						<NavDropdown.Item style={{color:'black'}} href="/StudentAppliedJob">Applied Jobs</NavDropdown.Item>
						{/* <NavDropdown.Divider />
						<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
					</NavDropdown>
					<Nav.Link href="/">Logout</Nav.Link>
					</Nav>
					{/* <Form inline>
					<FormControl type="text" placeholder="Search" className="mr-sm-2" />
					<Button variant="outline-success">Search</Button>
					</Form> */}
				</Navbar.Collapse>
			</Navbar>	
            </div>
        )
    }

}

export default NavBarLoginLE;