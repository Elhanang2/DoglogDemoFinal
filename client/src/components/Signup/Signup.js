
import React, { Component } from 'react';
import axios from 'axios';

import { FormGroup, FormControl,ControlLabel,Button } from "react-bootstrap";
import "./Signup.css";
import {Redirect} from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  
    this.state = {
  
      data: [],
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      password_confirm: '',
      showLogin: false,
      showresult: false,
      isLoading: true,
      loading: false,
      passwordNotMuch:false,
      signUpError: ''
    };
  }
  
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 6 && this.state.firstname.length>3 && this.state.lastname.length>3 ;
  }
  componentDidMount() {
    this.setState({
      isLoading: false
    });
    
  }
  componentWillUnmount() {
    
  }

  handleInputChange = e => {
    
   const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  onClickLogin(e){
    e.preventDefault();
    this.setState({showLogin: !this.state.showLogin })
  }
  onSubmit = (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password, password_confirm } = this.state;
    this.setState({isLoading: true })
    if(password ===password_confirm  ){

    
    
    const formData = new FormData();
    var imagefile = document.querySelector('#volunteerImg');

    this.setState({loading: true}, () => {
      formData.append("image", imagefile.files[0]);
      console.log(formData);
      axios.post("https://api.imgur.com/3/image", 
        formData,
        {
        "headers": {
          "Authorization":"Client-ID 7aca4ff5e398a1a",
          'Content-Type': 'multipart/form-data'

        }
      
      }).then((response)=>{
        //console.log("img result "+ response);
        //this.getImgurl(response.id);
        const postVolunteer ={
          firstname, 
          lastname,
          email,
          password, 
          password_confirm,
          'image': response.data.data.link
        };
    
          axios.post('/api/volunteer/signup', postVolunteer)
          .then((result) => {
            console.log(result.message);
            //access the results here....
            // this.getDataFromDb();
            this.setState({
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                password_confirm:"",
                image: "",
                loading: false,
                isLoading: false,
                showLogin: true,
                signUpError: result.message
                
              });
              
          }).catch(err => {
            console.log(err);
            this.setState({isLoading:false,signUpError:err.message, loading: false})
          });
        // }else{ this.setState({passwordNotMuch: true}) }

       })
    })
  }else if(password !== password_confirm){
    this.setState({passwordNotMuch:!this.state.passwordNotMuch})
  }
  }
  
  render() {
    const {signUpError}=this.state;
    return (
    
      <div className="signup">
        <form >
        <h3>Volunteer Registration Form</h3><br/>
        {(signUpError)? <p>{signUpError}</p>:null}
        {this.state.passwordNotMuch && <h4 style={{color:"red",alignContent:"center"}}>password not much </h4> }
          <FormGroup controlId="formControlsFirstname" bsSize="large">
            <ControlLabel>First name: </ControlLabel>
            <FormControl
              type="text"
              name="firstname"
              value={this.state.firstname}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup controlId="formControlsLastname" bsSize="large">
            <ControlLabel>Last name: </ControlLabel>
            <FormControl
              type="text"
              name="lastname"
              value={this.state.lastname}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup controlId="formControlsEmail" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup controlId="formControlsPassword" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              autoFocus
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}    
            />
          </FormGroup>
          <FormGroup controlId="formControlsPasswordConfirm" bsSize="large">
            <ControlLabel>Password Confirm</ControlLabel>
            <FormControl
              autoFocus
              type="password"
              name="password_confirm"
              value={this.state.password_confirm}
              onChange={this.handleInputChange}    
            />
          </FormGroup>
          <FormGroup controlId="formControlsAttach" bsSize="large">
            <ControlLabel>Attach Image</ControlLabel>
            <FormControl
              autoFocus
              type="file"
              style={{fontFamily:'Give You Glory'}}
              name="img"
              id="volunteerImg"
              onChange={this.handleInputChange}
              multiple
              value={this.state.img}  
            />
          </FormGroup>
          {
            this.state.loading
             ? 
              (
                <Button
                disabled={true}
                >LOADING
                </Button>
              )
             : 
             (
               <Button
                  // block
                  // bsSize="large"
                  // disabled={!this.validateForm()}
                  type="submit"
                  onClick={this.onSubmit}
                >
                Register
                {this.state.showLogin ? <Redirect to={{
                  pathname: '/Login'
                }} />: null}
                </Button>
                
            )
          }
          <br />
          <p>if you have an account  <a  type="submit" href="" onClick={this.onClickLogin.bind(this)}>login
          {this.state.showLogin ? <Redirect to={{
            pathname: '/Login'
          }} />: null}</a></p>
        </form>
        
        </div>
    );
  }
}
export default Signup;