import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import WhiteDolomite from "../Images/WhiteDolomite.jpg";
import SemiWhiteCalcite from "../Images/SemiWhiteCalcite.jpg";
import Tombolone from "../Images/Tombolone.jpg";
import SemiWhiteCalcite2 from "../Images/SemiWhite2.jpg";
import Tombolone2 from "../Images/Tombolon2.jpg";



class ProductView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products:[]
    }
  }


  QsetViewInParent = (obj) => {
    this.props.QsetViewInParent(obj);
  };
  componentDidMount() {
    axios.get("http://88.200.63.148:8121/products").then((res) => {
      this.setState({ products: res.data });
    }).catch((err) => {
      console.log("Error: "+ err.message);
    });
  }

  
  

  render() {
    let data = this.state.products;
    const imageMap = {
      1: WhiteDolomite,
      2: SemiWhiteCalcite,
      3: Tombolone,
      4: SemiWhiteCalcite2,
      5: Tombolone2
    };
    
    return (
      <div className="row row-cols-1 row-cols-md-3 g-4" style={{margin:"10px"}}>
      {data.length > 0 ?
          data.map((d)=>{
            console.log(d.ImagePath);
              return(
                  <div className="col" key={d.ProductID}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{d.Name}</h5>
                            <p className="card-text">{d.Description}</p>
                            <img src={imageMap[d.ProductID]} alt="Product" style={{width:"100%"}} />
                        </div>
                        <button 
                        onClick={() => this.QsetViewInParent({page:"oneProduct", productID:d.ProductID})}
                        style={{margin:"10px"}}  
                        className="btn btn-primary bt">Read more</button>
                    </div>
                  </div>
                  )
              })
               :"Loading..."}
      </div>
  
    );
  }
}

ProductView.propTypes = {
  QsetViewInParent: PropTypes.func.isRequired,
};

export default ProductView;
