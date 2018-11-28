import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import axios from "axios";
import { Route,Redirect, withRouter,} from "react-router-dom";
import  Addrating from "../AddRating";

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <h4>
        Welcome!{"  to volunteer page"}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </h4>
    ) : (
      <h4></h4>
    )
);
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
 class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
      showSignup: false,
      volunteerrating: false,
      login: [],
      email: "",
      password: "",
      firstname: "",
      errmessage: false,
      isLoading: true,
      loginError:""
    };
    this.handleChange = this.handleChange.bind(this);
    
    this.onsignin = this.onsignin.bind(this);
  }
  componentDidMount() {
    this.setState({volunteerrating:false})
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  //-----------------------------
  
  onsignin(e){
    e.preventDefault();
    const {email, password } =this.state;
    const volunteerlogin={
      email,password
    }
    this.setState({isLoading:true})
          
    axios.get("/api/getVolunteerLogin", {params: {email: email,
      password: password
    }}).then(res =>{ 
      console.log("first name : "+ res.data.firstname)
      if((res.data.email === this.state.email) &&
        (res.data.password === this.state.password)){
          fakeAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true });
          });
        this.setState({volunteerrating:true, errmessage: false, firstname: res.data.firstname})
      }else{this.setState({errmessage: true})}
    }
    ).catch(err => console.log(err)) 
    
  }
  
    //----------------------
  
  onClickSignup(e){
    e.preventDefault();
    this.setState({showSignup: !this.state.showSignup })
  }
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  } 
  zhandleSubmit = event => {
    event.preventDefault();
  }

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;
    return (
      <div className="Login">
      
      {(this.state.loginError) ? <p>{this.state.loginError}</p>:null}
        <form onSubmit={this.handleSubmit}>
        
          {this.state.errmessage ? <h4 style={{color:"red",alignContent:"center"}}>Incorrect password or email </h4>
          :<h5 style={{color:"blue"}}>Log in to view the page at {from.pathname}</h5>}
          <FormGroup controlId="email" bsSize="large">
          <ControlLabel>email</ControlLabel>
            <FormControl
              // autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>password</ControlLabel>
            <FormControl
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              
            />

          </FormGroup>
          <Button
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            // onClick={this.loginOnClick.bind(this)}
            onClick={this.onsignin}
          >
            login
          </Button><br/>
          {/*this.state.volunteerrating ? <Redirect to={{
            pathname: '/addrating',
            state: { firstname: this.state.firstname}
          }} />:null*/}
          
          <p>No account ?   <a href="#" onClick={this.onClickSignup.bind(this)}>Signup
          {this.state.showSignup ? <Redirect to={{
            pathname: '/Signup'
          }} />: null}</a></p>
          
        </form>
      </div>
    );
  }
}
export {Login, PrivateRoute,AuthButton}
