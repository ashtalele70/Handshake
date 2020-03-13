import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import FileViewer from 'react-file-viewer';
import { Container, Row, Col, Form, Button, Card, Image} from 'react-bootstrap';
import NavBarLoginLE from "../NavBarLE";
import {rooturl} from '../../config';
import { showAllJobs, showSelectedJob, showFilterJobs} from '../../Actions/dashboardAction';
import { saveProfilePic, changeMode } from '../../Actions/profileAction';

const mapStateToProps = (state) => {
    return {
        alljobs: state.userDashboardData.alljobs,
		 filterjobs: state.userDashboardData.filterjobs,
		 showjob: state.userDashboardData.showjob,
		 profile_pic: state.profileData.profile_pic,
		 mode: state.profileData.mode,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
		showAllJobs: (data) => dispatch(showAllJobs(data)),
		//this show filter job is used to populated student
		 showFilterJobs: (data) => dispatch(showFilterJobs(data)),
		 showSelectedJob: (data) => dispatch(showSelectedJob(data)),
		 saveProfilePic: (data) => dispatch(saveProfilePic(data)),
		 changeMode: (data) => dispatch(changeMode(data)),
    }
}

class EmployerJobs extends Component {

	 selectedJob = {};

    constructor(){
		super();
		// this.search = this.search.bind(this);
    }
	componentDidMount() {
        this.getJobs();
	}
	getJobs = () => {
        axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
        axios.get(rooturl  + "/jobs/employerjobs")
        .then(res => {
            if(res.status === 200){
                if(res.data){
                    this.props.showAllJobs(res.data);
                }
            }
        })
        .catch(err=>{
            //this.props.setError(err.response.data);
        })
	}

	populateStudent = (job) => {
		axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
        axios.get(rooturl  + "/applications/students")
        .then(res => {
            if(res.status === 200){
                if(res.data){
					this.props.showFilterJobs(res.data);
					if(res.data.STUDENT.PROFILE_PICTURE) {
						this.props.saveProfilePic(rooturl + "/" + res.data.STUDENT.PROFILE_PICTURE);
					}
                }
            }
        })
        .catch(err=>{
            //this.props.setError(err.response.data);
        })
	}
	
	// search = (event) => {
    //     event.preventDefault();
    //     let events = this.props.allevents.filter(eventC => {
    //         return eventC[event.target.elements[0].getAttribute('id')].toLowerCase().includes(event.target.elements[0].value.toLowerCase())
    //     });
				
    //     this.props.showFilterEvents(events);
	// }
	
	showSelectedJob = (action, job) => {
        this.props.showSelectedJob(action);
		this.selectedJob = job;
		const data = {
			id : job.id
		}
		axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
        axios.get(rooturl  + "/applications/students?id=" + job.id )
        .then(res => {
            if(res.status === 200){
                if(res.data){
					this.props.showFilterJobs(res.data);
					if(res.data.STUDENT.PROFILE_PICTURE) {
						this.props.saveProfilePic(rooturl + "/" + res.data.STUDENT.PROFILE_PICTURE);
					}
                }
            }
        })
        .catch(err=>{
            //this.props.setError(err.response.data);
        })
	}

	updateStatus = (applicationId, status) => {
		let data = {
			applicationId : applicationId,
			status : status
		}
		axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
        axios.post(rooturl  + "/applications/updateStatus", data)
        .then(res => {
            if(res.status === 200){
                if(res.data){
					this.showSelectedJob(true, this.selectedJob);
					this.props.history.push('/EmployerJobs');
                }
            }
        })
        .catch(err=>{
            //this.props.setError(err.response.data);
        })


	}
	
	// register = (event, eventId) => {        
	// 	event.preventDefault();
	// 	const data = {};
	// 	data.resume= true;
	// 	data.id=eventId;
	// 	axios.post(rooturl + "/registrations", data)
	// 	.then(res => {
	// 		if(res.status === 200){
	// 			//this.jobIdApplied = jobId;
	// 			this.registerUpdate(data);
	// 		}
	// 	})
	// 	.catch(err=>{
	// 		//this.props.authFail(err.response.data.msg);
	// 	})        
	// }

	// registerUpdate = (data) => {
	// 	this.props.showSelectedEvent(false);
	// 	this.props.uploadResume(data);
	// }

    render() {
		let jobs = this.props.alljobs;
		// if(this.props.filterevents && this.props.filterevents.length){
		// 	events = this.props.filterevents;
		// }
		const list = Object.keys(jobs).map(key =>
			<Card  className = "mt-2 w-100" >
				
				<Card.Body>
				<Card.Title>Postion : {jobs[key].TITLE}</Card.Title>
				<Card.Text id="type">
					{jobs[key].JOB_TYPE} 
				</Card.Text>
				<Card.Text id="type">
					{jobs[key].APP_DEADLINE} 
				</Card.Text>
				<Card.Text id="location">
					{jobs[key].LOCATION}
				</Card.Text>
				<Card.Text id="salary">
					${jobs[key].SALARY} / hour
				</Card.Text>
				<Card.Text id="posting_date">
					{jobs[key].POST_DATE}
				</Card.Text>
				<Card.Text id="description" style={{display: 'none'}}>
					{jobs[key].DESCRIPTION}
				</Card.Text>           
				</Card.Body>
				<Button variant="primary" onClick={() => this.showSelectedJob(true, jobs[key])}>View Applicants</Button>
			</Card>
		);

		// let file;
		// if(this.props.mode){
		// 	file = (file) => (
				  
		// 	);
		// }
		if(this.props.mode) {
		
		}

		let jobDesc;
		let students = this.props.filterjobs;
		if(this.props.showjob){
		jobDesc= Object.keys(students).map(key =>

			<Card  className = "mt-2 w-100" >
			<Row>
				<Col>
					<Card.Title>Status : {students[key].STATUS}</Card.Title>
				</Col>
				<Col>
				<Button variant="success" onClick={() => this.updateStatus(students[key].id, 'REVIEWED')}>REVIEWED</Button>
				
				</Col>
				<Col>
				<Button variant="danger" onClick={() => this.updateStatus(students[key].id, 'DECLINED')}>DECLINED</Button>
				</Col>
			</Row>
					
			<Card.Body>
			<Row className="justify-content-center">
					<Image src={rooturl+"/" + (students[key].STUDENT.PROFILE_PICTURE ? students[key].STUDENT.PROFILE_PICTURE : 'user.png')} className="w-25"
						height="100" roundedCircle/>
			</Row>
			

			<Card.Text id="name" className="justify-content-center">
				{students[key].STUDENT.FIRST_NAME+" "+ students[key].STUDENT.LAST_NAME} 
			</Card.Text>
			<Card.Text id="name" className="justify-content-center">
				{students[key].STUDENT.CAREER_OBJECTIVE} 
			</Card.Text>
			<Card.Text id="name" className="justify-content-center">
				{students[key].STUDENT.COLLEGE_NAME} 
			</Card.Text>
			<Button variant="primary" onClick={() => this.props.changeMode(true)}>View Resume</Button>
			{this.props.mode && <FileViewer
					fileType={'pdf'}
				filePath={rooturl+"/" + students[key].RESUME}/>}    
			</Card.Body>
			{/* <Button variant="primary" onClick={() => this.showSelectedJob(true, jobs[key])}>View Applicants</Button> */}
			</Card>
		)
		}

		
        return (
			
            <Container className="mt-5 mb-5">
				<NavBarLoginLE />
				<h1>List of Jobs</h1>
                {/* <Form onSubmit={this.search}>
            	<Form.Row>
                <Form.Group as={Col} md="4" controlId="TITLE">
                    <Form.Label></Form.Label>
                    <Form.Control placeholder="Search by event name" type="text" />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid input.
                    </Form.Control.Feedback>
                </Form.Group>
				<Form.Group as={Col} md="4" controlId="validationCustom04">
                    <Button type="submit" style={{ marginTop: '32px' }}>Search</Button>
                </Form.Group>
				</Form.Row>
				</Form> */}
				<Row>
				<Col md={4}>{list}</Col>
				<Col >{jobDesc}</Col>
				</Row>
            </Container>
			
        )
    };

}

export default connect(mapStateToProps, mapDispatchToProps)(EmployerJobs);