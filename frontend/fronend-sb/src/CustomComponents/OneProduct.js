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
      loading: true, //loading state
      isInWishlist: false
    };
  }

  

  AddToWishlist = () => {
    const { product } = this.state;
    const userID = this.props.userStatus.user.userId ? this.props.userStatus.user.userId : null;
    const productID = product[0].ProductID; // Ensure productID is defined
  
    console.log("userID:", userID);
    console.log("productID:", productID);
  
    axios.post("http://88.200.63.148:8121/wishlist", { userID, productID })
      .then(() => {
        console.log("Product added to wishlist");
        this.setState({ isInWishlist: true });
      })
      .catch(error => {
        console.error("Error:", error.message);
      });
  }
  
  
  isInWishlist = () => {
    const { product } = this.state;
    if (product && product.length > 0) {
      const userID = this.props.userStatus.user.userId || null;
      const productID = product[0].ProductID;

      axios.get("http://88.200.63.148:8121/wishlist/check", {
        params: {
          userID: userID,
          productID: productID
        }
      })
      .then(response => {
        this.setState({ isInWishlist: response.data.inWishlist });
        console.log("Is in wishlist:", this.state.isInWishlist);
      })
      .catch(error => {
        console.error("Error checking if product is in wishlist:", error);
      });
    } else {
      console.error("Product data is not available.");
    }
  }

  RemoveFromWishlist = () => {
    axios.delete("http://88.200.63.148:8121/wishlist", {
      params: {
        userID: this.props.userStatus.user.userId,
        productID: this.state.product[0].ProductID
      }
    })
    .then(() => {
      console.log("Product removed from wishlist");
      this.setState({ isInWishlist: false });
    })
    .catch(error => {
      console.error("Error removing product from wishlist:", error);
    });
  }

  //cart
  AddToCart = () => {
    const { product } = this.state;
    const userID = this.props.userStatus.user.userId ? this.props.userStatus.user.userId : null;
    const productID = product[0].ProductID; 
  
    console.log("userID:", userID);
    console.log("productID:", productID);
  
    axios.post("http://88.200.63.148:8121/cart", { userID, productID })
    .then(() => {
      console.log("Product added to cart");
    })
    .catch(error => {
      console.error("Error:", error.message);
    });
  }
  

  componentDidMount() {
    axios.get(`http://88.200.63.148:8121/products/${this.props.data}`)
      .then((response) => {
        this.setState({ product: response.data }, () => {
          this.isInWishlist(); // Call isInWishlist after product data is set
          console.log("Product data:", this.state.product);

        });
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
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
            <div className="heart-cart-container">
             <p className="product-description">{product[0].Description}</p>
             {this.props.userStatus.logged ? 
             <div className="heart-cart">
                  <button onClick={() => this.AddToCart()} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-truck" viewBox="0 0 16 16">
                    <path d="M11.5 4a.5.5 0 0 1 .5.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-4 0 1 1 0 0 1-1-1v-1h11V4.5a.5.5 0 0 1 .5-.5M3 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2m1.732 0h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4a2 2 0 0 1 1.732 1"/>
                  </svg>
                </button>
                {this.state.isInWishlist ?
                   <button onClick={()=>this.RemoveFromWishlist()} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-heart-fill" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                      </svg>
                  </button>
                  :
                  <button onClick={()=>this.AddToWishlist()} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                      </svg>
                  </button>
              }

            </div>: null}
          </div>
        </div>




            <div className="product-info">
              <div className="product-specs">
                <p>Price per ton: {product[0].Price}€</p>
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
  data: PropTypes.number.isRequired,
  QViewFromChild: PropTypes.func.isRequired,
  userStatus: PropTypes.object.isRequired,
  isInWishlist: PropTypes.bool.isRequired,
};

export default OneProductView;
