import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { apiURL } from '../essentials/configuration';



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
    axios.get(`/products`).then((res) => {
      this.setState({ products: res.data });
      console.log(res.data);
    }).catch((err) => {
      console.log("Error: "+ err.message);
    });
  }

  
  

  render() {
    let data = this.state.products;
    
    return (
      <div className="row row-cols-1 row-cols-md-3 g-4" style={{margin:"10px"}}>
      {data.length > 0 ?
          data.map((d)=>{
              return(
                  <div className="col" key={d.ProductID}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{d.Name}</h5>
                            <p className="card-text">{d.Description}</p>
                            <img src={`${apiURL}/images/${d.Pictures}`} alt="Product" style={{ width: "100%" }} />
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
