import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBar from "../NavBar";
import { connect } from 'react-redux'; 
import axios from 'axios';
import {rooturl} from '../../config';
import {Link} from 'react-router-dom';
import { Card, Image, Button, Row, Col, Form } from 'react-bootstrap';
import { storeStudentExperienceDetails, changeExpMode } from '../../Actions/profileAction';

function mapStateToProps(state){
    return {
		//profileData: state.profileData,
		studentExperienceDetails: state.profileData.studentExperienceDetails,
		expMode: state.profileData.expMode
    }
}

function mapDispatchToProps(dispatch) {
    return {
		//profileupdate : (profiledata) => dispatch(profileupdate(profiledata)),
		storeStudentExperienceDetails: (data) => dispatch(storeStudentExperienceDetails(data)),
		changeExpMode: (data) => dispatch(changeExpMode(data)),
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

	updateExperienceInfo = (value) => {
        let newExperience = [];
        Object.assign(newExperience, this.props.studentExperienceDetails);
        newExperience.push(value);            
        this.props.saveExperienceInfo(newExperience);
	}
	
	saveExperienceInfo = (event) => {
        event.preventDefault();
        const data = {
            "COMPANY_NAME": event.target.elements[0].value,            
            "POSITION": event.target.elements[1].value,
            "FROM": event.target.elements[2].value,
            "TO": event.target.elements[3].value,
            "CITY": event.target.elements[4].value,
            "STATE": event.target.elements[5].value,
            "COUNTRY": event.target.elements[6].value,
            "DESCRIPTION": event.target.elements[7].value     
        }
        axios.post(rooturl + "/studentProfile/experience", data)
        .then(res => {
            if(res.status === 200){
                this.updateExperienceInfo(data);
                this.changeExpMode(false);
            }
        })
        .catch(err=>{
            //this.props.authFail(err.response.data.msg);
        })
    }

	changeExpMode = (mode) => {
        this.props.changeExpMode(mode);
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
    
		if(!this.props.expMode && this.props.studentExperienceDetails && this.props.studentExperienceDetails.length){
			content = (
				<div>
					<Card.Text>
						Company: {(this.props.studentExperienceDetails && this.props.studentExperienceDetails.length) ? this.props.studentExperienceDetails[0].COMPANY_NAME : ''}
					</Card.Text>
					<Card.Text>
						Title: {(this.props.studentExperienceDetails && this.props.studentExperienceDetails.length) ? this.props.studentExperienceDetails[0].POSITION : ''}
					</Card.Text>
					<Card.Text>
						Duration: {(this.props.studentExperienceDetails && this.props.studentExperienceDetails.length) ? this.props.studentExperienceDetails[0].start_date + ' to' : ''} {(this.props.studentExperienceDetails && this.props.studentExperienceDetails.length) ? this.props.studentExperienceDetails[0].TO: ''}
					</Card.Text>
					<Card.Text>
						Work Description: {(this.props.studentExperienceDetails && this.props.studentExperienceDetails.length) ? this.props.studentExperienceDetails[0].DESCRIPTION : ''}
					</Card.Text> 
					<Card.Text>
						Location: {(this.props.studentExperienceDetails && this.props.studentExperienceDetails.length) ? this.props.studentExperienceDetails[0].CITY : ''}, {(this.props.studentExperienceDetails && this.props.studentExperienceDetails.length) ? this.props.studentExperienceDetails[0].COUNTRY : ''}
					</Card.Text>               
				</div>
			);
		} else {
			content = (
				<Form onSubmit = {this.saveExperienceInfo}>
				<Form.Row>
				<Form.Group as={Col} controlId="formGridCompanyName">
					<Form.Label>Company Name</Form.Label>
						<Form.Control type="text" placeholder="Enter company name" />
					</Form.Group>
	
	
					<Form.Group as={Col} controlId="formGridTitle">
						<Form.Label>Title</Form.Label>
						<Form.Control type="text" placeholder="Enter title" />
					</Form.Group>
				</Form.Row>
	
				<Form.Row>
				<Form.Group as={Col} controlId="formGridStartDate">
					<Form.Label>Start Date</Form.Label>
						<Form.Control type="date"/>
					</Form.Group>
	
					<Form.Group as={Col} controlId="formGridEndDate">
						<Form.Label>End Date</Form.Label>
						<Form.Control type="date" />
					</Form.Group>
				</Form.Row>
	
				<Form.Row>
					<Form.Group as={Col} controlId="formGridCity">
					<Form.Label>City</Form.Label>
					<Form.Control placeholder = "Enter City"/>
					</Form.Group>
	
					<Form.Group as={Col} controlId="formGridState">
					<Form.Label>State</Form.Label>
					<Form.Control type="text" placeholder="Enter State" />
					</Form.Group>
	
					<Form.Group as={Col} controlId="formGridCountry">
					<Form.Label>Country</Form.Label>
					<Form.Control type="text" placeholder="Enter Country" />
					</Form.Group>
				</Form.Row>
	
				<Form.Group controlId="formGridDesc">
					<Form.Label>Work Description</Form.Label>
					<Form.Control as="textarea" rows="3" placeholder= "Describe roles and responsibilities" />
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
            <Card.Title>Work & Volunteer Experience</Card.Title>
               {content}
            </Card.Body>
            <Card.Footer>
            <Button variant="link" onClick = { () => this.props.changeExpMode(true) }>Add Work Experience</Button>
            </Card.Footer>
        </Card>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(StudentExperience);