import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBar from "../NavBar";
import { connect } from 'react-redux'; 
import axios from 'axios';
import {rooturl} from '../../config';
import { Card, Image, Button, Row, Col, Form } from 'react-bootstrap';
// import { faEdit } from "@fortawesome/free-solid-svg-icons";
// import { faCamera } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBarLogin from "../NavBarL";
import { profileupdate,storeStudentDetails  } from '../../Actions/profileAction';
import {Link} from 'react-router-dom';

function mapStateToProps(state){
    return {
		//profileData: state.profileData,
		studentDetails: state.profileData.studentDetails
    }
}

function mapDispatchToProps(dispatch) {
    return {
		//profileupdate : (profiledata) => dispatch(profileupdate(profiledata)),
		storeStudentDetails: (data) => dispatch(storeStudentDetails(data))
    };
}

class StudentDetails extends Component{
	constructor(props){
        super(props);
        // this.changeHandler = this.changeHandler.bind(this);
        // this.onChange = this.onChange.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount(){
		this.getStudentDetails();
	}

	getStudentDetails =  async () => {
		axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
		let res = await axios.get(rooturl + "/studentProfile/current");
		if(res.status === 200) {
			this.props.storeStudentDetails(res.data);
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
                <h2 >User Profile</h2>
                
				{this.props.studentDetails &&
                <form class="form-horizontal">
				<div class="form-group">
                        <label>Profile Picture</label>
                        <div class="input-group">
                            <span class="input-group-btn">
                                <span class="btn btn-default btn-file">Upload Image <input type="file" id="imgInp" name="imglink" onChange = {this.onChange}/></span> 
                            </span>
                        </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="name">Name</label>
                    <div class="col-sm-10">
                        <input type="text" onChange = {this.changeHandler} value={this.props.studentDetails.data.STUDENT.FIRST_NAME} class="form-control" id="name"  placeholder="Name" name="name" disabled />
                    </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-6" for="dob">Date of birth</label>
                    <div class="col-sm-10">
                        <input type="text" onChange = {this.changeHandler} value={this.props.studentDetails.data.STUDENT.DOB} class="form-control" id="dob"  placeholder="mm/dd/yyyy" name="dob" disabled />
                    </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="city">City</label>
                    <div class="col-sm-10">
                        <input type="text" onChange = {this.changeHandler} value={this.props.studentDetails.data.STUDENT.CITY} class="form-control" id="city" placeholder="City" name="city" disabled/>
                    </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="address">State</label>
                    <div class="col-sm-10">
                        <input type="text" onChange = {this.changeHandler} value={this.props.studentDetails.data.STUDENT.STATE} class="form-control" id="state" placeholder="Address" name="address" disabled/>
                    </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="address">Country</label>
                    <div class="col-sm-10">
                        <input type="text" onChange = {this.changeHandler} value={this.props.studentDetails.data.STUDENT.COUNTRY} class="form-control" id="country" placeholder="Address" name="address" disabled/>
                    </div>
                    </div>
                    
                    
                    <div class="form-group">        
                    <div class="col-sm-offset-2 col-sm-10">
                        <button type="submit" class="btn btn-danger" onClick={this.onSubmit}>Submit</button>
                        <Link to="/UserDashboard"><button type="button" class="btn btn-danger">Cancel</button></Link>
                    </div>
                    </div>
                </form>}
                </div>
                </div>
                
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(StudentDetails);
