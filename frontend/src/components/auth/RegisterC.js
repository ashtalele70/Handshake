import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/authc';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		LOCATION: '',
		EMAIL_ID: '',
		PASSWORD: '',
		password2: '',
		COMPANY_NAME: '',
	});

	const { LOCATION, EMAIL_ID, PASSWORD, password2, COMPANY_NAME } = formData;

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async e => {
		e.preventDefault();
		if (PASSWORD !== password2) {
			setAlert('Passwords do not match', 'danger');
		} else {
			register({ LOCATION, EMAIL_ID, PASSWORD, password2, COMPANY_NAME });
		}
	};

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<Fragment>
			<h1 className='large text-primary'>Sign Up</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Create Your Account
      </p>
			<form className='form' onSubmit={e => onSubmit(e)}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Company Name'
						name='COMPANY_NAME'
						value={COMPANY_NAME}
						onChange={e => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Company Location'
						name='LOCATION'
						value={LOCATION}
						onChange={e => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='EMAIL_ID'
						value={EMAIL_ID
						}
						onChange={e => onChange(e)}
					/>
					<small className='form-text'>
						This site uses Gravatar so if you want a profile image, use a
						Gravatar email
          			</small>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='PASSWORD'
						value={PASSWORD}
						onChange={e => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Confirm Password'
						name='password2'
						value={password2}
						onChange={e => onChange(e)}
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Register' />
			</form>
			<p className='my-1'>
				Already have an account? <Link to='/loginc'>Sign In</Link>
			</p>
		</Fragment>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(
	mapStateToProps,
	{ setAlert, register }
)(Register);