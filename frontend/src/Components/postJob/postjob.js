import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBar from "../NavBar";
import { connect } from 'react-redux'; 
import axios from 'axios';
import {rooturl} from '../../config';
import {Link} from 'react-router-dom';
import NavBarLoginLE from "../NavBarLE";
import { Card, Image, Button, Row, Col, Form } from 'react-bootstrap';
import { storeStudentEducationDetails, changeEdMode } from '../../Actions/profileAction';

function mapStateToProps(state){
    return {
		//profileData: state.profileData,
		studentEducationDetails: state.profileData.studentEducationDetails,
		edMode: state.profileData.edMode,
    }
}

function mapDispatchToProps(dispatch) {
    return {
		//profileupdate : (profiledata) => dispatch(profileupdate(profiledata)),
		storeStudentEducationDetails: (data) => dispatch(storeStudentEducationDetails(data)),
		changeEdMode: (data) => dispatch(changeEdMode(data)),
    };
}

class PostAJob extends Component{
	constructor(props){
		super(props);
		this.saveJobDetails = this.saveJobDetails.bind(this);
	}

	componentDidMount(){
	}


	saveJobDetails = (event) => {
		event.preventDefault();
		const data = {
			TITLE : event.target.elements[0].value,
			JOB_TYPE : event.target.elements[1].value,
			APP_DEADLINE : event.target.elements[2].value,
			POST_DATE : event.target.elements[3].value,
			LOCATION : event.target.elements[4].value,
			SALARY : event.target.elements[5].value,
			DESCRIPTION : event.target.elements[6].value,
		}
		axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
        axios.post(rooturl + "/jobs", data)
        .then(res => {
            if(res.status === 200){
                //this.props.saveProfilePic(rooturl + "/" + file.name);
            }
        })
        .catch(err=>{
            //this.props.authFail(err.response.data.msg);
        })
    }


    render() {
		const content = (
				<Form onSubmit = {this.saveJobDetails}>
					<Form.Row>
                    <Form.Group as={Col} controlId="formGridJobTitle">
                    <Form.Label>Job Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter job title" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridJobCategory">
                    <Form.Label>Job Category</Form.Label>
                    <Form.Control as="select">
                        <option>Choose...</option>
                        <option>Internship</option>
                        <option>Full-Time</option>
                        <option>Part-Time</option>
                        <option>On-Campus</option>
                    </Form.Control>
                    </Form.Group>
                </Form.Row>

				<Form.Row>
				<Form.Group as={Col} controlId="formGridApplicationDeadline">
                    <Form.Label>Application Deadline</Form.Label>
                    <Form.Control type="date"/>
                </Form.Group>
				<Form.Group as={Col} controlId="formGridPostingDate">
                    <Form.Label>Posting Date</Form.Label>
                    <Form.Control type="date"/>
                </Form.Group>
				</Form.Row>

				<Form.Row>
				<Form.Group as={Col} controlId="formGridLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control placeholder="Enter location" />
                </Form.Group>
				<Form.Group as={Col} controlId="formGridLocation">
                    <Form.Label>Salary</Form.Label>
                    <Form.Control placeholder="Enter salary" />
                </Form.Group>
				</Form.Row>
                <Form.Group controlId="formGridYear">
                    <Form.Label>Job Description</Form.Label>
                    <Form.Control type="	"/>
                </Form.Group>
    

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
		)
        return (
		<div>
			<NavBarLoginLE />
			<Card >
            <Card.Body>
            <Card.Title>Post A Job</Card.Title>
            {content}            
            </Card.Body>
            <Card.Footer>
            </Card.Footer>
        	</Card>
		</div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(PostAJob);