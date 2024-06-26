import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";


class AboutView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      message: ""
    };
  }

  handleSubmit = () => {
    const email = this.state.email;
    const message = this.state.message;
    console.log(email+" "+message);
    axios.post("/contact",{email, message})
    .then((response) => {
      console.log(response);
      this.setState({ email: "", message: ""});
      toast.success("Message sent successfully");
      
    }).catch(error => {
      console.error("Error:", error.message);
      toast.error("Message not sent");
    });   
  };

  handleChangeE = (event) => {
    this.setState({ email: event.target.value });
  };
  handleChangeT = (event) => {
    this.setState({ message: event.target.value });
  };

  render() {
    return (
      <div>

        <div className="card" style={{ margin: "10px" }}>
          <div className="card-body">
            <h5 className="card-title">Contact us</h5>
            <form onSubmit={this.handleSubmit}>
              <div className="mb-3">
                
                <label htmlFor="emailInput" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter your email"
                  value={this.state.email}
                  onChange={this.handleChangeE}
                />
                <br />
                <label htmlFor="messageInput" className="form-label">
                  Message
                </label>
                <textarea
                className="form-control"
                id="textInput"
                rows="4" 
                placeholder="Message..."
                value={this.state.message}
                onChange={this.handleChangeT}
              />
                
              
                <div id="emailHelp" className="form-message">
                  We will never share your email with anyone else.
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutView;
