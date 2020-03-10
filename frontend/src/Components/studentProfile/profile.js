import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { signin } from '../../Actions/loginAction';
import StudentDetails from './studentdetails';
import StudentSkillset from './studentskillset';
import CareerObjective from './careerobjective';
import StudentEducation from './studenteducation';
import StudentExperience from './studentexperience';
import NavBarLogin from "../NavBarL";

function mapStateToProps(state){
	return {
		userLoginData: state.userLoginData
	}
}

function mapDispatchToProps(dispatch) {
	return {
		signin: (signindata) => dispatch(signin(signindata))
	}
}

class Profile extends Component {

    constructor(){
        super();
    }

    render() {
        return (
			
            <Container className="mt-5 mb-5">
				<NavBarLogin />
                <Row>
                    <Col sm={4} md={4} lg={4}>
                        <StudentDetails ></StudentDetails><br/>
                        <StudentSkillset ></StudentSkillset>
                    </Col>
                    <Col sm={8} md={8} lg={8}>
                        <CareerObjective ></CareerObjective><br/>
                        <StudentEducation ></StudentEducation><br/>
                        <StudentExperience ></StudentExperience>
                    </Col>
                </Row>
            </Container>
        )
    };

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);