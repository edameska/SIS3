import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { apiURL } from '../essentials/configuration';
import {toast} from 'react-toastify';

class EditProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      loading: true,
    };

    this.QSetViewInParent = (obj) => {
      this.props.QViewFromChild(obj);
    };
  }

  QGetText = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => {
      const updatedProduct = { ...prevState.product[0], [name]: value };
      return { product: [updatedProduct] };
    }, () => {
      console.log("Updated product:", this.state.product);
    });
  }

  QFileUpload = (e) => {
    const selectedImage = e.target.files[0];

    this.setState(prevState => ({
      product: {
        ...prevState.product,
        image: e.target.files[0]
      }
    }));
    // To change image immediately
    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById('product-image').src = e.target.result;
    };
    reader.readAsDataURL(selectedImage);

    
    console.log("Image:", e.target.files[0]);
    this.editImage(e.target.files[0]);
  }

  editProduct = () => {
    const {  Name, Price, Weight, Height, Width, Depth, StockLevel, Description } = this.state.product[0];
 
    axios.put(`/products/${this.props.data}`, {
      Name,
      Price,
      Weight,
      Height,
      Width,
      Depth,
      StockLevel,
      Description
    
    })
      .then(res => {
        console.log("Sent to server: " + res);
        toast.success("Product updated successfully!");
      })
      .catch(err => {
        console.log(err.message);
        toast.error("Error updating product!");
      });
  }

  editImage = (img) => {

    console.log("Image:", img);
    const formData = new FormData();
    formData.append('image', img);
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }    
  axios.put(`/products/edit-image/${this.props.data}`, formData)
      .then(res => {
        console.log("Sent to server: " + res);
        toast.success("Image updated successfully!");
      })
      .catch(err => {
        console.log(err.message);
        toast.error("Error updating image!");
      });

  }
  componentDidMount() {
    axios.get(`/products/${this.props.data}`)
      .then((response) => {
        this.setState({ product: response.data }, () => {
          console.log("Product data:", this.state.product);
        });
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      })
      .finally(() => this.setState({ loading: false }));
  }


  
  render() {
    const product = this.state.product[0];
    const loading = this.state.loading;
    console.log("product in render :"+product);

    return (
      <div className="card" style={{ margin: "10px" }}>
        <h3 style={{ margin: "10px" }}>Welcome user</h3>
        <div className="mb-3" style={{ margin: "10px" }}>
          {loading ? (
            <p>Loading...</p>
          ) : !product ? (
            <p>No product details available.</p>
          ) : (
            <div className="product-details">
              <h2 className="product-name">Name</h2>
              <input
                size="5"
                name="Name"
                onChange={this.QGetText}
                type="text"
                className="form-control"
                value={product.Name || ''}
              />
              <hr />
              <div className="product-image-container">
                <div className="pic">
                  <label className="-label" htmlFor="file">
                    <span>Change Image</span>
                  </label>
                  <input id="file" type="file" onChange={this.QFileUpload} />
                  <img id="product-image" src={`${apiURL}/images/${product.Pictures}`} alt="Product" style={{ width: "70%" }} />
                </div>                
                <div className="heart-cart-container">
                  <p className="product-description"><strong>Description:</strong></p>
                  <textarea
                    style={{ width: "100%", height: "100px", marginLeft: "10%" }}
                    name="Description"
                    onChange={this.QGetText}
                    type="text"
                    className="form-control"
                    value={product.Description || ''}
                  />
                </div>
              </div>
              <div className="product-info">
                <div className="product-specs">
                  <p>Price per ton (in Euros): </p>  
                  <input
                    size="5"
                    name="Price"
                    onChange={this.QGetText}
                    type="number"
                    className="form-control"
                    value={product.Price || ''}
                  />
                  <p>Weight(in tons):</p>
                  <input
                    size="10"
                    name="Weight"
                    onChange={this.QGetText}
                    type="number"
                    className="form-control"
                    value={product.Weight || ''}
                  />
                  
                  <p>Dimensions (height x width x depth):</p>
                  <input
                    size="10"
                    name="Height"
                    onChange={this.QGetText}
                    type="number"
                    className="form-control"
                    value={product.Height || ''}
                  />
                  <p></p>
                  <input
                    size="10"
                    name="Width"
                    onChange={this.QGetText}
                    type="number"
                    className="form-control"
                    value={product.Width || ''}
                  />
                  <p></p>
                  <input
                    size="10"
                    name="Depth"
                    onChange={this.QGetText}
                    type="number"
                    className="form-control"
                    value={product.Depth || ''}
                  />
                  <p>Stock Level: </p>
                  <input
                    size="10"
                    name="StockLevel"
                    onChange={this.QGetText}
                    type="number"
                    className="form-control"
                    value={product.StockLevel || ''}
                  />
                </div>
                <button onClick={() => this.QSetViewInParent({ page: "products" })} className="btn btn-primary">
                  Return to Products
                </button>
              </div>
            </div>
          )}
        </div>
        <button onClick={() => this.editProduct()} className="btn btn-primary" style={{ margin: "10px" }}>
          Submit
        </button>
      </div>
    );
  }
}

EditProductView.propTypes = {
  data: PropTypes.number.isRequired,
  QViewFromChild: PropTypes.func.isRequired,
  userStatus: PropTypes.object.isRequired,
};

export default EditProductView;
