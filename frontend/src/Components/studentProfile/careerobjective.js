import React, {Component, useState} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBar from "../NavBar";
import { connect } from 'react-redux'; 
import axios from 'axios';
import {rooturl} from '../../config';
import { storeStudentDetails, controlModal  } from '../../Actions/profileAction';
import {Link} from 'react-router-dom';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button } from 'react-bootstrap'

//import { Example } from './objectiveModal';

function mapStateToProps(state){
    return {
		//profileData: state.profileData,
		studentDetails: state.profileData.studentDetails,
		displayModal: state.profileData.displayModal
    }
}

function mapDispatchToProps(dispatch) {
    return {
		//profileupdate : (profiledata) => dispatch(profileupdate(profiledata)),
		storeStudentDetails: (data) => dispatch(storeStudentDetails(data)),
		controlModal: (data) => dispatch(controlModal(data))
    };
}

class CareerObjective extends Component{
	constructor(props){
        super(props);
        this.changeHandler = this.changeHandler.bind(this);
        // this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount(){
		this.getStudentDetails();
	}

	// const [show, setShow] = useState(false);
	// handleClose = () => setShow(false);
	// handleShow = () => setShow(true);

	// Example = (props) => {
	// 	console.log(props);
	// 	const [show, setShow] = useState(false);
	  
	// 	const handleClose = () => setShow(false);
	// 	const handleShow = () => setShow(true);
	  
	// 	return (
	// 		<div>
	// {/* </div><Button variant="primary" onClick={handleShow}> */}
	// <FontAwesomeIcon icon={faEdit} onClick={handleShow} />
	// 		  {/* Launch demo modal
	// 		</Button> */}
	  
	// 		<Modal show={show} onHide={handleClose}>
	// 		  <Modal.Header closeButton>
	// 			<Modal.Title>Modal heading</Modal.Title>
	// 		  </Modal.Header>
	// 		  <form class="form-horizontal">
	// 					<div class="form-group">
	// 					<label class="control-label col-sm-2" for="obj"></label>
	// 					<div class="col-sm-10">
	// 						<input type="text" value={props.studentDetails.data.STUDENT.CAREER_OBJECTIVE} class="form-control" id="obj"  placeholder="Career Objective" name="obj" disabled  />
	// 						{/* <FontAwesomeIcon icon={faEdit} onClick={handleShow} /> */}
	// 					</div>
	// 					</div>
	// 				</form>
	// 		  {/* <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body> */}
	// 		  <Modal.Footer>
	// 			<Button variant="secondary" onClick={handleClose}>
	// 			  Close
	// 			</Button>
	// 			<Button variant="primary" onClick={handleClose}>
	// 			  Save Changes
	// 			</Button>
	// 		  </Modal.Footer>
	// 		</Modal>
	// 		</div>
			
		  
	// 	);
	//   }

	getStudentDetails =  async () => {
		axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
		let res = await axios.get(rooturl + "/studentProfile/current");
		if(res.status === 200) {
			this.props.storeStudentDetails(res.data);
		}
		//this.props.controlModal(false);
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

	onSubmit = async (e) => {
		// axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
		// let res = await axios.post(rooturl + "/studentProfile/current", this.props.CAREER_OBJECTIVE);
		// if(res.status === 200) {
		// 	console.log(res.data);
		// }
	}
 
	enableCareerObj = (event) => {
		if(event.target.innerText === 'Cancel'){
			document.getElementById("obj").disabled = true;
			this.props.controlModal(false);
		} else {
			document.getElementById("obj").disabled = false;
			this.props.controlModal(true);
		}
		
	}


    render() {
        return (
            <div>
                
                <div>
				{this.props.studentDetails &&
                <div class="container">
                {/* <img src={this.state.imglink} style={{ height: 250, width: 200 }} alt="Profile Picture"/> */}
                <h2 >Career Objective</h2>
			{/* {this.props.displayModal &&
			<Modal>
			  <Modal.Header>
				<Modal.Title>Modal heading</Modal.Title>
			  </Modal.Header>
			  <form class="form-horizontal">
						<div class="form-group">
						<label class="control-label col-sm-2" for="obj"></label>
						<div class="col-sm-10">
							<input type="text" value={this.props.studentDetails.data.STUDENT.CAREER_OBJECTIVE} class="form-control" id="obj"  placeholder="Career Objective" name="obj" disabled  />
							{/* <FontAwesomeIcon icon={faEdit} onClick={handleShow} /> 
						</div>
						</div>
						
				
					</form>
			  <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
			  <Modal.Footer>
				<Button variant="secondary" onClick={() => this.props.controlModal(false)}>
				  Close
				</Button>
				<Button variant="primary" onClick={() => this.props.controlModal(true)}>
				  Save Changes
				</Button>
			  </Modal.Footer>
			</Modal>} */}
				
                <form class="form-horizontal" onSubmit={this.onSubmit}>
					<FontAwesomeIcon icon={faEdit} onClick={this.enableCareerObj} />
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="obj"></label>
                    <div >
                        <textarea type="text" value={this.props.studentDetails.data.STUDENT.CAREER_OBJECTIVE} class="form-control" id="obj"  placeholder="Career Objective" name="obj" disabled  />
						{/* <FontAwesomeIcon icon={faEdit} onClick={handleShow} /> */}
                    </div>
                    </div>
                    
                    {this.props.displayModal &&
                    <div class="form-group">        
                    <div class="col-sm-offset-2 col-sm-10">
                        <button type="submit" class="btn btn-danger">Submit</button>
                        <Link to="/UserDashboard"><button type="button" class="btn btn-danger" onClick={this.enableCareerObj}>Cancel</button></Link>
                    </div>
                    </div>}
                </form>
                </div>}
                </div>
                
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(CareerObjective);