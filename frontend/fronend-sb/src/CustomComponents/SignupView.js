import {Component} from "react";
import PropTypes from "prop-types";
import axios from "axios";

class SignupView extends Component{
  constructor(props){
    super(props);
    this.state = {
        user: {
            type:"signup"
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

QPostSignup= ()=>{
  let name = this.state.user.name
  let surname = this.state.user.surname
  let username = this.state.user.username
  let email = this.state.user.email
  let password = this.state.user.password
  let country = this.state.user.country

  if (!username || !email || !password || !name || !surname || !country) {
    alert("Please fill in all fields.");
    return;
  }

  // Check if the email format is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  axios.post("http://88.200.63.148:8121/users/register",{
      username:this.state.user.username,
      email:this.state.user.email,
      password:this.state.user.password,
      name:this.state.user.name,
      surname:this.state.user.surname,
      country:this.state.user.country
  }).then((response)=>{
      console.log("sent to server "+response)
      this.QSendUserToParent(response.data)

  }).catch((error)=>{
      console.log(error.message)
  })
}
    render(){
      console.log(this.state)

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
                  aria-describedby="emailHelp"
                />
              </div>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                onChange={(e)=>this.QGetText(e)}
                  name="name"
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Surname</label>
                <input
                onChange={(e)=>this.QGetText(e)}
                  name="surname"
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Country</label>
                <input
                onChange={(e)=>this.QGetText(e)}
                  name="country"
                  type="text"
                  className="form-control"
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
            onClick={()=>this.QPostSignup()}
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