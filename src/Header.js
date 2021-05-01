import "./App.css";
import "./header.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Tshirt from "./tshirt";
import Named_query from "./named_query";
import Customers from "./customers";
import Buys from "./buys";

const Header = () => {
  return (
    <nav>
      <ul>
        <div className="header">
          <div className="option tshirt__header">
            <Link to="/" className="link">
              Tshirt
            </Link>
          </div>
          <div className="option customers__header">
            <Link to="/Customers" className="link">
              Customers
            </Link>
          </div>

          <div className="option buys__header">
            <Link to="/Buys" className="link">
              Buys
            </Link>
          </div>

          <div className="option named_query__header">
            <Link to="/Named_query" className="link">
              Named_query
            </Link>
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Header;
