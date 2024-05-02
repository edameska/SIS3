import React, { Component } from "react";
import PropTypes from "prop-types";

import WhiteDolomite from "../Images/WhiteDolomite.jpg";
import SemiWhiteCalcite from "../Images/SemiWhiteCalcite.jpg";
import Tombolone from "../Images/Tombolone.jpg";
import SemiWhiteCalcite2 from "../Images/SemiWhite2.jpg";
import Tombolone2 from "../Images/Tombolon2.jpg";



class SearchView extends Component {
    render() {
      const { products } = this.props; //receive products from props
      const imageMap = {
        1: WhiteDolomite,
        2: SemiWhiteCalcite,
        3: Tombolone,
        4: SemiWhiteCalcite2,
        5: Tombolone2
      };
  
      return (
        <div className="row row-cols-1 row-cols-md-3 g-4" style={{ margin: "10px" }}>
          {products.length > 0 ? (
            products.map((d) => {
              return (
                <div className="col" key={d.ProductID}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{d.Name}</h5>
                      <p className="card-text">{d.Description}</p>
                      <img src={imageMap[d.ProductID]} alt="Product" style={{width:"100%"}} />
                      {/* Render image */}
                    </div>
                    <button
                      onClick={() => this.props.QsetViewInParent({ page: "oneProduct", productID: d.ProductID })}
                      style={{ margin: "10px" }}
                      className="btn btn-primary bt"
                    >
                      Read more
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No such product is found</p>
          )}
        </div>
      );
    }
  }
  

SearchView.propTypes = {
  QsetViewInParent: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default SearchView;
