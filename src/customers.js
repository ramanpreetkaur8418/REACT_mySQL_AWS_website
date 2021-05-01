import React, { useState, useEffect } from "react";
import Axios from "axios";

const Customers = () => {
  const [customer_id, setcustomer_id] = useState("");
  const [email, setemail] = useState("");
  const [first, setfirst] = useState("");
  const [last, setlast] = useState("");
  const [password, setpassword] = useState("");
  const [is_guest, setis_guest] = useState("");
  const [cardnumber, setcardnumber] = useState("");
  const [promo_code, setpromo_code] = useState("");
  const [display_Button, setdisplayButton] = useState(false);
  const [UpdatedInfo, setUpdatedInfo] = useState(false);
  const [customerList, setcustomerList] = useState([]);
  const [newcustomeremail, setnewcustomeremail] = useState("");

  useEffect(() => {
    if (display_Button == true) {
      Axios.get("http://localhost:3001/get/customer")
        .then((response) => {
          setcustomerList(response.data);
          
        })
        .then(() => {
          setdisplayButton(false); //Data has now been displayed reset the button's state to false
        });
    }
  }, [display_Button]);

  useEffect(() => {
    if (UpdatedInfo == true) {
      Axios.get("http://localhost:3001/get/customer")
        .then((response) => {
          setcustomerList(response.data);
          
        })
        .then(() => {
          setUpdatedInfo(false); //Data has now been displayed reset the button's state to false
        });
    }
  }, [UpdatedInfo]);

  const insertcustomer = () => {
    Axios.post("http://localhost:3001/insert/customer", {
      customer_id: customer_id,
      email: email,
      password: password,
      first: first,
      last: last,
      is_guest: is_guest,
      cardnumber: cardnumber,
      promo_code: promo_code,
    }).then((response) => {
      //console.log("Response code", response.data);
      let new_str = JSON.stringify(response.data);
      //console.log("new_str", new_str);
      if (new_str.includes("Error")) {
        //console.log("There was an error");
        {
          alert("Input Unsuccessful");
          alert(`${response.data}`);
        }
      } else {
        alert("Input Successful");
      }
      setcustomerList([...customerList], {
        customer_id: customer_id,
        email: email,
        password: password,
        first: first,
        last: last,
        is_guest: is_guest,
        cardnumber: cardnumber,
        promo_code: promo_code,
      });
      setUpdatedInfo(true);
      //console.log("Update info = ", UpdatedInfo);
    });
  };

  const deletecustomer = (para_customer_id) => {
    Axios.delete(
      `http://localhost:3001/delete/customer/${para_customer_id}`
    ).then(() => {
      alert("Delete Successful");
      setcustomerList([...customerList], {
        customer_id: customer_id,
        email: email,
        first: first,
        last: last,
        password: password,
        is_guest: is_guest,
        cardnumber: cardnumber,
        promo_code: promo_code,
      });
      setUpdatedInfo(true);
    });
  };

  const updatecustomeremail = (customer_id) => {
    Axios.put("http://localhost:3001/update/customer", {
      customer_id: customer_id,
      email: newcustomeremail,
    }).then((response) => {
      alert("Update Successful");
      
      Axios.get("http://localhost:3001/get/customer").then((response) => {
        setcustomerList(response.data);
        
      });
      setUpdatedInfo(true);
    });
    setnewcustomeremail(""); //empty the update size state for tshirt
  };

  return (
    <div className="form Customer_form">
      <h1>Customers</h1>
      <p>
        When you insert a record you may need to click the display button to
        refresh.
      </p>
      <label htmlFor="Customer_id_label">Customer id:</label>
      <input
        type="text"
        id="Customer_id_input "
        name="Customer_id"
        placeholder="Enter Customer_id"
        onChange={(event) => {
          setcustomer_id(event.target.value);
        }}
      />
      <br />
      <label htmlFor="email_label">Email:</label>
      <input
        type="text"
        id="email_input"
        name="Email"
        placeholder="Enter email"
        onChange={(event) => {
          setemail(event.target.value);
        }}
      />
      <br />
      <label htmlFor="first_label">First Name:</label>
      <input
        type="text"
        id="first_input "
        name="first"
        placeholder="Enter First Name"
        onChange={(event) => {
          setfirst(event.target.value);
        }}
      />
      <br />
      <label htmlFor="last_label">Last Name:</label>
      <input
        type="text"
        id="last_input "
        name="last"
        placeholder="Enter Last Name"
        onChange={(event) => {
          setlast(event.target.value);
        }}
      />
      <br />
      <label htmlFor="password_label">Password:</label>
      <input
        type="password"
        id="password_input "
        name="password"
        placeholder="Enter password"
        onChange={(event) => {
          setpassword(event.target.value);
        }}
      />
      <br />
      <label htmlFor="is_guest_label">Guest Status:</label>
      <input
        type="text"
        id="is_guest_input "
        name="is_guest"
        placeholder="Enter 1=true 0=false"
        onChange={(event) => {
          setis_guest(event.target.value);
        }}
      />
      <br />
      <label htmlFor="cardnumber_label">Cardnumber:</label>
      <input
        type="text"
        id="cardnumber_input "
        name="cardnumber"
        placeholder="Enter cardnumber"
        onChange={(event) => {
          setcardnumber(event.target.value);
        }}
      />
      <br />
      <label htmlFor="promo_code_label">Promo Code:</label>
      <input
        type="text"
        id="promo_code_input "
        name="promo_code"
        placeholder="Enter promo_code"
        onChange={(event) => {
          setpromo_code(event.target.value);
        }}
      />
      <br />
      <button onClick={insertcustomer}>Submit</button>
      <button
        onClick={() => {
          setdisplayButton(true);
          //console.log("Button clicked");
        }}
      >
        Display
      </button>

      {customerList.map((value) => {
        return (
          <div className="card  card__customer">
            <h4> customer_id : {value.customer_id}</h4>
            <p> email: {value.email}</p>
            <p> first: {value.first}</p>
            <p>last:{value.last}</p>
            <p>password:{value.password}</p>
            <p>is_guest :{value.is_guest}</p>
            <p>cardnumber: {value.cardnumber}</p>
            <p> Promo Code: {value.promo_code}</p>
            <button
              onClick={() => {
                deletecustomer(value.customer_id);
              }}
            >
              Delete
            </button>
            <input
              type="text"
              placeholder="Update email"
              onChange={(event) => {
                setnewcustomeremail(event.target.value); //updates the customer's email
              }}
            />

            <button
              onClick={() => {
                updatecustomeremail(value.customer_id);
              }}
            >
              Update
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Customers;
