import React, { Component } from "react";
import MarbleLake1 from "../Images/MarbleLake3.jpg";
import MarbleLake2 from "../Images/MarbleLake2.jpg";
import MarbleLake3 from "../Images/MarbleLake3.png";
import MarbleLake4 from "../Images/MarbleLake4.jpg";
import MarbleLake5 from "../Images/MarbleLake5.jpg";

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader


class HomeView extends Component {

  
    render() {
      return (
          <div>
              <div className="card" style={{margin:"10px"}}>
                  <div className="card-body">
                      <h5 className="card-title">Welcome to our Marble Collection!</h5>
                      <p className="card-text">Explore our exquisite range of marble products.</p>
                  </div>
              </div>
  
              <Carousel className="mainCaruselDiv">
              <div>
                      <img className="carousel" src={MarbleLake5} />
                  </div>
                  <div>
                      <img className="carousel" src={MarbleLake2} />
                  </div>
                  <div>
                      <img className="carousel" src={MarbleLake1} />
                  </div>
                  <div>
                      <img className="carousel" src={MarbleLake3} />
                  </div>
                  <div>
                      <img className="carousel" src={MarbleLake4} />
                  </div>
                  
              </Carousel>
          </div>
      );
  }
}

export default HomeView;
