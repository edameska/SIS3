import React, { Component } from "react";
import PropTypes from "prop-types";

import { apiURL } from '../essentials/configuration';




class SearchView extends Component {
    render() {
      const { products } = this.props; //receive products from props

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
                      <img src={`${apiURL}/images/${d.Pictures}`} alt="Product" style={{ width: "100%" }} />
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
