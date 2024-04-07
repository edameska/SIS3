import {Component} from "react";
import PropTypes from "prop-types";

class SignupView extends Component{
  constructor(props){
    super(props);
    this.state = {
        user: {
            type:"login"
        }
    }
}
//name stores tha value of the input field
QGetText = (e) => {
    this.setState(prevState=>({
        user:{...prevState.user, [e.target.name]:e.target.value}
    })
)
}

QSendUserToParent = (state) => {
    this.props.QUserFromChild(state.user)
}
    render(){
        return(
            <div
            className="card"
            style={{
              width: "400px",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <form style={{ margin: "20px" }}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                onChange={(e)=>this.QGetText(e)}
                  name="username"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                onChange={(e)=>this.QGetText(e)}
                  name="email"
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" className="form-text">
                  Well never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                onChange={(e)=>this.QGetText(e)}
                  name="password"
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
            </form>
            <button
            onClick={()=>this.QSendUserToParent(this.state)}
            style={{ margin: "10px" }} className="btn btn-primary bt">
              Submit
            </button>
          </div>
        )
    }
}

SignupView.propTypes = {
  QUserFromChild: PropTypes.func.isRequired,
};
export default SignupView;