import { Component } from "react";
import axios from "axios";
import AboutView from "./CustomComponents/AboutView";
import HomeView from "./CustomComponents/HomeView";
import ProductView from "./CustomComponents/ProductView";
import AddProducts from "./CustomComponents/AddProducts";
import LoginView from "./CustomComponents/LoginView";
import SignupView from "./CustomComponents/SignupView";
import OneProductView from "./CustomComponents/OneProduct";
import ProfileView from "./CustomComponents/ProfileView";
import WishlistView from "./CustomComponents/WishListView";
import CartView from "./CustomComponents/CartView";
import SearchView from "./CustomComponents/SearchView";

//app exports what its rendering
class App extends Component {

  constructor(props) {
    super(props)
    this.state={
      CurrentPage:"none",
      productID:0,
      products:[],
      userStatus:{
        logged:false,
        user:{}
      }
    }//state is an object wher eyou can store data

  }

    QSetView=(obj)=>{
      this.setState({
        CurrentPage:obj.page,
        productID:obj.productID
      }) 
      console.log(obj)     
    }

    QGetView=(state)=>{
      const { CurrentPage } = state;
      let page= CurrentPage
      switch(page){
        case "home":
          return <HomeView/>
        case "about":
          return <AboutView/>
          case "products":
        return <ProductView QsetViewInParent={this.QSetView} />;
        case "add":
          return  <AddProducts QViewFromChild={this.QSetView} data={this.state.productID}/>
        case "login":
          return <LoginView QUserFromChild={this.QSetUser} />
        case "signup":
          return <SignupView QUserFromChild={this.QHandleUserLog}/>
        case "oneProduct":
          return <OneProductView QViewFromChild={this.QSetView} data={this.state.productID} userStatus={this.state.userStatus}/>;  
        case "profile":
          return <ProfileView key={this.state.userStatus.user.id} user={this.state.userStatus.user}/>  
        case "wishlist":
          return <WishlistView QsetViewInParent={this.QSetView} userStatus={this.state.userStatus}/>    
        case "cart":
          return <CartView QsetViewInParent={this.QSetView} userStatus={this.state.userStatus}/> 
        case "search":
          return <SearchView products={this.state.products} QsetViewInParent={this.QSetView} /> 
        default:
          return <HomeView/>
      }
    }

    handleSubmit = (event) => {
      event.preventDefault(); 
      const searchQuery = event.target[0].value.trim(); 
      if (searchQuery) {
        axios.get(`http://88.200.63.148:8121/products/search/${searchQuery}`)
          .then(response => {
            console.log(response.data); 
            this.setState({
              products: response.data ,
              CurrentPage: "search"
            });
          })
          .catch(error => {
            console.error('Error searching for products:', error.message);
          });
      }
      event.target.reset();
    };
    
    QLogout=()=>{
      axios.post(`http://88.200.63.148:8121/users/logout`)
      .then(response => {
        console.log(response)
        this.setState({
          CurrentPage:"home",
          userStatus:{logged:false, user:{}}
        })
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
    }
    
    QSetUser=(obj)=>{
      this.setState({
        CurrentPage:"products",
        userStatus:{logged:true, user:obj}
      })

    }

    QHandleUserLog = ()=>{
      this.QSetView({page:"login"})
    }
    
//see if the user is logged in
    componentDidMount(){
      axios.get("http://88.200.63.148:8121/users/login")
      .then(response => {
        console.log(response)
      })
    }

  render() {
    return (
      <div id="APP" className="container-fluid">
         <div id="menu" className="row">
          <nav className="navbar navbar-expand-lg navbar-light" style={{ width: "100%" }}>
            <div className="container-fluid">
              <a onClick={()=>this.QSetView({page:"home"})}className="navbar-brand" href="#">
                Timeless Treasure
              </a>
            <div className="togglebar">
            {this.state.userStatus.logged ? 
              <div className="d-flex cart d-lg-none">
                  <button onClick={()=>this.QSetView({page:"cart"})} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-truck" viewBox="0 0 16 16">
                    <path d="M11.5 4a.5.5 0 0 1 .5.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-4 0 1 1 0 0 1-1-1v-1h11V4.5a.5.5 0 0 1 .5-.5M3 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2m1.732 0h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4a2 2 0 0 1 1.732 1"/>
                  </svg>
                </button>

                <button onClick={()=>this.QSetView({page:"wishlist"})} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                  </svg>
              </button>
            </div>:null}
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
            </div>
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

                  {this.state.userStatus.logged && this.state.userStatus.user.role==="Manager"? 
                    <li className="nav-item">
                      <a onClick={()=>this.QSetView({page:"add"})} className="nav-link" href="#">
                        Add products
                      </a>
                    </li>
                    :
                    null // Render nothing if the user is not logged in
                  }
                {this.state.userStatus.logged ? 
                  <li className="nav-item">
                    <a onClick={()=>this.QSetView({page:"profile"})} className="nav-link" href="#">
                      Profile
                    </a>
                  </li>:
                  null}

                  <li className="nav-item">
                    <a onClick={()=>this.QSetView({page:"signup"})} className="nav-link" href="#">
                      Sign up
                    </a>
                  </li>
                {!this.state.userStatus.logged ? 
                  <li className="nav-item">
                    <a onClick={()=>this.QSetView({page:"login"})} className="nav-link " href="#">
                      Login
                    </a>
                  </li>
                  :  
                    <li className="nav-item">
                  <a onClick={()=>this.QLogout()} className="nav-link " href="#">
                    Logout
                  </a>
                </li>}
               
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
      {this.state.userStatus.logged ? 
        <div className="d-none cart d-lg-flex">
              <button onClick={()=>this.QSetView({page:"cart"})} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-truck" viewBox="0 0 16 16">
                <path d="M11.5 4a.5.5 0 0 1 .5.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-4 0 1 1 0 0 1-1-1v-1h11V4.5a.5.5 0 0 1 .5-.5M3 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2m1.732 0h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4a2 2 0 0 1 1.732 1"/>
              </svg>
            </button>

            <button onClick={()=>this.QSetView({page:"wishlist"})} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-heart-fill" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
              </svg>
          </button>
        </div>: null}

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
