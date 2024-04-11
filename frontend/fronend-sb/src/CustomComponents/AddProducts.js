import {Component} from "react";
import axios from 'axios'
import PropTypes from 'prop-types';


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
  ) 
  }

  addProduct = (product) => {
    axios.post("http://88.200.63.148:8121/products", {
      Name: product.productName,
      Price: product.pricePerTon,
      Weight: product.weight,
      Height: product.height,
      Width: product.width,
      Depth: product.depth,
      StockLevel: product.stockLevel,
      Description: product.description,
    }).then(res=>{
      console.log("Sent to server"+res)
    }).catch(err=>{
      console.log(err.message)
    })
    this.props.QViewFromChild({page:"products"})
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