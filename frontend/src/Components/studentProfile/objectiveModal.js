import {React, useState} from 'react';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button } from 'react-bootstrap';

export const Example = (props) => {
	console.log(props);
	const [show, setShow] = useState(false);
  
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
  
	return (
		<div>
{/* </div><Button variant="primary" onClick={handleShow}> */}
<FontAwesomeIcon icon={faEdit} onClick={handleShow} />
		  {/* Launch demo modal
		</Button> */}
  
		<Modal show={show} onHide={handleClose}>
		  <Modal.Header closeButton>
			<Modal.Title>Modal heading</Modal.Title>
		  </Modal.Header>
		  <form class="form-horizontal">
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="obj"></label>
                    <div class="col-sm-10">
                        <input type="text" value={props.studentDetails.data.STUDENT.CAREER_OBJECTIVE} class="form-control" id="obj"  placeholder="Career Objective" name="obj" disabled  />
						{/* <FontAwesomeIcon icon={faEdit} onClick={handleShow} /> */}
                    </div>
                    </div>
                    
            
                </form>
		  {/* <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body> */}
		  <Modal.Footer>
			<Button variant="secondary" onClick={handleClose}>
			  Close
			</Button>
			<Button variant="primary" onClick={handleClose}>
			  Save Changes
			</Button>
		  </Modal.Footer>
		</Modal>
		</div>
		
	  
	);
  }