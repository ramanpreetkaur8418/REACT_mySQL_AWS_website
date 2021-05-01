import React, { useState, useEffect } from "react";
import Axios from "axios";

const Buys = () => {
  const [customer_id, setcustomer_id] = useState("");
  const [SKU, setSKU] = useState("");
  const [quantity, setquantity] = useState(0);
  const [display_Button, setdisplayButton] = useState(false);
  const [BuysList, setBuysList] = useState([]);
  const [UpdatedInfo, setUpdatedInfo] = useState(false);

  useEffect(() => {
    if (display_Button == true) {
      Axios.get("http://localhost:3001/get/buys")
        .then((response) => {
          setBuysList(response.data);
          
        })
        .then(() => {
          setdisplayButton(false); //Data has now been displayed reset the button's state to false
        });
    }
  }, [display_Button]);

  useEffect(() => {
    if (UpdatedInfo == true) {
      Axios.get("http://localhost:3001/get/buys")
        .then((response) => {
          setBuysList(response.data);
          
        })
        .then(() => {
          setUpdatedInfo(false); //Data has now been displayed reset the button's state to false
        });
    }
  }, [UpdatedInfo]);

  const deletebuys = (para_customer_id, para_SKU) => {
    Axios.delete(
      `http://localhost:3001/delete/buys/${para_SKU}/${para_customer_id}`
    ).then(() => {
      alert("Delete Successful");
      setBuysList([...BuysList], {
        customer_id: customer_id,
        SKU: SKU,
        quantity: quantity,
      });
      setUpdatedInfo(true);
    });
  };

  const insertbuys = () => {
    Axios.post("http://localhost:3001/insert/buys", {
      customer_id: customer_id,
      SKU: SKU,
      quantity: quantity,
    }).then((response) => {
      //console.log("Error code", response.data);
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
      setBuysList([...BuysList], {
        customer_id: customer_id,
        SKU: SKU,
        quantity: quantity,
      });
      setUpdatedInfo(true);
      //console.log("Update info = ", UpdatedInfo);
    });
  };

  return (
    <div className="form Buys_form">
      <h1>Buys Record</h1>
      <label htmlFor="SKU_label">SKU:</label>
      <input
        type="text"
        id="SKU_input "
        name="SKU"
        placeholder="Enter SKU"
        onChange={(event) => {
          setSKU(event.target.value);
        }}
      />
      <br />
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
      <label htmlFor="quantity_label">Quantity:</label>
      <input
        type="text"
        id="quantity_input "
        name="quantity"
        placeholder="Enter quantity"
        onChange={(event) => {
          setquantity(event.target.value);
        }}
      />
      <br />

      <button onClick={insertbuys}>Submit</button>
      <button
        onClick={() => {
          setdisplayButton(true);
          //console.log("Button clicked");
        }}
      >
        Display
      </button>
      {BuysList.map((value) => {
        return (
          <div className="card card__buys">
            <h4> customer_id : {value.customer_id}</h4>
            <h4> SKU : {value.SKU}</h4>
            <p> Quantity: {value.quantity}</p>

            <button
              onClick={() => {
                deletebuys(value.customer_id, value.SKU);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Buys;
