import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import NavBarLogin from "../NavBarL";
import {rooturl} from '../../config';
import { showAllEvents, showFilterEvents, showSelectedEvent } from '../../Actions/userEventAction';
import { uploadResume } from '../../Actions/dashboardAction';

const mapStateToProps = (state) => {
    return {
        allevents: state.studentEventData.allevents,
		filterevents: state.studentEventData.filterevents,
		showevent: state.studentEventData.showevent,
		resume: state.userDashboardData.resume,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        showAllEvents: (data) => dispatch(showAllEvents(data)),
		showFilterEvents: (data) => dispatch(showFilterEvents(data)),
		showSelectedEvent: (data) => dispatch(showSelectedEvent(data)),
		uploadResume: (data) => dispatch(uploadResume(data))
    }
}

class StudentEvent extends Component {

	selectedEvent = {};

    constructor(){
		super();
		this.search = this.search.bind(this);
    }
	componentDidMount() {
        this.getEvents();
	}
	getEvents = () => {
        axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
        axios.get(rooturl  + "/events")
        .then(res => {
            if(res.status === 200){
                if(res.data){
                    this.props.showAllEvents(res.data);
                }
            }
        })
        .catch(err=>{
            //this.props.setError(err.response.data);
        })
	}
	
	search = (event) => {
        event.preventDefault();
        let events = this.props.allevents.filter(eventC => {
            return eventC[event.target.elements[0].getAttribute('id')].toLowerCase().includes(event.target.elements[0].value.toLowerCase())
        });
				
        this.props.showFilterEvents(events);
	}
	
	showSelectedEvent = (action, event) => {
        this.props.showSelectedEvent(action);
        this.selectedEvent = event;
	}
	
	register = (event, eventId) => {        
		event.preventDefault();
		const data = {};
		data.resume= true;
		data.id=eventId;
		axios.post(rooturl + "/registrations", data)
		.then(res => {
			if(res.status === 200){
				//this.jobIdApplied = jobId;
				this.registerUpdate(data);
			}
		})
		.catch(err=>{
			//this.props.authFail(err.response.data.msg);
		})        
	}

	registerUpdate = (data) => {
		this.props.showSelectedEvent(false);
		this.props.uploadResume(data);
	}

    render() {
		let events = this.props.allevents;
		if(this.props.filterevents && this.props.filterevents.length){
			events = this.props.filterevents;
		}
		const list = Object.keys(events).map(key =>
			<Card  className = "mt-2 w-100" >
				
				<Card.Body>
				<Card.Title>{events[key].TITLE}</Card.Title>
				<Card.Text id="type">
					{events[key].JOB_TYPE} {this.selectedEvent.id ===events[key].id  && this.props.resume&&<p style={{color: "Green", fontWeight: "900", textAlign: "right"}}>Registered</p>}
				</Card.Text>
				<Card.Text id="location">
					{events[key].LOCATION}
				</Card.Text>
				<Card.Text id="salary">
					${events[key].SALARY} / hour
				</Card.Text>
				<Card.Text id="posting_date">
					{events[key].POST_DATE}
				</Card.Text>
				<Card.Text id="description" style={{display: 'none'}}>
					{events[key].DESCRIPTION}
				</Card.Text>           
				</Card.Body>
				<Button variant="primary" onClick={() => this.showSelectedEvent(true, events[key])}>View Event</Button>
			</Card>
		);

		let eventDesc;
		if(this.props.showevent){
		eventDesc= (
			<Card>
			<Card.Body>
				<Card.Title>Event Description</Card.Title>
				<Card.Subtitle className="mb-2 text-muted"> Position : {this.selectedEvent.TITLE}</Card.Subtitle>
				<Card.Text>
				Description: {this.selectedEvent.DESCRIPTION}
				</Card.Text>
				<Card.Text>Application Deadline: {this.selectedEvent.APP_DEADLINE}</Card.Text>
				<Card.Text>Date Posted: {this.selectedEvent.POST_DATE}</Card.Text>
				<Card.Text>Salary: ${this.selectedEvent.SALARY}/hr</Card.Text>
			</Card.Body>
			{/* <div>
				<Form.Control type="file" id="file" name="file" multiple />
			</div> */}
			<Button className="w-25" onClick={(e) => { this.register(e, this.selectedEvent.id) }} variant="primary">Register for this job</Button>
			</Card>
		)
		}
        return (
			
            <Container className="mt-5 mb-5">
				<NavBarLogin />
                <Form onSubmit={this.search}>
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
				</Form>
				<Row>
				<Col md={4}>{list}</Col>
				<Col >{eventDesc}</Col>
				</Row>
            </Container>
			
        )
    };

}

export default connect(mapStateToProps, mapDispatchToProps)(StudentEvent);