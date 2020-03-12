import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Card, Toast } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import {rooturl} from '../../config';
import NavBarLogin from "../NavBarL";
import { showAllJobs, showFilterJobs, showSelectedJob, uploadResume, applyJob } from '../../Actions/dashboardAction';

const mapStateToProps = (state) => {
    return {
        alljobs: state.userDashboardData.alljobs,
		filterjobs: state.userDashboardData.filterjobs,
		showjob: state.userDashboardData.showjob,
		resume: state.userDashboardData.resume,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        showAllJobs: (data) => dispatch(showAllJobs(data)),
		showFilterJobs: (data) => dispatch(showFilterJobs(data)),
		showSelectedJob: (data) => dispatch(showSelectedJob(data)),
		uploadResume: (data) => dispatch(uploadResume(data))
    }
}

class StudentAppliedJob extends Component {
	
	selectedSearchfilters = [];
	selectedJob = {};
	
	constructor() {
		super();
		this.search = this.search.bind(this);
		this.applyFilters = this.applyFilters.bind(this);
	}

    componentDidMount() {
		this.getJobs();
		this.saveResume = this.saveResume.bind(this);
	}


    getJobs = () => {
        axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
        axios.get(rooturl  + "/jobs/appliedjobs")
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

    search = (event) => {
		event.preventDefault();
		let jobs;
        // let jobs = this.props.alljobs.filter(job => {
        //     return job[event.target.elements[0].getAttribute('id')].toLowerCase().includes(event.target.elements[0].value.toLowerCase())
        // });

		if(this.selectedSearchfilters.length) {
            this.selectedSearchfilters.forEach(filter => {
                jobs = this.props.alljobs.filter(job => {
                    return job['STATUS'] === filter;
				})
			})
		}
		   
				
        this.props.showFilterJobs(jobs);
    }

    applyFilters = (event) => {
        this.selectedSearchfilters.push(event.target.innerText);
    }

	showSelectedJob = (action, job) => {
        this.props.showSelectedJob(action);
        this.selectedJob = job;
	}
	
	saveResume = (event, jobId) => {        
		event.preventDefault();
		const data = new FormData();
		const file = event.target.elements[0].files[0];
		data.append('resume', file);
		data.append('id', jobId);
		axios.post(rooturl + "/applications", data, {
			headers: {
				'content-type':'multipart/form-data'
			}
		})
		.then(res => {
			if(res.status === 200){
				//this.jobIdApplied = jobId;
				this.uploadResume(file);
			}
		})
		.catch(err=>{
			//this.props.authFail(err.response.data.msg);
		})        
	}

	uploadResume = (file) => {
		this.props.uploadResume(rooturl + "/" + file.name);
		this.props.showSelectedJob(false);
	}

    render() {
		let jobs = this.props.alljobs;
		if(this.props.filterjobs.length){
			jobs = this.props.filterjobs;
		}
		const list = Object.keys(jobs).map(key =>
			<Card  className = "mt-2" >
				
				<Card.Body>
				<Card.Title>{jobs[key].JOB.TITLE}</Card.Title>
				<Card.Text id="type">
					{jobs[key].JOB.JOB_TYPE}                  
				</Card.Text>
				<Card.Text id="location">
					{jobs[key].JOB.LOCATION}
				</Card.Text>
				<Card.Text id="salary">
					${jobs[key].JOB.SALARY} / hour
				</Card.Text>
				<Card.Text id="posting_date">
					{jobs[key].JOB.POST_DATE}
				</Card.Text>
				<Card.Text id="description" style={{display: 'none'}}>
					{jobs[key].JOB.DESCRIPTION}
				</Card.Text>           
				</Card.Body>
				{/* <Button variant="primary" onClick={() => this.showSelectedJob(true, jobs[key].JOB)}>View Job</Button> */}
			</Card>
		);

		// let jobDesc;
		// if(this.props.showjob){
		// jobDesc= (
		// 	<Card>
		// 	<Card.Body>
		// 		<Card.Title>Job Description</Card.Title>
		// 		<Card.Subtitle className="mb-2 text-muted"> Position : {this.selectedJob.TITLE}</Card.Subtitle>
		// 		<Card.Text>
		// 		Description: {this.selectedJob.DESCRIPTION}
		// 		</Card.Text>
		// 		<Card.Text>Application Deadline: {this.selectedJob.APP_DEADLINE}</Card.Text>
		// 		<Card.Text>Date Posted: {this.selectedJob.POST_DATE}</Card.Text>
		// 		<Card.Text>Salary: ${this.selectedJob.SALARY}/hr</Card.Text>
		// 	</Card.Body>
		// 		<Form onSubmit={(e) => { this.saveResume(e, this.selectedJob.id) }}>
		// 			<Form.Control type="file" id="file" name="file" multiple />
		// 			<Button className="w-25"  type="submit" variant="primary">Apply to this job</Button>
		// 		</Form>
		// 	{/* <Button className="w-25" variant="primary"  >Apply to this job</Button> */}
		// 	</Card>
		// )
		// }

		// let toast;

		// toast=(
		// 	<Toast  show={this.props.resume} delay={3000} autohide>
        //   <Toast.Header>
        //     {/* <img
        //       src="holder.js/20x20?text=%20"
        //       className="rounded mr-2"
        //       alt=""
        //     /> */}
        //     <strong className="mr-auto">Bootstrap</strong>
        //     <small>11 mins ago</small>
        //   </Toast.Header>
        //   <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        // </Toast>
		// )


        return (
            <Container  as={Col}>
				<NavBarLogin />
				<h1> Applied Jobs</h1>
        <Form onSubmit={this.search}>
            {/* <Form.Row>
                <Form.Group as={Col} md="4" controlId="TITLE">
                    <Form.Label></Form.Label>
                    <Form.Control placeholder="Search by job title or company name" type="text" />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid input.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="city">
                    <Form.Label>	</Form.Label>
                    <Form.Control placeholder="Search by location" type="text" />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid city.
                </Form.Control.Feedback>
                </Form.Group>
                
            </Form.Row> */}
            <Form.Row className='w-50'>
                <Form.Group as={Col} md="3" controlId="pendingFilter">
                    <button type="button" style={{ marginTop: '32px' }} className="btn">PENDING</button>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="reviewedFilter">
                    <button type="button" style={{ marginTop: '32px' }} className="btn" onClick = {this.applyFilters} >REVIEWED</button>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="declinedFilter">
                    <button type="button" style={{ marginTop: '32px' }} className="btn">DECLINED</button>
                </Form.Group>
				<Form.Group as={Col} md="3" controlId="validationCustom04">
                    <Button type="submit" style={{ marginTop: '32px' }}>Search</Button>
                </Form.Group>
            </Form.Row>
        </Form>
		<Row>
                    <Col md={4}>{list}</Col>
					{/* <Col >{jobDesc}</Col> */}
					
				</Row>
            </Container>  
        )
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(StudentAppliedJob);