import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Card} from 'react-bootstrap';
import axios from 'axios';
import { PATH } from '../../config';
import { connect } from 'react-redux';
import {rooturl} from '../../config';
import NavBarLogin from "../NavBarL";
import { showAllJobs, showFilterJobs } from '../../Actions/dashboardAction';

const mapStateToProps = (state) => {
    return {
        alljobs: state.userDashboardData.alljobs,
        filterjobs: state.userDashboardData.filterjobs
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        showAllJobs: (data) => dispatch(showAllJobs(data)),
        showFilterJobs: (data) => dispatch(showFilterJobs(data))
    }
}

class StudentDashboard extends Component {

	constructor() {
		super();
		this.search = this.search.bind(this);
	}

    componentDidMount() {
        this.getJobs();
	}


    getJobs = () => {
        axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
        axios.get(rooturl  + "/jobs")
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
        let jobs = this.props.alljobs.filter(job => {
            return job[event.target.elements[0].getAttribute('id')].toLowerCase().includes(event.target.elements[0].value.toLowerCase())
        });

        this.props.showFilterJobs(jobs);
    }

    recordFilters = (event) => {
        
    }

    render() {
		let jobs = this.props.alljobs;
		if(this.props.filterjobs.length){
			jobs = this.props.filterjobs;
		}
		const list = Object.keys(jobs).map(key =>
			<Card  className = "mt-2">
				<Card.Body>
				<Card.Title>{jobs[key].TITLE}</Card.Title>
				<Card.Text id="type">
					{jobs[key].JOB_TYPE}
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
				</Card.Body>
			</Card>
		);

        return (
            <Container className="mt-5 mb-5">
				<NavBarLogin />
        <Form onSubmit={this.search}>
            <Form.Row>
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
                <Form.Group as={Col} md="4" controlId="validationCustom04">
                    <Button type="submit" style={{ marginTop: '32px' }}>Search</Button>
                </Form.Group>
            </Form.Row>
            <Form.Row className='w-50'>
                <Form.Group as={Col} md="3" controlId="fullTimeFilter">
                    <button type="button" className="btn">Full-Time</button>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="partTimeFilter">
                    <button type="button" className="btn">Part-Time</button>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="internFilter">
                    <button type="button" onClick = {this.recordFilters} className="btn">Internship</button>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="oncampusFilter">
                    <button type="button" className="btn ">On-Campus</button>
                </Form.Group>
            </Form.Row>
        </Form>
				{list}
            </Container>  
        )
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard);