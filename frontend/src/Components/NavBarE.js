import React, { Component } from 'react';
import cookie from 'react-cookies';
import {Link, Redirect} from 'react-router-dom';
// import bootstrap from 'bootstrap';


class NavBar extends Component{
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }
    constructor(props){
        super(props);
        this.state = {
            userLogin : "",
            userSignUp : "",
            ownerLogin : "",
            ownerSignUp : ""
        }
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler = (e) => {
        this.setState({
            [e.target.id] : true
        })
    }

    render() {


        return (
            <div>
		<nav className='navbar bg-dark'>
			<h1>

				<Link to='/' >Student</Link>
				<Link to='/employer'>Employers</Link>
				{/* <Link to='/'>
					<i className='fa-handshake-o' />Handshake
        		</Link> */}
			</h1>
			{/* {!loading && (
				<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
			)} */}
			
		</nav>
		<div className='dark-overlay'>
				<div className='landing-inner'>
					<h1 className='x-large'>Handshake</h1>
					<h2 className='large'>
						Find your future leaders
         			</h2>
					<div className='buttons'>
						<Link to='/EmployerSignUp' className='btn btn-primary'>
							Sign Up
            			</Link>
						<Link to='/EmployerLogin' className='btn btn-light'>
							Login
            			</Link>
					</div>
				</div>
			</div>

                {/* <nav className='navbar bg-dark'> */}
	            {/* <div class="container"> */}
                {/* <div class="collapse navbar-collapse" id="navbarResponsive"> */}
                {/* <ul class="navbar-nav ml-auto">
                <li class="nav-item"><Link to="/StudentLogin"><button type="button" class="btn" id = "studentLogin">Login</button></Link></li>
                <li class="nav-item"><Link to="/StudentSignUp"><button type="button" class="btn" id = "studentSignUp">Signup</button></Link></li>
                </ul> */}
                {/* </div> */}
	            {/* </div> */}
	            {/* </nav> */}
                {/* <nav class="navbar navbar-expand-sm bg-danger navbar-dark fixed-bottom">
	            <div class="container">
                <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                <li class="nav-item"><Link to="/OwnerLogin"><button type="button" class="btn btn-danger" id = "ownerLogin">Owner Login</button></Link></li>
                <li class="nav-item"><Link to="/OwnerSignUp"><button type="button" class="btn btn-danger" id = "ownerSignUp">Owner Signup</button></Link></li>
                </ul>
                </div>
	            </div>
	            </nav> */}
            </div>
        )
    }

}

export default NavBar;