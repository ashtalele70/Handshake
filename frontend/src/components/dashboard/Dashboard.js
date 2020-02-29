import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile, getProfiles } from '../../actions/profile';
import { loadUser } from '../../actions/auth';
import ProfileAbout from '../profile/ProfileAbout';
import ProfileTop from '../profile/ProfileTop';

const Dashboard = ({
	getCurrentProfile,
	getProfiles,
	loadUser,
	auth: { user },
	profile: { profile, loading },
}) => {
	console
	useEffect(() => {
		getCurrentProfile();
		//loadUser();
	}, [getCurrentProfile]);

	return loading && profile === null ? (
		<Spinner />
	) : (
			<Fragment>
				<h1 className='large text-primary'>Dashboard</h1>
				<p className='lead'>
					<i className='fas fa-user' /> Welcome {user && user.name}
				</p>
				{profile !== null ? (
					<Fragment>
						<DashboardActions />

						{/* <div className='profile bg-light'>
							<img src={AVATOR} alt='' className='round-img' />
							<div>
								<h2>{FIRST_NAME}</h2>
								<p>
									{STATUS} {COMPANY && <span> at {COMPANY}</span>}
								</p>
								<p className='my-1'>{LOCATION && <span>{LOCATION}</span>}</p>
								<Link to={`/profile/me`} className='btn btn-primary'>
									View Profile
        						</Link>
							</div>
							<ul>
								{SKILLS.slice(0, 4).map((SKILLS, index) => (
									<li key={index} className='text-primary'>
										<i className='fas fa-check' /> {SKILLS}
									</li>
								))}
							</ul>
						</div> */}
						{/* <Experience experience={profile.experience} />
						<Education education={profile.education} /> */}
						{/* <Profiles profiles= */}
						{/* <div className='my-2'>
							<button className='btn btn-danger' onClick={() => deleteAccount()}>
								<i className='fas fa-user-minus' /> Delete My Account
            </button>
						</div> */}
						{/* <ProfileTop profile={profile} />
						<ProfileAbout profile={profile} /> */}
					</Fragment>
				)

					: (
						<Fragment>
							<p>You have not yet setup a profile, please add some info</p>
							<Link to='/create-profile' className='btn btn-primary my-1'>
								Create Profile
          </Link>
						</Fragment>
					)

				}
			</Fragment>
		);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	//deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ getCurrentProfile }
)(Dashboard);