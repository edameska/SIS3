import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { apiURL } from '../essentials/configuration';


class WishListView extends Component {
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
    const userID = this.props.userStatus.user.userId ? this.props.userStatus.user.userId : null;
    if (!userID) {
      console.log("userID prop is undefined"+userID);
      return; // Exit early if userID is undefined
    }
  
    axios.get(`http://88.200.63.148:8121/wishlist/all/${userID}`)
      .then((res) => {
        this.setState({ products: res.data });
      })
      .catch((err) => {
        console.log("Error: " + err.message);
      });
  }
  
  

  

  render() {
    let data = this.state.products;

    
    return (
    <div>
         <h1 className="title">Wish List</h1>

      <div className="row row-cols-1 row-cols-md-3 g-4" style={{margin:"10px"}}>

      {data.length > 0 ?
          data.map((d)=>{
            console.log("ProductID:", d.ProductID); // Log the ProductID
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
      </div>
  
    );
  }
}

WishListView.propTypes = {
  QsetViewInParent: PropTypes.func.isRequired,
  userStatus: PropTypes.object.isRequired,
};

export default WishListView;
