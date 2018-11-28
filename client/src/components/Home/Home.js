import React,{Component} from 'react'
import "./Home.css";
// import { Jumbotron } from "react-bootstrap";
import { Carousel  } from 'react-bootstrap';
import yellow3 from "./images/yellow3.jpg";
import yellow2 from "./images/yellow2.jpg";
import yellow1 from "./images/yellow1.jpg";
class Home extends Component {
          render() {
            
              return (
                 <div >
                <Carousel>
                    <Carousel.Item id="myCarousel">
                        <img height={400} src={yellow3}  alt="dogimage" />
                        <Carousel.Caption>
                        <h1 style={{fontSize:"300%"}}>doglog</h1>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item id="myCarousel">
                        <img height={400} src={yellow2}  alt="dogimage" />
                        <Carousel.Caption>
                        <h1 style={{fontSize:"300%"}}>doglog</h1>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item id="myCarousel">
                        <img height={400} src={yellow1}  alt="dogimage" />
                        <Carousel.Caption>
                        <h1 style={{fontSize:"300%"}}>doglog</h1>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                </div> 
              )
            }
        
  
     
 }
 
 export default Home

 

