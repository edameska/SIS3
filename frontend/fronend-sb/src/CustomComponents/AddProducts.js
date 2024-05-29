import {Component} from "react";
import axios from 'axios'
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';


class AddProducts extends Component{

  constructor(props){
    super(props);
    this.state = {
        product:{}
    }
}


  QGetText = (e) => {
    this.setState(prevState=>({
        product:{...prevState.product, [e.target.name]:e.target.value}
    })
  )}
  QFileUpload = (e) => {
    this.setState(prevState => ({
      product: {
        ...prevState.product,
        image: e.target.files[0]
      }
    }));
  }
  
  


  addProduct = (product) => {
    console.log(product); 
  
    const { image, productName, pricePerTon, weight, height, width, depth, stockLevel, description } = this.state.product;
  
    const formData = new FormData();
    formData.append('image', image);
    formData.append('Name', productName);
    formData.append('Price', pricePerTon);
    formData.append('Weight', weight);
    formData.append('Height', height);
    formData.append('Width', width);
    formData.append('Depth', depth);
    formData.append('StockLevel', stockLevel);
    formData.append('Description', description);
    
    axios.post("/products", formData)
      .then(res => {
        console.log("Sent to server" + res);
        toast.success("Product added successfully");
      })
      .catch(err => {
        console.log(err.message);
        toast.error("Failed to add product");
      });
  }
  
  

render(){
  console.log(this.state.product)
    return(
        <div className="card" style={{ margin: "10px" }}>
        <h3 style={{ margin: "10px" }}>Welcome user</h3>
        <div className="mb-3" style={{ margin: "10px" }}>
          <label className="form-label">Product Name</label>
          <input
            onChange={(e)=>this.QGetText(e)}
            name="productName"
            type="text"
            className="form-control"
            placeholder="Product Name..."
          />
        </div>
        <div className="mb-3" style={{ margin: "10px" }}>
          <label className="form-label">Price per Ton</label>
          <input
            name="pricePerTon"
            onChange={(e)=>this.QGetText(e)}
            type="number"
            min="0.01" step="0.01"
            className="form-control"
            placeholder="Price..."
          />
        </div>
        <div className="mb-3" style={{ margin: "10px" }}>
          <label className="form-label">Weight</label>
          <input
            name="weight"
            onChange={(e)=>this.QGetText(e)}
            type="number"
            className="form-control"
            min="0.01" step="0.01"
            placeholder="Weight..."
          />
        </div>
        <div className="mb-3" style={{ margin: "10px" }}>
          <label className="form-label">Height</label>
          <input
            name="height"
            onChange={(e)=>this.QGetText(e)}
            type="number"
            min="0.01" step="0.01"
            className="form-control"
            placeholder="Height..."
          />
        </div>
        <div className="mb-3" style={{ margin: "10px" }}>
          <label className="form-label">Width</label>
          <input
            name="width"
            onChange={(e)=>this.QGetText(e)}
            type="number"
            min="0.01" step="0.01"
            className="form-control"
            placeholder="Width..."
          />
        </div>
        <div className="mb-3" style={{ margin: "10px" }}>
          <label className="form-label">Depth</label>
          <input
            name="depth"
            onChange={(e)=>this.QGetText(e)}
            type="number"
            min="0.01" step="0.01"
            className="form-control"
            placeholder="Depth..."
          />
        </div>
        <div className="mb-3" style={{ margin: "10px" }}>
          <label className="form-label">Stock Level</label>
          <input
            name="stockLevel"
            onChange={(e)=>this.QGetText(e)}
            type="number"
            min="0"
            className="form-control"
            placeholder="Stock Level..."
          />
        </div>
        <div className="mb-3" style={{ margin: "10px" }}>
          <label className="form-label">Description</label>
          <textarea name="description" onChange={(e)=>this.QGetText(e)} className="form-control" rows="3"></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">Default file input example</label>
          <input className="form-control" 
          type="file" 
          id="image"
          name="image"
          onChange={(e) => {this.QFileUpload(e)}} 
          />
        </div>

        <button  onClick={()=>this.addProduct(this.state.product)}
        className="btn btn-primary bt" style={{ margin: "10px" }}>
          Send
        </button>
      </div>
    )
}
}
AddProducts.propTypes = {
  QViewFromChild: PropTypes.func.isRequired,
};
export default AddProducts;