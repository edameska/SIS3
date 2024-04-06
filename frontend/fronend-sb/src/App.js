import { Component } from "react";
//
import AboutView from "./CustomComponents/AboutView";
import HomeView from "./CustomComponents/HomeView";
import ProductView from "./CustomComponents/ProductView";
import AddProducts from "./CustomComponents/AddProducts";
import LoginView from "./CustomComponents/LoginView";
import SignupView from "./CustomComponents/SignupView";
import OneProductView from "./CustomComponents/OneProduct";

//app exports what its rendering
class App extends Component {
  render() {
    //inbuilt function
    return (
      <div id="APP" className="container">
        <div id="menu" className="row">
          <nav className="navbar">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
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
                    <a className="nav-link " href="#">
                      About
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link " href="#">
                      Products
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Edit products
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link " href="#">
                      Sign up
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link " href="#">
                      Login
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div id="viewer" className="row container">
          {/* Home*/}
          <HomeView />
          {/* Products*/}
          <ProductView />
          {/* Add products*/}
          <AddProducts />
          {/* One product*/}
          <OneProductView />
          {/* Signup*/}
          <SignupView />
          {/* Login*/}
          <LoginView />

          {/* About*/}
          <AboutView />
          {/* News*/}

          {/* Single new*/}

          {/* Create new*/}

          {/* Signup*/}

          {/* Login*/}
        </div>
      </div>
    );
  }
}

export default App;
