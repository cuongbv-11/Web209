import { Link } from "react-router-dom";
import {
  FaHome,
  FaUserPlus,
  FaSignInAlt,
  FaUserShield,
  FaShoppingCart,
} from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light shadow">
        <div className="container d-flex justify-content-between align-items-center">
          <Link
            className="navbar-brand text-success logo h1 align-self-center"
            to="/"
          >
            Nhóm 9
          </Link>

          <div
            className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between"
            id="templatemo_main_nav"
          >
            <div className="flex-fill">
              <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <FaHome style={{ marginRight: "5px" }} />
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    <FaUserPlus style={{ marginRight: "5px" }} />
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <FaSignInAlt style={{ marginRight: "5px" }} />
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    <FaUserShield style={{ marginRight: "5px" }} />
                    Admin
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <FaShoppingCart style={{ marginRight: "5px" }} />
                    Giỏ Hàng
                  </Link>
                </li>
                <hr />
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">
                    <BiLogOut style={{ marginRight: "5px" }} />
                    logout
                  </Link>
                </li>
              </ul>
            </div>
            <div className="navbar align-self-center d-flex">
              <div className="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="inputMobileSearch"
                    placeholder="Search ..."
                  ></input>
                  <div className="input-group-text">
                    <i className="fa fa-fw fa-search"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
