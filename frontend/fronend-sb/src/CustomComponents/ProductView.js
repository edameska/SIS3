// ProductView.js
import React, { Component } from "react";
import PropTypes from "prop-types";

class ProductView extends Component {
  QsetViewInParent = (obj) => {
    this.props.QsetViewInParent(obj);
  };

  render() {
    return (
      <div
        className="row row-cols-1 row-cols-md-2 g-1"
        style={{ margin: "20px" }}
      >
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Slug</p>
            </div>
            <button
              onClick={() =>
                this.QsetViewInParent({ page: "oneProduct", id: 1 })
              }
              style={{ margin: "10px" }}
              className="btn btn-primary bt"
            >
              Read more
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ProductView.propTypes = {
  QsetViewInParent: PropTypes.func.isRequired,
};

export default ProductView;
