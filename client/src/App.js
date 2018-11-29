import React, { Component } from 'react';
import "./App.css";
import NavBar from './components/Navbar';
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route} from "react-router-dom";
import  {PrivateRoute,Login,  AuthButton} from "./components/Login";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import Animalinfo from "./components/Animalinfo";

import QuickStart from "./components/QuickStart";
import About from "./pages/About";
import AddRating from "./components/AddRating";
import DogSearch from "./components/SearchForm";


class App extends Component {
  render() {
    return (
      <div className="bigcontainer">
        
        <Router>
        
        <div>
        
        <NavBar />
        
          <Route exact path="/" component={About} />
          
          <Route exact path="/dogsearch" component={DogSearch} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/animals" component={Animalinfo} />  
          <Route exact path="/quickstart" component={QuickStart} />
          <Route exact path="/quickrating" component={AddRating} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/addrating" component={AddRating} />
        </div>
      </Router>
      
        <Footer />
        
      </div>
    );
  }
}

export default App;
