import { Component } from "react";
//
import AboutView from "./CustomComponents/AboutView";
import HomeView from "./CustomComponents/HomeView";
import ProductView from "./CustomComponents/ProductView";
import AddProducts from "./CustomComponents/AddProducts";
import LoginView from "./CustomComponents/LoginView";
import SignupView from "./CustomComponents/SignupView";
import OneProductView from "./CustomComponents/OneProduct";
import ProfileView from "./CustomComponents/ProfileView";

//app exports what its rendering
class App extends Component {

  constructor(props) {
    super(props)
    this.state={
      CurrentPage:"none",
      productID:0
    }//state is an object wher eyou can store data

  }

    QSetView=(obj)=>{
      this.setState({
        CurrentPage:obj.page,
        productID:obj.productID||0
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
        return <ProductView QsetViewInParent={this.QSetView} />;
        case "edit":
          return <AddProducts/>
        case "login":
          return <LoginView QUserFromChild={this.QHandleUserLog} />
        case "signup":
          return <SignupView QUserFromChild={this.QHandleUserLog}/>
        case "oneProduct":
          return <OneProductView QViewFromChild={this.QSetView} />;  
        case "profile":
          return <ProfileView />        
        default:
          return <HomeView/>
      }
    }

    handleSubmit = (event) => {
      event.preventDefault(); // Prevents the default form submission behavior
      
      // Your search logic goes here
      
      // For example, you can access the input value like this:
      console.log(event.target[0].value);
      
      // Then you can perform your search based on inputValue
      
      // Reset the form fields if needed
      event.target.reset();
    };
    
    QHandleUserLog = ()=>{
      this.QSetView({page:"home"})
    }

  render() {
    

    //inbuilt function
    //add functionality to search bar
    return (
      <div id="APP" className="container">
        <div id="menu" className="row">
          <nav className="navbar navbar-expand-lg">
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
                    <a onClick={()=>this.QSetView({page:"profile"})} className="nav-link" href="#">
                      Profile
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
                <form className="form-inline d-lg-none" onSubmit={this.handleSubmit}>
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0 search" type="submit">Search</button>
          </form>
        </div>
        <form className="form-inline d-none d-lg-flex" onSubmit={this.handleSubmit}>
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0 search" type="submit">Search</button>
        </form>
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
