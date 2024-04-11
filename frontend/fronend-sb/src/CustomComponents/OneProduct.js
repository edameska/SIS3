import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import WhiteDolomite from "../Images/WhiteDolomite.jpg";
import SemiWhiteCalcite from "../Images/SemiWhiteCalcite.jpg";
import Tombolone from "../Images/Tombolone.jpg";
import SemiWhiteCalcite2 from "../Images/SemiWhite2.jpg";
import Tombolone2 from "../Images/Tombolon2.jpg";

class OneProductView extends Component {
  QSetViewInParent = (obj) => {
    this.props.QViewFromChild(obj);
  }
  
  constructor(props) {
    super(props);
    this.state = {
      product: [], // Initialize as empty array
      loading: true, // Add loading state
    };
  }

  componentDidMount() {
    axios.get(`http://88.200.63.148:8121/products/${this.props.data}`)
      .then((response) => {
        this.setState({ product: response.data });
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        // Handle errors gracefully (e.g., display error message)
      })
      .finally(() => this.setState({ loading: false })); // Mark as loaded
  }

  render() {
    const { product, loading } = this.state;
    const imageMap = {
      1: WhiteDolomite,
      2: SemiWhiteCalcite,
      3: Tombolone,
      4: SemiWhiteCalcite2,
      5: Tombolone2
    };
    return (
      <div className="product-container"> 
        {loading ? (
          <div className="loading-message">Loading...</div>
        ) : product.length > 0 ? (
          <div className="product-details"> 
            <h2 className="product-name">{product[0].Name}</h2> 
            <hr />
            <div className="product-image-container">
              <img
                src={imageMap[product[0].ProductID]}
                alt={product[0].Name}
                className="product-image"
              />
             <p className="product-description">{product[0].Description}</p>

            </div>
            <div className="product-info">
              <div className="product-specs">
                <p>Price Per Ton: {product[0].Price}€</p>
                <p>Weight: {product[0].Weight} tons</p>
                <p>Dimensions: {product[0].Height} x {product[0].Width} x {product[0].Depth}</p>
                <p>Stock Level: {product[0].StockLevel}</p>
              </div>
              <button onClick={() => this.QSetViewInParent({ page: "products" })} className="btn btn-primary ">
                Return to Products
              </button>
            </div>
          </div>
        ) : (
          <div className="no-product-message">No product found</div>
        )}
      </div>
    );
  }
}

OneProductView.propTypes = {
  data: PropTypes.string.isRequired, // Make it required and specify type (string in this case)
  QViewFromChild: PropTypes.func.isRequired,
};

export default OneProductView;
