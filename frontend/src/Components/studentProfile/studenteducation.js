import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBar from "../NavBar";
import { connect } from 'react-redux'; 
import axios from 'axios';
import {rooturl} from '../../config';
import {Link} from 'react-router-dom';
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

	updateEducationInfo = (value) => {
        let newEducation = [];
        Object.assign(newEducation, this.props.studentEducationDetails);
        newEducation.push(value);            
        this.props.saveEducationInfo(newEducation);
	}
	
	saveEducationInfo = (event) => {
        event.preventDefault();
        const data = {
            "COLLEGE_NAME": event.target.elements[0].value,            
            "DEGREE": event.target.elements[1].value,
            "YEAR_OF_PASSING": event.target.elements[2].value,
            "MAJOR": event.target.elements[3].value,
            "CITY": event.target.elements[4].value,
            "STATE": event.target.elements[5].value, 
            "GPA": event.target.elements[6].value           
        }
        axios.post(rooturl + "/studentProfile/education", data)
        .then(res => {
            if(res.status === 200){
                this.updateEducationInfo(data);
                this.changeEdMode(false);
                //this.props.mode = false;
            }
        })
        .catch(err=>{
            //this.props.authFail(err.response.data.msg);
        })
	}
	changeEdMode = (mode) => {
        this.props.changeEdMode(mode);
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
		let content;
    
		if(!this.props.edMode && this.props.studentEducationDetails && this.props.studentEducationDetails.length){
			content = (
				<div>
					<Card.Text>
						College name: {(this.props.studentEducationDetails && this.props.studentEducationDetails.length) ? this.props.studentEducationDetails[0].COLLEGE_NAME : ''}
					</Card.Text>
					<Card.Text>
						Degree: {(this.props.studentEducationDetails && this.props.studentEducationDetails.length) ? this.props.studentEducationDetails[0].DEGREE : ''}
					</Card.Text>
					<Card.Text>
						Year of Passing: {(this.props.studentEducationDetails && this.props.studentEducationDetails.length) ? this.props.studentEducationDetails[0].YEAR_OF_PASSING: ''}
					</Card.Text>
					<Card.Text>
						Major: {(this.props.studentEducationDetails && this.props.studentEducationDetails.length) ? this.props.studentEducationDetails[0].MAJOR: ''}
					</Card.Text>
					<Card.Text>
						GPA: {(this.props.studentEducationDetails && this.props.studentEducationDetails.length) ? this.props.studentEducationDetails[0].GPA: ''}
					</Card.Text>
				</div>
			);
		} else {
			content = (
				<Form onSubmit = {this.saveEducationInfo}>
					<Form.Row>
                    <Form.Group as={Col} controlId="formGridCollege">
                    <Form.Label>College Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter college" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDegree">
                    <Form.Label>Degree</Form.Label>
                    <Form.Control as="select">
                        <option>Choose...</option>
                        <option>High School</option>
                        <option>Associates</option>
                        <option>Certificate</option>
                        <option>Advanced Certificate</option>
                        <option>Bachelors</option>
                        <option>Masters</option>
                        <option>Doctorate</option>
                        <option>Postdoctoral Studies</option>
                        <option>Non-Degree seeking</option>
                    </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridYear">
                    <Form.Label>Year of Passing</Form.Label>
                    <Form.Control placeholder="Enter year of passing" />
                </Form.Group>

                <Form.Group controlId="formGridMajor">
                    <Form.Label>Major</Form.Label>
                    <Form.Control placeholder="Enter major" />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" placeholder="Enter state" />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridGpa">
                    <Form.Label>GPA</Form.Label>
                    <Form.Control type="number" placeholder="Enter GPA" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }

        return (
		<Card >
            <Card.Body>
            <Card.Title>Education</Card.Title>
            {content}            
            </Card.Body>
            <Card.Footer>
            <Button variant="link" onClick = { () => this.props.changeEdMode(true) }>Add School</Button>
            </Card.Footer>
        </Card>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(StudentEducation);