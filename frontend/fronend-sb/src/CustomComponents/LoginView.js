import {Component} from "react";
import PropTypes from "prop-types";


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

    QSendUserToParent = (state) => {
        this.props.QUserFromChild(state.user)
    }
    render(){
        //console.log(this.state)
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
                onClick={()=>this.QSendUserToParent(this.state)}
                  style={{margin:"10px"}} className="btn btn-primary bt">Sign up</button>
                </div>

        )
    }
}

LoginView.propTypes = {
    QUserFromChild: PropTypes.func.isRequired,
  };

export default LoginView;