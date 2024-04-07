import React, { Component } from "react";
import TomboloneImage from "../Images/Tombolone.jpg";
import SemiWhiteCalciteImage from "../Images/SemiWhiteCalcite.jpg";
import WhiteDolomiteImage from "../Images/WhiteDolomite.jpg";


class HomeView extends Component {
  
    render() {
      //make the carousel images link to the respective products
        return (
          <div>
            <div className="card" style={{margin:"10px"}}>
              <div className="card-body">
                <h5 className="card-title">Welcome!!!</h5>
                <p className="card-text">You are in the home page</p>
              </div>
            </div>

            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src={TomboloneImage} alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={SemiWhiteCalciteImage} alt="Second slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={WhiteDolomiteImage} alt="Third slide" />
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
          </div>
        );
    }
}

export default HomeView;
