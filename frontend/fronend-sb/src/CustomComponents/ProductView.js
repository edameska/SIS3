import {Component} from "react"
class ProductView extends Component{
    render(){
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
                style={{ margin: "10px" }}
                className="btn btn-primary bt"
                >
                Read more
                </button>
            </div>
            </div>
            </div>
        )
    }
}
export default ProductView