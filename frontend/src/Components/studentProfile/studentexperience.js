import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBar from "../NavBar";
import { connect } from 'react-redux'; 
import axios from 'axios';
import {rooturl} from '../../config';
import {Link} from 'react-router-dom';
import { storeStudentExperienceDetails  } from '../../Actions/profileAction';

function mapStateToProps(state){
    return {
		//profileData: state.profileData,
		studentExperienceDetails: state.profileData.studentExperienceDetails
    }
}

function mapDispatchToProps(dispatch) {
    return {
		//profileupdate : (profiledata) => dispatch(profileupdate(profiledata)),
		storeStudentExperienceDetails: (data) => dispatch(storeStudentExperienceDetails(data))
    };
}
class StudentExperience extends Component{
	constructor(props){
        super(props);
        // this.changeHandler = this.changeHandler.bind(this);
        // this.onChange = this.onChange.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount(){
		this.getStudentExperienceDetails();
	}

	getStudentExperienceDetails =  async () => {
		axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
		let res = await axios.get(rooturl + "/studentProfile/experience");
		if(res.status === 200) {
			this.props.storeStudentExperienceDetails(res.data);
		}
	}

	changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.files[0]
        });
	}
    render() {
        return (
            <div>
                
                <div>
                <div class="container">
                {/* <img src={this.state.imglink} style={{ height: 250, width: 200 }} alt="Profile Picture"/> */}
                <h2 >Experience Details</h2>
                
				{this.props.studentExperienceDetails &&
				this.props.studentExperienceDetails.data.map(studentExp => {
					return (
						<form class="form-horizontal">
						{/* <div class="form-group">
								<label>Profile Picture</label>
								<div class="input-group">
									<span class="input-group-btn">
										<span class="btn btn-default btn-file">Upload Image <input type="file" id="imgInp" name="imglink" onChange = {this.onChange}/></span> 
									</span>
								</div>
							</div> */}
							<div class="form-group">
							<label class="control-label col-sm-4" for="name">Company Name</label>
							<div class="col-sm-10">
								<input type="text" onChange = {this.changeHandler} value={studentExp.COMPANY_NAME} class="form-control" id="name"  placeholder="College Name" name="name" disabled />
							</div>
							</div>
							<div class="form-group">
							<label class="control-label col-sm-6" for="position">Position</label>
							<div class="col-sm-10">
								<input type="text" onChange = {this.changeHandler} value={studentExp.POSITION} class="form-control" id="position"  placeholder="Position" name="position" disabled />
							</div>
							</div>
							<div class="form-group">
							<label class="control-label col-sm-2" for="from">From</label>
							<div class="col-sm-10">
								<input type="date" onChange = {this.changeHandler} value={studentExp.FROM} class="form-control" id="from" placeholder="From" name="from" disabled/>
							</div>
							</div>
							<div class="form-group">
							<label class="control-label col-sm-2" for="to">To</label>
							<div class="col-sm-10">
								<input type="date" onChange = {this.changeHandler} value={studentExp.TO} class="form-control" id="to" placeholder="To" name="to" disabled/>
							</div>
							</div>
							<div class="form-group">
							<label class="control-label col-sm-2" for="location">Location</label>
							<div class="col-sm-10">
								<input type="text" onChange = {this.changeHandler} value={studentExp.LOCATION} class="form-control" id="location" placeholder="Location" name="location" disabled/>
							</div>
							</div>
							
							
							<div class="form-group">        
							<div class="col-sm-offset-2 col-sm-10">
								<button type="submit" class="btn btn-danger" onClick={this.onSubmit}>Submit</button>
								<Link to="/UserDashboard"><button type="button" class="btn btn-danger">Cancel</button></Link>
							</div>
							</div>
						</form>
					);
				  })

                }
                </div>
                </div>
                
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(StudentExperience);