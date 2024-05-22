import React, { Component } from "react";
import PropTypes from 'prop-types'; // Import PropTypes
import axios from "axios";
import { toast } from "react-toastify";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editUser: {
        name: props.user.name || '',
        surname: props.user.surname || '',
        email: props.user.email || '',
        country: props.user.country || '',
        user: props.user.user || ''
      }
    }
  }

  QGetText = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      editUser: {
        ...prevState.editUser,
        [name]: value
      }
    }));
    console.log(this.state.editUser);
  }

  QEdit = () => {
    axios.put("/users/edit-profile", {
      userId: this.props.user.userId,
      username: this.state.editUser.user,
      email: this.state.editUser.email,
      name: this.state.editUser.name,
      surname: this.state.editUser.surname,
      country: this.state.editUser.country
    })
    .then((response) => {
      console.log("Profile updated successfully"+response.data);
      toast.success("Profile updated successfully");
      
    })
    .catch((error) => {
      console.log("Error updating profile: " + error.message);
      toast.error("Error updating profile");
      location.reload();
    });
    
  }

  render() {
    return (
      <div className="profile-container">
        <div className="profile-header">
          <h3 style={{ marginTop: "10px" }}>Welcome {this.props.user.user}</h3>
          <h4 className="form-label">Details</h4>
          <ul className="list-group">
          <li className="list-group-item">
              Username:
              <input
                name="user"
                onChange={this.QGetText}
                type="text"
                className="form-control"
                value={this.state.editUser.user}
              />
            </li>
            <li className="list-group-item">
              Name:
              <input
                name="name"
                onChange={this.QGetText}
                type="text"
                className="form-control"
                value={this.state.editUser.name}
              />
            </li>
            <li className="list-group-item">
              Surname:
              <input
                name="surname"
                onChange={this.QGetText}
                type="text"
                className="form-control"
                value={this.state.editUser.surname}
              />
            </li>
            <li className="list-group-item">
              Email:
              <input
                name="email"
                onChange={this.QGetText}
                type="email"
                className="form-control"
                value={this.state.editUser.email}
              />
            </li>
            <li className="list-group-item">
              Country:
              <input
                name="country"
                onChange={this.QGetText}
                type="text"
                className="form-control"
                value={this.state.editUser.country}
              />
            </li>
          </ul>
          <button style={{ marginTop: "10px" }} onClick={this.QEdit} className="btn btn-primary">Save changes</button>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired
};

export default Profile;
