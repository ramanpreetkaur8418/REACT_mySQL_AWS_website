import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Tshirt from "./tshirt";
import Named_query from "./named_query";
import Customers from "./customers";
import Buys from "./buys";
import Header from "./Header";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/Buys" component={Buys} />
          <Route path="/Named_query" component={Named_query} />
          <Route path="/Customers" component={Customers} />
          <Route path="/" component={Tshirt} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
