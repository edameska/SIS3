// Import necessary modules
import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";

// Import product images
import WhiteDolomite from "../Images/WhiteDolomite.jpg";
import SemiWhiteCalcite from "../Images/SemiWhiteCalcite.jpg";
import Tombolone from "../Images/Tombolone.jpg";
import SemiWhiteCalcite2 from "../Images/SemiWhite2.jpg";
import Tombolone2 from "../Images/Tombolon2.jpg";

class CartView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
    };
  }

  componentDidMount() {
    const userID = this.props.userStatus.user.userId || null;
    axios
      .get(`http://88.200.63.148:8121/cart/all/${userID}`)
      .then((res) => {
        this.setState({ products: res.data, loading: false });
      })
      .catch((err) => {
        console.log("Error: " + err.message);
      });
  }

  render() {
    const { products, loading } = this.state;
    let total = 0; // Initialize total outside the loop
    const imageMap = {
      1: WhiteDolomite,
      2: SemiWhiteCalcite,
      3: Tombolone,
      4: SemiWhiteCalcite2,
      5: Tombolone2,
    };
  
    return (
      <div>
        <h1 className="title">My Cart</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          products.map((product) => {
            const productTotal = product.Price * product.Weight * product.quantity; // Calculate total for each product
            total += productTotal; // Add product total to the overall total
            return (
              <div className="row" key={product.ProductID}>
                <div className="col-lg-7">
                  {/* Product details */}
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex flex-row align-items-center">
                          <div>
                            <img
                              src={imageMap[product.ProductID]}
                              className="img-fluid rounded-3"
                              alt="Shopping item"
                              style={{ width: "65px" }}
                            />
                          </div>
                          <div className="ms-3">
                            <h5>{product.Name}</h5>
                            <p className="small mb-0">{product.Description}</p>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <div style={{ width: "50px" }}>
                            <h5 className="fw-normal mb-0">{product.quantity}</h5>
                          </div>
                          <div style={{ width: "80px" }}>
                            <h5 className="mb-0">{productTotal}€</h5>
                          </div>
                          <a href="#!" style={{ color: "#cecece" }}>
                            <i className="fas fa-trash-alt"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  {/* Card details */}
                  {/* Add your card details section here */}
                </div>
              </div>
            );
          })
        )}
        {/* Display total outside the loop */}
        {!loading && (
          <div>Total: {total}€</div>
        )}
      </div>
    );
  }}
  
  

CartView.propTypes = {
  QsetViewInParent: PropTypes.func.isRequired,
  userStatus: PropTypes.object.isRequired,
};

export default CartView;
