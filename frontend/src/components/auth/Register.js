import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		FIRST_NAME: '',
		LAST_NAME: '',
		EMAIL_ID: '',
		PASSWORD: '',
		password2: '',
		COLLEGE_NAME: '',
	});

	const { FIRST_NAME, LAST_NAME, EMAIL_ID, PASSWORD, password2, COLLEGE_NAME } = formData;

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async e => {
		e.preventDefault();
		if (PASSWORD !== password2) {
			setAlert('Passwords do not match', 'danger');
		} else {
			register({ FIRST_NAME, LAST_NAME, EMAIL_ID, PASSWORD, COLLEGE_NAME });
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
				<div className="form-group">
					<select name="COLLEGE_NAME" value={COLLEGE_NAME} required onChange={e => onChange(e)}>
						<option value="">* Select College Name</option>
						<option value="San Jose State University">San Jose State University</option>
						<option value="University of Texas, Dallas">University of Texas, Dallas</option>
						<option value="San Diego State University<">San Diego State University</option>
						<option value="University of Colorado, Boulder">University of Colorado, Boulder</option>
						<option value="North Carolina State University">North Carolina State University</option>
						<option value="Columbia State University">Columbia State University</option>
						<option value="Standford University">Standford University</option>
						<option value="Other">Other</option>
					</select>
					<small className="form-text">
						Give us an idea of where you are studying
          </small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='First Name'
						required='true'
						name='FIRST_NAME'
						value={FIRST_NAME}
						onChange={e => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						required='true'
						placeholder='Last Name'
						name='LAST_NAME'
						value={LAST_NAME}
						onChange={e => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='email'
						required='true'
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
						required='true'
						placeholder='Password'
						name='PASSWORD'
						value={PASSWORD}
						onChange={e => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						required='true'
						placeholder='Confirm Password'
						name='password2'
						value={password2}
						onChange={e => onChange(e)}
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Register' />
			</form>
			<p className='my-1'>
				Already have an account? <Link to='/login'>Sign In</Link>
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