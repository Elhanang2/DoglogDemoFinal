import React, {Component} from "react";
import "./QuickStart.css";
import {FormGroup,  FormControl,Form, Button} from "react-bootstrap"
import axios from "axios";
import { List, ListItem } from "../../components/List";
import { Card, CardText, Jumbotron,CardBody, CardLink, CardHeader } from 'reactstrap'; 
import {Redirect} from "react-router-dom";
 import PasswordForm from "../PasswordForm";
class QuickStart extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            search: "",
            password: "",
            firstname: "",
            volunteer: [],
            showform:false,
            showRatingForm: false,
            passwordfromdb: "",
            message: false
        }
        this.imageClick = this.imageClick.bind(this);
        this.handleQuicksearchChange = this.handleQuicksearchChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.onSubmitPassword = this.onSubmitPassword.bind(this);
    }

    handleQuicksearchChange = e => {
        // const { name, value } = e.target;
        // this.setState({ [name]: value });
        this.setState({ search: e.target.value });
      
    }
    handlePasswordChange = e => {
        this.setState({ password: e.target.value }); 
        
    }
    imageClick= (buttonid) => {
        this.setState({showform: buttonid})
        
    }
    componentDidMount() {
        this.getSearchedVolunteerData();
        // this.getVolunteerData();  
    }
    getSearchedVolunteerData = () => {
        const { search } = this.state;
        //  if(search){
            axios.get("/api/getVolunteer"
            ,{ params:{
                search: search 
            }}
      
            ).then(res => this.setState({ volunteer: res.data, firstname: res.data.firstname})
            ).catch(err => console.log(err))
         
        // }else if(!search){
        //     this.getVolunteerData();
        // }
    }
   
    onSubmitPassword= (password,name) => {
        // axios.get("/api/getPassword/:id")
        // .then(res => { this.setState({ passwordfromdb: res.data})})
        if(this.state.password === password){
          this.setState({showRatingForm: true, firstname:name})  
        }
    }
    onQuicksearchSubmit = (e) => {
        e.preventDefault();
        this.getSearchedVolunteerData();
    }
   
    
    getPasswordform = () => {
        
    }
    render(){
        
        return(
            
           <Form className="quick-start" >
           <div className="quicksearch-form">
                <FormGroup className="quicksearch" controlId="formControllsSearch">
                    <FormControl
                        type="text"
                        id="quicksearch"
                        name="search"
                        placeholder= "Search By Name"
                        value={this.state.search}
                        onChange={this.handleQuicksearchChange}
                    />
                </FormGroup>
                <Button
                    className="quickstart-button"
                    bsSize="large"
                    onClick={this.onQuicksearchSubmit}
                    type="submit"
                >
                    Search
                </Button>
                </div>
                <br />
                <br />
                {this.state.volunteer.length > 0 && <h2 style={{fontSize:"25px",clear:"both",marginLeft:"40%" ,paddingTop:"20px"}}>
                Volunteer Lists </h2>}
            
                {this.state.volunteer.length  ? ( 
                  <List>
                    {this.state.volunteer.map( volunteerdata => (
                     
                        <ListItem  className="volunteerlist" style={{ padding: "10px" }} key={volunteerdata._id} >
                    
                            <Card className="cards">
                           
                                <CardHeader ><span style={{ color: "darkorange",fontSize:"18px" }}>  {volunteerdata.firstname} </span></CardHeader>
                          
                                {<img className={volunteerdata._id} style={{width:150,height:150}} 
                                
                                onClick={() => this.imageClick(volunteerdata._id)}
                                src={ volunteerdata.image } alt="volunteerimage"/>}
                               {this.state.showform === volunteerdata._id && 
                                <PasswordForm message={this.state.message}
                                volunteer_id= {volunteerdata._id}
                                handlePasswordChange={this.handlePasswordChange}
                                onSubmitPassword={this.onSubmitPassword(volunteerdata.password,volunteerdata.firstname)}
                                />}               
                                {this.state.showRatingForm && <Redirect to={{
                                    pathname: '/quickrating',
                                    state: { firstname: this.state.firstname}
                                  }} />}
                                
                                    
                            <CardBody>
                            
                            {/*onClick={()=> this.getPasswordform(volunteerdata.password)} */}
                            </CardBody>
                            </Card>
                            {/*<button onClick={() => this.getVolenteerRatingFromdb(volunteerdata._id)}>Ratings</button>*/}
                        </ListItem>
                            
                    ))}
                
                  </List>
                ): null}  
              
            </Form>
           
         
        )
    }
}
export default QuickStart;