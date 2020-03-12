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
// import { storeStudentEducationDetails, changeEdMode } from '../../Actions/profileAction';

// function mapStateToProps(state){
//     return {
// 		//profileData: state.profileData,
// 		studentEducationDetails: state.profileData.studentEducationDetails,
// 		edMode: state.profileData.edMode,
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
// 		//profileupdate : (profiledata) => dispatch(profileupdate(profiledata)),
// 		storeStudentEducationDetails: (data) => dispatch(storeStudentEducationDetails(data)),
// 		changeEdMode: (data) => dispatch(changeEdMode(data)),
//     };
// }

class PostAEvent extends Component{
	constructor(props){
		super(props);
		this.saveEventDetails = this.saveEventDetails.bind(this);
	}

	componentDidMount(){
	}


	saveEventDetails = (event) => {
		event.preventDefault();
		const data = {
			TITLE : event.target.elements[0].value,
			POST_DATE : event.target.elements[1].value,
			TIME : event.target.elements[2].value,
			LOCATION : event.target.elements[3].value,
			ELIGIBILITY : event.target.elements[4].value,
			DESCRIPTION : event.target.elements[5].value,
			
		}
		axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
        axios.post(rooturl + "/events", data)
        .then(res => {
            if(res.status === 200){
				this.props.history.push('/EmployerEvents');
                //this.props.saveProfilePic(rooturl + "/" + file.name);
            }
        })
        .catch(err=>{
            //this.props.authFail(err.response.data.msg);
        })
    }


    render() {
		const content = (
				<Form onSubmit = {this.saveEventDetails}>
					<Form.Row>
                    <Form.Group as={Col} controlId="formGridEventName">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter event name" />
                    </Form.Group>

                    {/* <Form.Group as={Col} controlId="formGridJobCategory">
                    <Form.Label>Job Category</Form.Label>
                    <Form.Control as="select">
                        <option>Choose...</option>
                        <option>Internship</option>
                        <option>Full-Time</option>
                        <option>Part-Time</option>
                        <option>On-Campus</option>
                    </Form.Control>
                    </Form.Group> */}
                </Form.Row>

				<Form.Row>
				<Form.Group as={Col} controlId="formGridEventDate">
                    <Form.Label>Event Date</Form.Label>
                    <Form.Control type="date"/>
                </Form.Group>
				<Form.Group as={Col} controlId="formGridEventTime">
                    <Form.Label>Event Time</Form.Label>
                    <Form.Control type="time"/>
                </Form.Group>
				</Form.Row>

				<Form.Row>
				<Form.Group as={Col} controlId="formGridLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control placeholder="Enter location" />
                </Form.Group>
				<Form.Group as={Col} controlId="formGridEligibility">
                    <Form.Label>Eligibility</Form.Label>
                    <Form.Control as="select">
                        <option>Choose...</option>
						<option>Computer Science</option>
                        <option>Software Engineering</option>
						<option>Computer Engineering</option>
                        <option>Electrical Engineering</option>
                        <option>Engineering Management</option>
						<option>All</option>
                    </Form.Control>
                </Form.Group>
				</Form.Row>
				<Form.Row>
				<Form.Group as={Col} controlId="formGridDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control placeholder="Enter description" />
                </Form.Group>
				</Form.Row>
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
            <Card.Title>Post An Event</Card.Title>
            {content}            
            </Card.Body>
            <Card.Footer>
            </Card.Footer>
        	</Card>
		</div>
        )
    }

}

export default PostAEvent;