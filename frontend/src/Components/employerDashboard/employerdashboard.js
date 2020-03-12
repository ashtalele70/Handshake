import React, {Component} from 'react';
import cookie, { setRawCookie } from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import NavBarLoginLE from "../NavBarLE";
import "./employerdashboard.css";
import axios from 'axios';
import {rooturl} from '../../config';
import Draggable, {DraggableCore} from 'react-draggable';

 import { Button } from 'react-bootstrap';


const cardstyle = {
    width: '300px',
    
} 
class EmployerDashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            empname : localStorage.getItem("cookiename"),
            newJobs : "",
            // other : "",
            jobCheck : "",
            jobStatus : "",
            updateStatus : "",
            // showModal: false,
            // messages : "",
            // newMessage : ""            
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        //this.sendMessages = this.sendMessages.bind(this);
        //this.modalMessages = this.modalMessages.bind(this);
    }

    changeHandler = (e) => {
        this.setState({
                [e.target.name] : e.target.value
        })
        //console.log(this.state);
    }

    componentWillMount(){
        const data = {
            restname : this.state.restname
        }
        console.log(data);
        axios.defaults.headers.common["Authorization"] = localStorage.getItem("token") ? localStorage.getItem("token") : "";
        axios.post(rooturl + '/getEmployerJobs', data)
        .then(response => {
            console.log("Response Status: " + response.status);
            if(response.status === 200){
                console.log(response.data);
                this.setState({
                    newJobs : response.data.newJobs,
                    //otherOrders : response.data.responseMessage.otherOrders,
                    jobCheck : true
                })
                //console.log(this.state.menu);
            } else {
                this.setState({
                    jobCheck : false
                })
                console.log("No Items found");
            }
        })
        .catch(err => {
            console.log(err);
            this.setState({
                jobCheck : false
            })
        })
    }

    updateStatus(e){
        e.preventDefault();
        var element;
        for (element in this.state){
            //if(element == "empname" || element == "newOrders" || element == "otherOrders" || element == "orderCheck" || element == "orderStatus" || element == "updateStatus" || element == "showModal" || element == "modalCartid" || element == "messages" || element == "newMessage"){
			if(element == "empname" || element == "newJobs" || element == "jobCheck" || element == "jobStatus" || element == "updateStatus"){
                continue;
            } else {
                if(this.state[element] == "PENDING" || this.state[element] == "REVIEWED" || this.state[element] == "DECLINED"){
                    console.log(this.state[element])
                    const data = {
                        cartid : element,
                        orderstatus : this.state[element],
                        restname : this.state.restname
                    }
                    console.log(data);
                    axios.defaults.headers.common["Authorization"] = localStorage.getItem("token") ? localStorage.getItem("token") : "";
                    axios.post(rooturl + "/updateStatus", data)
                    .then(response => {
                        console.log("Response Status: " + response.status);
                        if(response.status === 200){
                            alert("Job Status Updated Successfully");
                            this.setState({
                                JobStatus : true
                            }) 
                        } else {
                            this.setState({
                                jobStatus : false
                            })
                            console.log("No Items found");
                        }
                        window.location.reload(false);
                    })
                } else {
                    alert("Only valid status are PENDING, REVIEWED, DECLINED");
                }
            }
        }
    }

    // sendMessages(e){
    //     e.preventDefault();
    //     const data = {
    //         cartid : this.state.modalCartid,
    //         username : this.state.restname,
    //         message : this.state.newMessage
    //     }
    //     console.log(data);

    //     axios.defaults.headers.common["Authorization"] = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    //     axios.post(rooturl + '/addMessage', data)
    //     .then(response => {
    //         console.log("Response Status: " + response.status);
    //         if(response.status === 200){
    //             console.log(response.data);
    //             alert("Message Sent");
    //             this.setState({
    //                 newMessage : "",
    //                 showModal : false
    //             })
    //             //console.log(this.state.menu);
    //         } else {
    //             console.log("No Items found");
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         this.setState({
    //             newMessage : ""
    //         })
    //     })

    // }

    // handleClose = () => {
    //     this.setState({
    //         showModal : false
    //     })
    // };

    // handleShow = (e) => {
    //     this.setState({
    //         showModal : true,
    //         modalCartid : e.target.value
    //     })
    //     const data = {
    //         cartid : e.target.value //this.state.modalCartid
    //     } 
    //     console.log(data.cartid);
    //     axios.defaults.headers.common["Authorization"] = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    //     axios.post(rooturl + '/getMessage', data)
    //     .then(response => {
    //         console.log("Response Status: " + response.status);
    //         if(response.status === 200){
    //             console.log(response.data);
    //             var allMessages = response.data.responseMessage;
    //             this.setState({
    //                 messages : allMessages
    //             })
    //             //console.log(this.state.menu);
    //         } else {
    //             console.log("No Items found");
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         this.setState({
    //             messages : ""
    //         })
    //     })
    // };

    
    
    render(){
        let redirectVar = null;
        if(this.state.orderStatus){
            redirectVar = <Redirect to = '/EmployerDashboard'/>
        }

        if(this.state.orderCheck){
            var itemDetails = (items) => {
                var rows = items.map(itm => {
                    return (  
                        <ul key={itm.itemname}>{itm.itemname} - {itm.quantity} X ${itm.itemprice} = {itm.price}</ul> 
                    )
                })
                return rows;
            }
    
            var newOrderDetails = this.state.newOrders.map(result => {
                return(  
                    <div className="card" style={cardstyle}>
                    <div className="card-header text-white">ID : {result.cartid}<br></br>Total : {result.totalprice}</div>
                    <div className="card-body">
                    <div>
                    
                    </div>
                        {result.username}<br></br>Status : {result.orderstatus}
                        <br></br>
                        Address : {result.address}
                    <div>
                    Items:<br></br>
                    {itemDetails(result.items)}
                    </div>
                    </div>
                    <div className="card-footer">
                    <input type="text" className="form-control" name={result.cartid} onChange = {this.changeHandler} placeholder="PREPARING, READY, DELIVERED" id={result.cartid}/>
                    <button value={result.cartid} onClick={this.updateStatus} className="btn">Update Status</button> <br></br>  
                    
                    {/* <button className="btn btn-danger" data-toggle="modal" data-target="#myModal" value={result.cartid} onClick={this.handleShow}>Message</button> */}
                    </div>
                    </div>
                    
                    
                );
            });
    
            var otherOrderDetails = this.state.otherOrders.map(result => {
                return(
                    
                    <div className="card" style={cardstyle}>
                    <div className="card-header text-white">ID : {result.cartid}<br></br>Total : {result.totalprice}</div>
                    <div className="card-body">
                        {result.username}<br></br>Status : {result.orderstatus}
                        <br></br>
                        Address : {result.address}
                    <div>
                    Items:<br></br>
                    {itemDetails(result.items)}
                    </div>
                    </div>
                    </div>
                    
                );
            });

            
        }

        // if(this.state.messages){
        //     //console.log(this.state.messages);
        //     var modalMessages = this.state.messages.map(message => {
        //         return(
        //             <div>
        //                 <p><em>{message.author}</em> : {message.message}</p>
        //             </div>
        //         )
        //     })
    
        // }

        return(
            <div>
				{redirectVar}
            	<NavBarLoginLE />
            </div>
           
        )
    }
}

export default EmployerDashboard;
