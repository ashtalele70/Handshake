import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBar from "../NavBar";
import { connect } from 'react-redux'; 
import axios from 'axios';
import {rooturl} from '../../config';
import { storeStudentDetails  } from '../../Actions/profileAction';
import {Link} from 'react-router-dom';

function mapStateToProps(state){
    return {
		//profileData: state.profileData,
		studentDetails: state.profileData.studentDetails
    }
}

function mapDispatchToProps(dispatch) {
    return {
		//profileupdate : (profiledata) => dispatch(profileupdate(profiledata)),
		storeStudentDetails: (data) => dispatch(storeStudentDetails(data))
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
		this.getStudentDetails();
	}

	getStudentDetails =  async () => {
		axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
		let res = await axios.get(rooturl + "/studentProfile/current");
		if(res.status === 200) {
			this.props.storeStudentDetails(res.data);
		}
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
        return (
            <div>
                
                <div>
                <div class="container">
                {/* <img src={this.state.imglink} style={{ height: 250, width: 200 }} alt="Profile Picture"/> */}
                <h2 >Skills</h2>
                
				{this.props.studentDetails &&
				 this.props.studentDetails.data.STUDENT.SKILLSET.split(',').map(studentSkill => {
				 	return (
                <form class="form-horizontal">
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="skill"></label>
                    {/* <div class="col-sm-10"> */}
                        <input type="text" onChange = {this.changeHandler} value={studentSkill} class="form-control col-sm-4" id="skill"  placeholder="Skill Set" name="skill" disabled />
                    {/* </div> */}
                    </div>
           
                </form>
				);
			})
				}

<div class="form-group">        
                    <div class="col-sm-offset-2 col-sm-10">
                        <button type="submit" class="btn btn-danger" onClick={this.onSubmit}>Submit</button>
                        <Link to="/UserDashboard"><button type="button" class="btn btn-danger">Cancel</button></Link>
                    </div>
                    </div>
                </div>
                </div>
                
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(StudentSkillset);