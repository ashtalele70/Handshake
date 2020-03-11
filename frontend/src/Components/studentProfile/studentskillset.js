import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBar from "../NavBar";
import { connect } from 'react-redux'; 
import axios from 'axios';
import {rooturl} from '../../config';
import { saveSkillset  } from '../../Actions/profileAction';
import {Link} from 'react-router-dom';
import { Card, Button, Form, FormControl, Alert } from 'react-bootstrap';

function mapStateToProps(state){
    return {
		//profileData: state.profileData,
		
		skillset: state.profileData.skillset
    }
}

function mapDispatchToProps(dispatch) {
    return {
		//profileupdate : (profiledata) => dispatch(profileupdate(profiledata)),
		saveSkillset: (data) => dispatch(saveSkillset(data)),
    };
}

class StudentSkillset extends Component{
	constructor(props){
        super(props);
        // this.changeHandler = this.changeHandler.bind(this);
        // this.onChange = this.onChange.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount(){
		this.getSkillset();
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
	getSkillset = () => {
        axios.get(rooturl + "/studentProfile/skillset")
        .then(res => {
            if(res.status == 200){
                if(res.data){
                    this.props.saveSkillset(res.data);
                }
            }
        })
        .catch(err=>{
            //this.props.setError(err.response.data);
        })
	}

	updateSkillset = (value, action) => {
        let newSkills = [];
        Object.assign(newSkills, this.props.skillset);
        let idx = newSkills.findIndex(skill => skill.toLowerCase() === value.toLowerCase());
        if(action === "remove") {
            if(idx > -1) {
                newSkills.splice(idx, 1);
            }
        }            
        else {
            if(idx === -1) {
                newSkills.push(value);
            }            
        }
        this.props.saveSkillset(newSkills);
	}
	
	saveSkillset = (event) => {
        event.preventDefault();
        const data =  { skill: event.target.elements[0].value };
        axios.post(rooturl + "/studentProfile/skillset", data)
        .then(res => {
            if(res.status === 200){ 
                this.updateSkillset(data.skill);
            }
        })
        .catch(err=>{
            //this.props.authFail(err.response.data.msg);
        })
    }
	
	removeSkillset = (skill) => {
		// const data =  { skill: d};
        // axios.post(rooturl + "/studentProfile/skillset", data)
        // .then(res => {
        //     if(res.status === 200){ 
        //         this.updateSkillset(data.skill);
        //     }
        // })
        // .catch(err=>{
        //     //this.props.authFail(err.response.data.msg);
		// })
		this.updateSkillset(skill, "remove");
    }

    render() {
		let skill;
			if(this.props.skillset){
			skill = this.props.skillset.map(skill => {
				return(           
					<Alert className="alert alert-primary" onClose = { () => this.removeSkillset(skill) } dismissible>
						<p>{skill}</p>
					</Alert>
				)
			})
		}
		

        return (
			<Card>
            <Card.Body>
            <Card.Title>Skills</Card.Title>
            <Form onSubmit = {this.saveSkillset} className="mb-2">
                <Form.Group controlId="formBasicEmail">
                <FormControl
                    placeholder="Add skills"
                    aria-label="Add skills"
                    aria-describedby="basic-addon2" name="skill"/>
                </Form.Group>
                <Button  type="submit">Add</Button>
            </Form>
            {skill}   
            </Card.Body>
        </Card>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(StudentSkillset);