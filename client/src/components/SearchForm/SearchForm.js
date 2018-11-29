import React,{Component} from "react";
import "./SearchForm.css";
import axios from "axios";
// import SearchResult from "../SearchResult";
import {Jumbotron } from "react-bootstrap";
import { List, ListItem } from "../../components/List";
import { Card, CardText, CardBody, CardLink, CardHeader } from 'reactstrap'; 
// import searchimage from "./images/dogs.jpg"
import { Button,FormGroup,FormControl,ButtonGroup,Form, Col} from 'react-bootstrap';

class Search extends Component {
    constructor(props) {
        super(props);
    
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.getVolenteerRatingFromdb =this.getVolenteerRatingFromdb.bind(this);
    this.state={
        showResult: false,
        showrating: "",
        id: "",
        animal: [],
        rating: [],
        animaltype: "",
        size: "",
        age: "",
        agelabel: "",
        sex: ""
    }
   }

componentDidMount() {
    // this.getSearchDataFromDb();
  }
  componentWillUnmount() {   
    
  }

  handleSearchChange= event=>{
        const { name, value }= event.target;
        this.setState({[name]: value})
    }
    
    onClicksubmit= (e) =>{
        e.preventDefault();
        this.getSearchDataFromDb();
        this.setState({ showResult: !this.state.showResult});
    }
    onClickRating=(animalid) => {
        // e.preventDefault();
    //   this.setState({showrating:!this.state.showrating})
        //this.getVolenteerRatingFromdb(animalid);
    }
    getSearchDataFromDb = ()=> {
    //   const imgid="";
        const { size, agelabel, sex}= this.state;
        axios.get("/api/getAnimal" 
        ,{ params:{
            size: size,
            agelabel: agelabel,
            sex: sex
        }}
    ).then(res => this.setState({ animal: res.data })
    ).catch(err => console.log(err)) 
    }

    getVolenteerRatingFromdb = (animalid) => {
        // {animal: animalid}console.log("get rating "+ res.data)
        axios.get("/api/getrating", { params:{ 
            animalid:animalid
            }}
        ).then(res => this.setState({ rating: res.data,showrating:animalid})
        // .then(res => this.setState({showRating:!this.state.showRating}))
        ).catch(err => console.log(err)).then(console.log("rating : "+ this.state.rating))
        
    }

    render() {
        return(
           <div className="search-div">
            <form className="search-form">
                
                {/*<img src={searchimage} alt="dogimage" />*/}
                
            
                <ButtonGroup className="search-button" vertical>
                
                <br/>
                    <FormGroup className="Button">
                        { /*<ControlLabel>Size</ControlLabel>*/}
                        <FormControl className="select"  componentClass="select" name="size" value={this.state.value} onChange={this.handleSearchChange}  placeholder="select size">
                            <option value="select"> what size of dog?</option>
                            <option value="small">small</option>
                            <option value="medium">medium</option>
                            <option value="large">large</option>
                            <option value="extra-large">extra large</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup className="Button">
                    {/*<ControlLabel>Age</ControlLabel>*/}
                        <FormControl className="select" componentClass="select" name="agelabel" value={this.state.value} onChange={this.handleSearchChange} placeholder="Age">
                            <option value="select">which age group?</option>
                            <option  value="baby">baby</option>
                            <option  value="young">young</option>
                            <option value="adult">adult</option>
                            <option  value="senior">senior</option>
                        </FormControl>
                    </FormGroup>
        
                    <FormGroup className="Button">
                        {/*<ControlLabel>Sex</ControlLabel>*/}
                        <FormControl className="select" componentClass="select" name="sex" value={this.state.value} onChange={this.handleSearchChange} placeholder="select sex">
                            <option value="select">male or female?</option>
                            <option value="female">female</option>
                            <option value="male">male</option>

                        </FormControl>
                    </FormGroup>
                
                
                    
                        <Button  onClick={this.onClicksubmit} type="submit">Search</Button>
                        <br/>
                        <br/>
                </ButtonGroup>
                {this.state.animal.length > 0 && 
                <h3 style={{fontSize:"32px",paddingLeft:"0"}}></h3> }
            
                {this.state.animal.length > 0 ? ( 
                  <List>
                    {this.state.animal.map(animaldata => (
                      <ListItem inline style={{width:"300px"}} className="doglist"  key={animaldata._id}>
                
                        <Card className="cards">
                          <CardBody>
                          <CardHeader ><span style={{ color: "darkorange",fontSize:"22px" }}>Dog Name : {animaldata.dogname} </span></CardHeader>
                          </CardBody>
                          {<img style={{width:150,height:150}} src={ animaldata.image } alt="dogimage"/>}
                          <CardBody>
                          <CardText><span style={{ color: "darkorange",fontSize:"22px" }}> Weight : {animaldata.weight} </span></CardText>
                          <CardText><span style={{ color: "darkorange",fontSize:"22px" }}> Age : {animaldata.age} </span></CardText>
                          <CardText><span style={{ color: "darkorange",fontSize:"22px" }}> Sex : {animaldata.sex} </span></CardText>
                          
                          </CardBody>
                        </Card>
                    <Button style={{marginLeft:"-5px"}} onClick={()=> { this.getVolenteerRatingFromdb(animaldata._id)}}>Ratings</Button>
                   
                    {this.state.showrating === animaldata._id && this.state.rating.length >0 && 
                        // <Jumbotron style={{backgroundColor:"paleturquoise"}}>
                    <h1 style={{color:"maroon", paddingLeft:"0px"}}></h1> 
                    // </Jumbotron>
                }
                        {this.state.showrating === animaldata._id && this.state.rating.length >0 ? ( 
                          <ul style={{width:"100%"}}>
                            {this.state.rating.map(ratingdata => (
                              <li inline className="ratinglist" style={{width:"100%"}} key={ratingdata._id}>
                             <p> Volunteer Comment : {ratingdata.comment}</p>
                               
                            
                              </li>
                            ))}
                          </ul>
                            ) : null}                
                            
                            
                    </ListItem>
                    ))}
                  </List>
                    ):null}  
                   
                         
                    
                        {/* this.state.showrating && <SearchResult rating={this.state.rating}   />  */}      
    
                    
            </form>
            </div> 
        )}}

export default Search;