
import React, { Component } from 'react';
import axios from 'axios';

import { FormGroup, FormControl,ControlLabel,Button, Form } from "react-bootstrap";
import "./Animalinfo.css";

class Animalinfo extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleInputChange = this.handleInputChange.bind(this);  
        this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      animal: [],
      id: '',
      breed: '',
      dogname: '',
     weight: '',
     image: "",
      sex: '',
      age: '',
      zipcode: '',
      message: "",
      loading: false,
    };
}

  
  handleInputChange = e => {
    
   const { name, value } = e.target;
    this.setState({ [name]: value });
    
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    const { id, breed, dogname, weight , sex, age,zipcode } = this.state;
    

    const formData = new FormData();
    var imagefile = document.querySelector('#animalImg');

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
      // console.log("img result "+ response);
      //this.getImgurl(response.id);
      const postData = { 
        id, 
        breed, 
        dogname, 
        weight, 
        sex,
        zipcode,
        age,
        'image': response.data.data.link
      };

      axios.post('/api/putAnimal', postData)
      .then((result) => {
        //access the results here....
        // this.getDataFromDb();
        
        this.setState({
            
            id: '',
            breed: '',
            dogname: '',
           weight: '',
            sex: '',
            age: '',
            zipcode: '',
           image: '',
            loading: false,
            
          });
      }).catch(err => {
        alert(err);
        this.setState({loading: false})
      });
    })
  
    })
    
  }
//   getImgurl=(imgid)=> {
//     axios.get("https://api.imgur.com/3/image/"+ imgid, {'headers': {
//       "Authorization":"Client-ID  8ee1b4d05dd499f"}}).then((response)=>{
        
//       })
// }
  
  render() {
    
    return (
    
      <div className="animaldata">
        <form>
        <h3>Dog Information</h3>
          <FormGroup controlId="formControlsId" bsSize="large">
              <ControlLabel>id </ControlLabel>
              <FormControl
                  type="id"
                  name="id"
                  value={this.state.id}
                  onChange={this.handleInputChange}
                  />
          </FormGroup>
          <FormGroup controlId="formControlsanimaltype" bsSize="large">
              <ControlLabel>species </ControlLabel>
              <FormControl
                type="text"
                name="breed"
                value={this.state.breed}
                onChange={this.handleInputChange}
              />
          </FormGroup>
                
        
          <FormGroup controlId="formControlsName" bsSize="large">
            <ControlLabel>name</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              name="dogname"
              value={this.state.dogname}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup controlId="formControlsWeight" bsSize="large">
            <ControlLabel>weight</ControlLabel>
            <FormControl
            autoFocus
            type="number"
            name="weight"
              value={this.state.weight}
              onChange={this.handleInputChange}
              
            />
          </FormGroup>
          <FormGroup controlId="formControlsAge" bsSize="large">
            <ControlLabel>age</ControlLabel>
            <FormControl
            autoFocus
            type="number"
            name="age"
              value={this.state.age}
              onChange={this.handleInputChange}
              
            />
          </FormGroup>
          <FormGroup controlId="formControlsSex" bsSize="large">
            <ControlLabel>sex</ControlLabel>
            <FormControl
              autoFocus
              type="sex"
              name="sex"
              value={this.state.sex}
              onChange={this.handleInputChange}
              
            />
          </FormGroup>
          <FormGroup controlId="formControlsZip" bsSize="large">
            <ControlLabel>Zip Code</ControlLabel>
            <FormControl
              autoFocus
              type="number"
              name="zipcode"
              value={this.state.zipcode}
              onChange={this.handleInputChange}
              
            />
          </FormGroup>
          <FormGroup controlId="formControlsimg" bsSize="large">
            <ControlLabel>img</ControlLabel>
            <FormControl
              autoFocus
              type="file"
              name="img"
              id="animalImg"
              onChange={this.handleInputChange}
              multiple
              value={this.state.img}
            />
            <p>{this.state.message}</p>
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
                Submit
                </Button>
            )
          }
          <br />
          
          
        </form>
        
        </div>
    );
  }
}
export default Animalinfo;