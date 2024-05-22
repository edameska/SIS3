import {Component} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";


//change it so we use sessioning
//handle emty field for extra points
class LoginView extends Component{

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

    QSendUserToParent = (obj) => {
        this.props.QUserFromChild(obj)
    }

    QPostLogin = () => {
        let user = this.state.user;
        axios.post("/users/login", {
            username: user.username,
            password: user.password
        }, { withCredentials: true })
        .then((res) => {
            if (res.data.logged) {
                toast.success("✅ Logged in successfully",{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                console.log("User logged in successfully");
                console.log(res.data);
                this.QSendUserToParent(res.data);

            } else {
                console.log("User not registered or incorrect credentials");
                toast.error("User not registered or incorrect credentials!");
    }})
        .catch((error) => {
            console.log("Error logging in: " + error.message);
            toast.error("Error logging in: " + error.message)
        });
    }
    

    render(){
        return(
            <div className="card" style={{width:"400px", marginLeft:"auto", marginRight:"auto", marginTop:"10px", marginBottom:"10px"}}>
                <form style={{margin:"20px"}} >
                    <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input onChange={(e)=>this.QGetText(e)} name="username"  type="text" className="form-control" id="exampleInputEmail1"/>
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input onChange={(e)=>this.QGetText(e)} name="password" type="password" className="form-control" id="exampleInputPassword1"/>
                    </div>
                </form>
                <button
                onClick={()=>this.QPostLogin()}
                  style={{margin:"10px"}} className="btn btn-primary bt">Sign up</button>
                </div>

        )
    }
}

LoginView.propTypes = {
    QUserFromChild: PropTypes.func.isRequired,
  };

export default LoginView;