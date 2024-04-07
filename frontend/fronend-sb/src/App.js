import { Component } from "react";
//
import AboutView from "./CustomComponents/AboutView";
import HomeView from "./CustomComponents/HomeView";
import ProductView from "./CustomComponents/ProductView";
import AddProducts from "./CustomComponents/AddProducts";
import LoginView from "./CustomComponents/LoginView";
import SignupView from "./CustomComponents/SignupView";
//import OneProductView from "./CustomComponents/OneProduct";

//app exports what its rendering
class App extends Component {

  constructor(props) {
    super(props)
    this.state={
      CurrentPage:"none"
    }//state is an object wher eyou can store data

  }

    QSetView=(obj)=>{
      this.setState({
        CurrentPage:obj.page
      }) 
      console.log(obj)     
    }
    QGetView=(state)=>{
      let page= state.CurrentPage
      switch(page){
        case "home":
          return <HomeView/>
        case "about":
          return <AboutView/>
        case "products":
          return <ProductView/>
        case "edit":
          return <AddProducts/>
        case "login":
          return <LoginView/>
        case "signup":
          return <SignupView/>
        default:
          return <HomeView/>
      }
    }

  render() {
    

    //inbuilt function
    return (
      <div id="APP" className="container">
        <div id="menu" className="row">
          <nav className="navbar">
            <div className="container-fluid">
              <a onClick={()=>this.QSetView({page:"home"})}className="navbar-brand" href="#">
                Timeless Treasure
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a onClick={()=>this.QSetView({page:"about"})} className="nav-link " href="#">
                      About
                    </a>
                  </li>

                  <li className="nav-item">
                    <a onClick={()=>this.QSetView({page:"products"})} className="nav-link " href="#">
                      Products
                    </a>
                  </li>

                  <li className="nav-item">
                    <a onClick={()=>this.QSetView({page:"edit"})} className="nav-link" href="#">
                      Edit products
                    </a>
                  </li>

                  <li className="nav-item">
                    <a onClick={()=>this.QSetView({page:"signup"})} className="nav-link " href="#">
                      Sign up
                    </a>
                  </li>

                  <li className="nav-item">
                    <a onClick={()=>this.QSetView({page:"login"})} className="nav-link " href="#">
                      Login
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div id="viewer" className="row container">
          {this.QGetView(this.state)}

        </div>
      </div>
    );
  }
}

export default App;
