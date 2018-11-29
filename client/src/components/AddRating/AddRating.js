import React, { Component } from 'react';
import { FormGroup, FormControl,ControlLabel,Button } from "react-bootstrap";
import "./AddRating.css"
import axios from "axios";
// import Toggle from "../Toggle";
// import Togglebutton from '../Togglebutton';
class AddRating extends Component {
    constructor(props) {
        super(props);
        this.onAddratingChange=this.onAddratingChange.bind(this);
        this.state = {
            volunteer_report: [],
            firstname:"",
            name: "",
            dog_id: "",
            sit_rating: "",
            layash_rating: "",
            sit_in_crat_down_rating: "",
            walk_on_lee_rating: "",
            comment: "",
            isHidden: true 
        }
        
    }
    onAddratingChange=event =>{
        const { name, value }= event.target;
        this.setState({[name]: value });

    }
       
    submitAddratingForm(event) {
        event.preventDefault();
        const {  sit_rating, lay_down_rating, walk_on_leash_rating, sit_in_crate_rating, comment,dog_id}= this.state;
        const firstname=this.props.location.state.firstname;
        axios.post("/api/addrating/"+dog_id,{firstname,  sit_rating, lay_down_rating, walk_on_leash_rating, sit_in_crate_rating, comment } )
        .then((addratingresult) => {
            console.log(addratingresult);
            this.setState({
                
                firstname: "",
                dog_id: "",
                sit_rating: "",
                lay_down_rating: "",
                walk_on_leash_rating: "",
                sit_in_crate_rating: "",
                comment: ""
            })
        }).catch(err => alert(err));
        
        }

    render() {
        
        return (
            <div className="volunteerrating">
                <form  className='add-rating' >

                    {/*<FormGroup className='field'>
                        <ControlLabel> Volunteer Name </ControlLabel>
                        <input type="text" name="name" vlaue={this.state.name} onChange={this.onAddratingChange }/>
                    </FormGroup>*/}
                    {/*<h4>Volunteer Name: {this.props.location.firstname}</h4>*/}
                    <br/>
                    {<h4 style={{color:"darkorange",fontSize:'24px'}}>rating system: 1 = reasonable, 2 = good; 3 = excellent</h4>}
                    <FormGroup className='field'>
                        <ControlLabel> Dog Id </ControlLabel>
                        <input type="text" name="dog_id" vlaue={this.state.dog_id} onChange={this.onAddratingChange }/>
                    </FormGroup>
                       
                    <FormGroup className='field'>
                        <ControlLabel> sit rating </ControlLabel>
                        <FormControl componentClass="select" name="sit_rating" value={this.state.value} onChange={this.onAddratingChange} >
                        <option value='select'> select </option>
                        <option value='1'> 1 </option>
                            <option value='2'> 2 </option>
                            <option value='3'> 3 </option>
                        </FormControl>
                    </FormGroup>

                    <FormGroup className='field'>
                        <ControlLabel> lay down rating </ControlLabel>
                        <FormControl componentClass="select" name="lay_down_rating" value={this.state.value} onChange={this.onAddratingChange} >
                        <option value='select'> select </option>    
                        <option value='1'> 1 </option>
                            <option value='2'> 2 </option>
                            <option value='3'> 3 </option>
                        </FormControl>
                    </FormGroup>

                    <FormGroup className='field'>
                        <ControlLabel> walk on leash rating </ControlLabel>
                        <FormControl componentClass="select" name="walk_on_leash_rating" value={this.state.value} onChange={this.onAddratingChange} >
                        <option value='select'> select </option>   
                        <option value='1'> 1 </option>
                            <option value='2'> 2 </option>
                            <option value='3'> 3 </option>
                        </FormControl>
                    </FormGroup>

                    <FormGroup className='field'>
                        <ControlLabel> sit in crate rating </ControlLabel>
                        <FormControl componentClass="select" name="sit_in_crate_rating" value={this.state.value} onChange={this.onAddratingChange} >
                        <option value='select'> select </option>        
                        <option value='1'> 1 </option>
                            <option value='2'> 2 </option>
                            <option value='3'> 3 </option>
                        </FormControl>
                    </FormGroup>

                    <FormGroup className='field'>
                        <ControlLabel> Comment </ControlLabel>
                        <FormControl componentClass="textarea" type="text" name="comment" value={this.state.comment} onChange={this.onAddratingChange} />

                    </FormGroup>

                    <Button bsSize="large" className='submit' onClick={this.submitAddratingForm.bind(this)}>Submit</Button>
                
                </form>
            </div>
        );
    }
}

export default AddRating;