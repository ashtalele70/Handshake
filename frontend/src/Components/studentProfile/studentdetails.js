import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBar from "../NavBar";
import { connect } from 'react-redux'; 
import axios from 'axios';
import {rooturl} from '../../config';
import { Card, Image, Button, Row, Col, Form} from 'react-bootstrap';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBarLogin from "../NavBarL";
import { profileupdate,storeStudentDetails, changeMode, enableSave, saveProfilePic, storeStudentEducationDetails  } from '../../Actions/profileAction';
import {Link} from 'react-router-dom';

function mapStateToprops(state){
    return {
		//profileData: state.profileData,
		studentDetails: state.profileData.studentDetails,
		studentEducationDetails: state.profileData.studentEducationDetails,
		mode: state.profileData.mode,
        save: state.profileData.save,
        profile_pic: state.profileData.profile_pic,
    }
}

function mapDispatchToprops(dispatch) {
    return {
		//profileupdate : (profiledata) => dispatch(profileupdate(profiledata)),
		storeStudentDetails: (data) => dispatch(storeStudentDetails(data)),
		changeMode: (data) => dispatch(changeMode(data)),
		enableSave: (data) => dispatch(enableSave(data)),
		saveProfilePic: (data) => dispatch(saveProfilePic(data)),
		storeStudentEducationDetails: (data) => dispatch(storeStudentEducationDetails(data)),
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
		this.getStudentEducationDetails();
	}

	getStudentDetails =  async () => {
		axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
		let res = await axios.get(rooturl + "/studentProfile/current");
		if(res.status === 200) {
			if(res.data.STUDENT.PROFILE_PICTURE) {
				this.props.saveProfilePic(rooturl + "/" + res.data.STUDENT.PROFILE_PICTURE);
			}
			// this.props.storeStudentDetails(res.data);
			//this.props.saveProfilePic(res.data);
			this.props.storeStudentDetails({...res.data, editMode:false});
                    
			if(res.data.career_obj){
				this.props.save = false;
			}
		}
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

	addProfilePic = (event) => {
        event.preventDefault();
        const formData = new FormData();
        const file = event.target.elements[0].files[0];
        formData.append('profile_pic', event.target.elements[0].files[0]);
        formData.append('id', this.props.studentDetails.data.STUDENT.id);
        axios.post(rooturl + "/studentProfile/profilepic", formData, {
            headers: {
                'content-type':'multipart/form-data'
            }
        })
        .then(res => {
            if(res.status === 200){
                this.props.saveProfilePic(rooturl + "/" + file.name);
            }
        })
        .catch(err=>{
            //this.props.authFail(err.response.data.msg);
        })
    }
	
    render() {

		let content;
    
		if(!this.props.mode){
			content = (
				<div>
					<Row className="justify-content-center">
						<Card.Title>{this.props.studentDetails ? (this.props.studentDetails.data.STUDENT.FIRST_NAME + ' ' + this.props.studentDetails.data.STUDENT.LAST_NAME) : ''}</Card.Title>
					</Row>
					{/* <Row className="justify-content-center">
						<Card.Text>
							{this.props.studentEducationDetails && this.props.studentEducationDetails[0].COLLEGE_NAME }
						</Card.Text>
					</Row> */}
					{/* <Row className="justify-content-center">
						<Card.Text>
							{(this.props.education && this.props.education.length) ? (this.props.education[0].degree + ', ' + this.props.education[0].major) : ''}
						</Card.Text>
					</Row>
					<Row className="justify-content-center">
						<Card.Text>
						{(this.props.education && this.props.education.length) ? 'GPA: ' + this.props.education[0].cgpa : ''}
						</Card.Text>
					</Row> */}
				</div>
			);
		} else {
			content = (
				<div>
					<Form method="post" onSubmit={this.addProfilePic} className="pl-5 pt-2">
						<div>
							<Form.Control type="file" id="file" name="file" multiple />
						</div>
						<div>
						<FontAwesomeIcon icon={faCamera} style={{marginBottom:'5px'}}/><Button type="submit" variant="link" >
							<p className="text-muted font-weight-bold">Add Photo</p>
						</Button>
						</div>
					</Form>
					<Form onSubmit={this.props.submitHandler}>
						<Row>
							<Col>
								<Form.Label>
									First Name
							</Form.Label>
								<Form.Control defaultValue={this.props.studentDetails ? this.props.studentDetails.data.STUDENT.FIRST_NAME : ''} readOnly />
							</Col>
							<Col>
								<Form.Label>
									Last Name
								</Form.Label>
								{/* <Form.Control defaultValue={this.props.details ? this.props.studentDetails.data.STUDENT.LAST_NAME : ''} readOnly placeholder="Last name" onChange={this.props.updateHandler}/> */}
								<Form.Control defaultValue={this.props.studentDetails ? this.props.studentDetails.data.STUDENT.LAST_NAME : ''} readOnly />
							</Col>                    
						</Row>
						{/* <Row>
							<Col>
							<Form.Control plaintext readOnly defaultValue={(this.props.education && this.props.education.length) ? this.props.education[0].college_name : ''} />
							<Form.Control plaintext readOnly defaultValue={(this.props.education && this.props.education.length) ? (this.props.education[0].degree + ', ' + this.props.education[0].major) : ''} />
							</Col>
						</Row> */}
						<Row className="mt-2">
							<Col>
								<Button type="submit" >Save</Button>
								<Button type="button" className="ml-2" onClick={this.props.changeMode}>Cancel</Button>
							</Col>
						</Row>
					</Form>
				</div>            
			)
		}
			
		return (
			<Card>
				<Card.Body>
				<Row><Button variant="link" style={{paddingLeft: '300px'}} onClick={this.props.changeMode}><FontAwesomeIcon icon={faEdit} /></Button></Row>
				<Row className="justify-content-center">
					<Image src={this.props.profile_pic} width="100"
						height="100" roundedCircle/>
				</Row>
				{content}
				</Card.Body>
			</Card>
		);
    }

}

export default connect(mapStateToprops, mapDispatchToprops)(StudentDetails);
