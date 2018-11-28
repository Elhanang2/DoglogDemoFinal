import React from "react";
import {  Row } from "react-bootstrap";
import "./AboutContent.css";
const About =() => {
  
    return (
      
      <div className="about" style={{padding:"15px"}}>
        <Row>
          
          {<h2>about doglog</h2>}
            
            {<h3>
              welcome to la animal services. please check out the links on
              this website to learn more about our mission, vision, and
              values.
            </h3>}
            { <h3>
              the city of los angeles animal services department (laas) was
              established 153 years ago. its major areas of responsibility
              are saving the lives of animals that end up at one of our six
              city shelters, public safety and enforcement of municipal code
              (article 3:53.00).
            </h3>}
            { <h3>
              laas operates six animal shelters and has field staff serving
              the community. the shelters are award-winning facilities that
              have been built within the past 10-15 years. laas is one of
              the largest municipal shelter systems in the country, serving
              approximately 60,000 animals annually and responding to 20,000
              emergency calls each year involving animals or people in
              danger. each shelter has at least one veterinarian, as well as
              registered vet techs to assist. our veterinary team has
              training and experience in orthopedic surgery, wildlife, high
              volume spay/neuter and more.
            </h3>}
            { <h3>
              our field staff includes a world-class specialized mobile
              animal rescue team (s.m.a.r.t)– one of only two in the
              country, our animal control officers are recognized experts in
              handling animal cruelty cases, they handle permits and all
              code enforcement including licensing, spay/neuter, leash laws
              and more whether they are helping dogs, cats, hawks,
              alligators, horses, turtles, etc. or the people who love them
              or fear them.
            </h3>}
            
        </Row>
      </div>
    );
  
}

export default About;
