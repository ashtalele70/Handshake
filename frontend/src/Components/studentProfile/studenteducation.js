import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBar from "../NavBar";
import { connect } from 'react-redux'; 
import axios from 'axios';
import {rooturl} from '../../config';
import {Link} from 'react-router-dom';
import { storeStudentEducationDetails  } from '../../Actions/profileAction';

function mapStateToProps(state){
    return {
		//profileData: state.profileData,
		studentEducationDetails: state.profileData.studentEducationDetails
    }
}

function mapDispatchToProps(dispatch) {
    return {
		//profileupdate : (profiledata) => dispatch(profileupdate(profiledata)),
		storeStudentEducationDetails: (data) => dispatch(storeStudentEducationDetails(data))
    };
}

class StudentEducation extends Component{
	constructor(props){
        super(props);
        // this.changeHandler = this.changeHandler.bind(this);
        // this.onChange = this.onChange.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount(){
		this.getStudentEducationDetails();
	}

	getStudentEducationDetails =  async () => {
		axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
		let res = await axios.get(rooturl + "/studentProfile/education");
		if(res.status === 200) {
			this.props.storeStudentEducationDetails(res.data);
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
                <h2 >Education Details</h2>
                
				{this.props.studentEducationDetails &&
				this.props.studentEducationDetails.data.map(studentEdu => {
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
							<label class="control-label col-sm-4" for="name">College Name</label>
							<div class="col-sm-10">
								<input type="text" onChange = {this.changeHandler} value={studentEdu.COLLEGE_NAME} class="form-control" id="name"  placeholder="College Name" name="name" disabled />
							</div>
							</div>
							<div class="form-group">
							<label class="control-label col-sm-6" for="degree">Degree</label>
							<div class="col-sm-10">
								<input type="text" onChange = {this.changeHandler} value={studentEdu.DEGREE} class="form-control" id="degree"  placeholder="Degree" name="degree" disabled />
							</div>
							</div>
							<div class="form-group">
							<label class="control-label col-sm-2" for="from">From</label>
							<div class="col-sm-10">
								<input type="date" onChange = {this.changeHandler} value={studentEdu.FROM} class="form-control" id="from" placeholder="From" name="from" disabled/>
							</div>
							</div>
							<div class="form-group">
							<label class="control-label col-sm-2" for="to">To</label>
							<div class="col-sm-10">
								<input type="date" onChange = {this.changeHandler} value={studentEdu.TO} class="form-control" id="to" placeholder="To" name="to" disabled/>
							</div>
							</div>
							<div class="form-group">
							<label class="control-label col-sm-2" for="location">Location</label>
							<div class="col-sm-10">
								<input type="text" onChange = {this.changeHandler} value={studentEdu.LOCATION} class="form-control" id="location" placeholder="Location" name="location" disabled/>
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentEducation);