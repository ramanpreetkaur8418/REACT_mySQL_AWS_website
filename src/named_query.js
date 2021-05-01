import React, { useState, useEffect } from "react";
import Axios from "axios";

const Named_query = () => {
  const [customer_id, setcustomer_id] = useState("");
  const [customer_email, setcustomer_email] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [SKU, setSKU] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [size, setsize] = useState("");
  const [color, setcolor] = useState("");
  const [display_Button, setdisplayButton] = useState(false);
  const [customerList, setcustomerList] = useState([]);

  useEffect(() => {
    if (display_Button == true) {
      Axios.get(`http://localhost:3001/get/named_query`)
        .then((response) => {
          setcustomerList(response.data);
        })
        .then(() => {
          setdisplayButton(false); //Data has now been displayed reset the button's state to false
        });
    }
  }, [display_Button]);

  return (
    <div className="form NamedQuery_form">
      <h1>Customer Records</h1>
      <label htmlFor="Customer_id_label">Customer id:</label>
      <input
        type="text"
        name="Customer_id"
        placeholder="Enter Customer_id"
        onChange={(event) => {
          setcustomer_id(event.target.value);
        }}
      />
      <br />
      <label htmlFor="customer_email_label">Customer email:</label>
      <input
        type="text"
        name="customer_email"
        placeholder="Enter customer_email"
        onChange={(event) => {
          setcustomer_email(event.target.value);
        }}
      />
      <br />
      <label htmlFor="first_name_label">First Name:</label>
      <input
        type="text"
        name="first_name"
        placeholder="Enter First Name"
        onChange={(event) => {
          setfirst_name(event.target.value);
        }}
      />
      <br />
      <label htmlFor="last_label">Last Name:</label>
      <input
        type="text"
        name="last"
        placeholder="Enter Last Name"
        onChange={(event) => {
          setlast_name(event.target.value);
        }}
      />
      <br />
      <label htmlFor="SKU_label">SKU:</label>
      <input
        type="text"
        name="SKU"
        placeholder="Enter SKU"
        onChange={(event) => {
          setSKU(event.target.value);
        }}
      />
      <br />
      <div className="input input__price">
        <label htmlFor="description_label">Description:</label>
        <input
          type="text"
          name="description"
          placeholder="Enter description"
          onChange={(event) => {
            setdescription(event.target.value);
          }}
        />
      </div>
      <br />
      <div className="input input__price">
        <label htmlFor="price_label">Price:</label>
        <input
          type="text"
          name="price"
          placeholder="Enter price"
          onChange={(event) => {
            setprice(event.target.value);
          }}
        />
      </div>
      <br />
      <div className="input input__size">
        <label htmlFor="size_label">Size:</label>
        <input
          type="text"
          name="size"
          placeholder="Enter size"
          onChange={(event) => {
            setsize(event.target.value);
          }}
        />
      </div>
      <br />
      <div className="input input__color">
        <label htmlFor="color_label">Color:</label>
        <input
          type="text"
          name="color"
          placeholder="Enter color"
          onChange={(event) => {
            setcolor(event.target.value);
          }}
        />
      </div>
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
          <div className="card card__namedquery" id="namedquery_card">
            <h4> Customer_id : {value.customer_id}</h4>
            <p> Customer_email: {value.customer_email}</p>
            <p> First Name: {value.first_name}</p>
            <p>Last Name:{value.last_name}</p>
            <p> SKU : {value.SKU}</p>
            <p> Description: {value.description}</p>
            <p> ${value.price}</p>
            <p>Size:{value.size}</p>
            <p>Color: {value.color}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Named_query;
