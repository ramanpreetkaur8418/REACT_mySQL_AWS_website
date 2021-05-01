import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

const Tshirt = () => {
  const [SKU, setSKU] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [size, setsize] = useState("");
  const [color, setcolor] = useState("");
  const [display_Button, setdisplayButton] = useState(false);
  const [UpdatedInfo, setUpdatedInfo] = useState(false);
  const [tshirtList, settshirtList] = useState([]);
  const [newTshirtsize, setnewTshirtsize] = useState("");

  useEffect(() => {
    if (display_Button == true) {
      Axios.get("http://localhost:3001/get/tshirt")
        .then((response) => {
          settshirtList(response.data);
        
        })
        .then(() => {
          setdisplayButton(false); //Data has now been displayed reset the button's state to false
        });
    }
  }, [display_Button]);

  useEffect(() => {
    if (UpdatedInfo == true) {
      Axios.get("http://localhost:3001/get/tshirt")
        .then((response) => {
          settshirtList(response.data);
          
        })
        .then(() => {
          setUpdatedInfo(false); //Data has now been displayed reset the button's state to false
        });
    }
  }, [UpdatedInfo]);

  const deleteTshirt = (tshirt_SKU) => {
    Axios.delete(`http://localhost:3001/delete/tshirt/${tshirt_SKU}`).then(
      () => {
        alert("Delete Successful");
        settshirtList([...tshirtList], {
          SKU: SKU,
          description: description,
          price: price,
          size: size,
          color: color,
        });
        setUpdatedInfo(true);
      }
    );
  };

  const insertTshirt = () => {
    Axios.post("http://localhost:3001/insert/tshirt", {
      SKU: SKU,
      description: description,
      price: price,
      size: size,
      color: color,
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
      settshirtList([...tshirtList], {
        SKU: SKU,
        description: description,
        price: price,
        size: size,
        color: color,
      });
      setUpdatedInfo(true);
    });
    settshirtList([...tshirtList], {
      SKU: SKU,
      description: description,
      price: price,
      size: size,
      color: color,
    });
  };

  const updateTshirt = (tshirt) => {
    Axios.put("http://localhost:3001/update/tshirt", {
      SKU: tshirt,
      size: newTshirtsize,
    }).then((response) => {
      alert("Update Successful");
      
      Axios.get("http://localhost:3001/get/tshirt").then((response) => {
        settshirtList(response.data);
        
      });
      setUpdatedInfo(true);
    });
    setnewTshirtsize(""); //empty the update size state for tshirt
  };

  return (
    <div className="form Tshirt_form">
      <h1>Tshirt</h1>
      <p>
        When you insert a record you may need to click the display button to
        refresh.
      </p>
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
      <label htmlFor="description_label">Description:</label>
      <input
        type="text"
        id="description_input"
        name="description"
        placeholder="Enter description"
        onChange={(event) => {
          setdescription(event.target.value);
        }}
      />
      <br />
      <label htmlFor="price_label">Price:</label>
      <input
        type="text"
        id="price_input "
        name="price"
        placeholder="Enter price"
        onChange={(event) => {
          setprice(event.target.value);
        }}
      />
      <br />
      <label htmlFor="size_label">Size:</label>
      <input
        type="text"
        id="size_input "
        name="size"
        placeholder="Enter size"
        onChange={(event) => {
          setsize(event.target.value);
        }}
      />
      <br />
      <label htmlFor="color_label">Color:</label>
      <input
        type="text"
        id="color_input "
        name="color"
        placeholder="Enter color"
        onChange={(event) => {
          setcolor(event.target.value);
        }}
      />

      <button onClick={insertTshirt}>Submit</button>
      <button
        onClick={() => {
          setdisplayButton(true);
          //console.log("Button clicked");
        }}
      >
        Display
      </button>
      {tshirtList.map((value) => {
        return (
          <div className="card" id="tshirt_card">
            <h4> SKU : {value.SKU}</h4>
            <p> description: {value.description}</p>
            <p> ${value.price}</p>
            <p>size:{value.size}</p>
            <p>color: {value.color}</p>

            <button
              onClick={() => {
                deleteTshirt(value.SKU);
              }}
            >
              Delete
            </button>

            <input
              type="text"
              placeholder="Update size"
              onChange={(event) => {
                setnewTshirtsize(event.target.value); //updates the tshirt's size
              }}
            />

            <button
              onClick={() => {
                updateTshirt(value.SKU);
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

export default Tshirt;
