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

  ChangeQuantity(productID, quantity) {
    const userID = this.props.userStatus.user.userId || null;
    axios
      .put(`http://88.200.63.148:8121/cart/`, {userID, productID, quantity})
      .then((res) => {
        this.setState({ products: res.data});
        console.log("Quantity changed");
      })
      .catch((err) => {
        console.log("Error: " + err.message);
      });
  }
  RemoveProduct(productID) {
    const userID = this.props.userStatus.user.userId || null;
    console.log(userID, productID);
    axios
      .delete(`http://88.200.63.148:8121/cart/`, {
        params: {
          userID: userID,
          productID: productID,
        }
      })
      .then((res) => {
        this.setState({ products: res.data});
        console.log("Product removed");
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
                <div className="col-20 col-lg-15" >
                  <div className="card mb-5" style={{padding:"1%"}}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex flex-row align-items-center" style={{ marginRight: "10%"}}>
                          <div className="col-3">
                            <img
                              src={imageMap[product.ProductID]}
                              className="img-fluid rounded-3"
                              alt="Shopping item"
                              style={{ width: "105px" }}
                            />
                          </div>
                          <div className="ms-3 col-10 col-md-10 col-lg-10 col-xl-10">
                            <h5 >{product.Name}</h5>
                            <p className="col-9 small mb-0">{product.Description}</p>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center" >
                          <div className="col-7 col-md-4 col-lg-4 col-xl-4 d-flex"  >
                            <button
                              className="btn px-2"
                              onClick={() => {
                               this.ChangeQuantity(product.ProductID, product.quantity - 1);
                              }}
                              style={{color:"white", padding:" 2% 4%", fontSize:" 1em"}}
                            >
                              -
                            </button>

                            <input
                              id="form1"
                              min="1"
                              name="quantity"
                              value={product.quantity}
                              type="number"
                              className="form-control form-control-sm col-4"
                              onChange={(e)=>{
                                this.ChangeQuantity(product.ProductID, e.target.value);
                              }}
                              style={{padding:" 100", fontSize:" 1em"}}
                            />

                            <button
                              className="btn px-2"
                              onClick={() => {
                                this.ChangeQuantity(product.ProductID, product.quantity + 1)
                              }}
                              style ={{color:"white"}}
                            >
                              +
                            </button>
                          </div>
                          </div>

                          <div  className="d-flex flex-row align-items-center" >
                            <div style={{ width: "70%", margin:"10%", marginLeft:"15%"}}>
                            <h5 className="mb-0">Product total:{<br></br>}{productTotal}€</h5>
                           </div>
                             <div  className="d-flex flex-row align-items-center" style={{ marginLeft:"auto",marginRight:"10" ,height:"100%",  borderRadius: "25px"}}> 
                               <button  className="btn px-2" style={{ border: 'none', background: 'lightBlue', cursor: 'pointer' , height:"100%"}} onClick={()=>{this.RemoveProduct(product.ProductID)}}>
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="maroon" className="bi bi-trash" viewBox="0 0 16 16">
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                </svg>
                                </button>
                              </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  {/* Card details */}
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
