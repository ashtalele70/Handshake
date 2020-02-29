import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (

		<section className='landingc'>

			<div className='dark-overlay'>
				<div className='landing-inner'>
					<h1 className='x-large'>Handshake</h1>
					<h2 className='large'>
						Find your future leaders
         			</h2>
					<div className='buttons'>
						<Link to='/registerc' className='btn btn-primary'>
							Sign Up
            			</Link>
						<Link to='/loginc' className='btn btn-light'>
							Login
            			</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);  