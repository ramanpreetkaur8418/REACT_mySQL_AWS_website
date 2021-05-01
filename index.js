const { query } = require("express");
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

//Variables Section
let sql_query = ``;
let params = [];
let port = 3001;
//End of Variables Section

class Database {
  //constructs the connection to the database
  constructor() {
    this.connection = mysql.createConnection({
      host: "test-db-2021.c4hykugf5a0o.us-west-1.rds.amazonaws.com",
      user: "admin",
      password: "march_21_CSC_174",
      database: "test1",
    });
  }
  //query is used for making queries to send out to the database
  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows, fields) => {
        if (err) {
          console.log("\nERROR MESSAGE by err.message\n");
          console.log(err.message);
          console.log("\nEnd of err.message\n");
          err.code = "500";
          reject(new Error(err));
        }
        resolve(rows); //return the rows
      });
    });
  }

  //closes the database
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }
}

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(
    "Running the express server port 3001. Click Crtl-C to stop express."
  );
});

app.get("/get/tshirt", (req, res) => {
  database = new Database();
  let sql_select = `SELECT * FROM T_shirt`;
  database.query(sql_select).then((result, error) => {
    if (error) {
      console.log(error.message);
      res.sendStatus(500);
    }
    //console.log(result);
    res.send(result);
    database.close();
  });
});

//GET method for the customers
//returns all the rows from customer
app.get("/get/customer", (req, res) => {
  database = new Database();
  let sql_select = `SELECT * FROM CUSTOMER`;
  database.query(sql_select).then((result) => {
    //console.log(result);
    res.send(result);
    database.close();
  });
});

//GET method for the Buys
//Performs SELECT on the BUYS table
app.get("/get/buys", (req, res) => {
  database = new Database();
  let sql_select = `SELECT * FROM BUYS`;
  database.query(sql_select).then((result) => {
    //console.log(result);
    res.send(result);
    database.close();
  });
});

//GET method for the Buys
//Performs SELECT on the BUYS table
app.get("/get/named_query", (req, res) => {
  database = new Database();
  let sql_select = `SELECT * FROM T_Shirt_Customers`;
  database.query(sql_select).then((result) => {
    //console.log(result);
    res.send(result);
    database.close();
  });
});

//DELETE method
// Deletes a single entry from the Tshirt table
// LIMIT 1 has been placed for safety
app.delete("/delete/tshirt/:SKU", (req, res) => {
  const SKU_info = req.params.SKU;
  console.log("SKU to be deleted: ", SKU_info);
  database = new Database();
  let sql_delete = `DELETE FROM T_shirt WHERE SKU = ? LIMIT 1`;
  database.query(sql_delete, SKU_info).then((result) => {
    //console.log(result);
    res.send(result);
    database.close();
  });
});

//DELETE method
// Deletes a single entry from the BUYS table
// LIMIT 1 has been placed for safety
app.delete("/delete/buys/:SKU/:customer_id", (req, res) => {
  const SKU_info = req.params.SKU;
  const customer_id_info = req.params.customer_id;
  console.log("SKU to be deleted: ", SKU_info);
  console.log("SKU to be deleted: ", customer_id_info);
  database = new Database();
  let sql_delete = `DELETE FROM BUYS WHERE SKU = ? AND customer_id = ? LIMIT 1`;
  database.query(sql_delete, [SKU_info, customer_id_info]).then((result) => {
    console.log(result);
    res.send(result);
    database.close();
  });
});

//DELETE method
// Deletes a single entry from the CUSTOMER table
// LIMIT 1 has been placed for safety
app.delete("/delete/customer/:customer_id", (req, res) => {
  const customer_id_info = req.params.customer_id;
  console.log("Customer id to be deleted: ", customer_id_info);
  database = new Database();
  let sql_delete = `DELETE FROM CUSTOMER WHERE customer_id = ? LIMIT 1`;
  database.query(sql_delete, customer_id_info).then((result) => {
    console.log(result);
    res.send(result);
    database.close();
  });
});

app.post("/insert/tshirt", (req, res) => {
  console.log(req.body);
  database = new Database();
  const SKU_insert = req.body.SKU;
  const desc_insert = req.body.description;
  const price_insert = req.body.price;
  const size_insert = req.body.size;
  const color_insert = req.body.color;

  sql_query = `INSERT INTO T_shirt (SKU,description,price,size,color) VALUES(?,?,?,?,?)`;

  database
    .query(sql_query, [
      SKU_insert,
      desc_insert,
      price_insert,
      size_insert,
      color_insert,
    ])
    .then((result) => {
      res.statusCode = 200;
      res.send("Successful insert");
      console.log(result);
      database.close();
    })
    .catch((error) => {
      console.log("Anything from error", error.message);
      res.send(`${error.message}`);
    });
});

//add a way to respond to bad inserts
app.post("/insert/customer", (req, res) => {
  console.log(req.body);
  database = new Database();
  const customer_id_insert = req.body.customer_id;
  const email_insert = req.body.email;
  const first_insert = req.body.first;
  const last_insert = req.body.last;
  const password_insert = req.body.password;
  const promocode_insert = req.body.promocode;
  const card_number = req.body.cardnumber;
  const is_guest = req.body.is_guest;

  sql_query = `INSERT INTO CUSTOMER (customer_id,email,first,last,password,promo_code,is_guest,card_number) VALUES(?,?,?,?,?,?,?,?)`;

  database
    .query(sql_query, [
      customer_id_insert,
      email_insert,
      first_insert,
      last_insert,
      password_insert,
      promocode_insert,
      is_guest,
      card_number,
    ])
    .then((result) => {
      res.statusCode = 200;
      res.send("Successful insert");
      console.log(result);
      database.close();
    })
    .catch((error) => {
      res.send(`${error.message}`);
    });
});

//need to respond to error with inserts and mention that data is dependent on other values
app.post("/insert/buys", (req, res) => {
  console.log(req.body);
  database = new Database();
  const SKU_insert = req.body.SKU;
  const customer_id_insert = req.body.customer_id;
  const quantity_insert = req.body.quantity;

  sql_query = `INSERT INTO BUYS (SKU,customer_id,quantity) VALUES(?,?,?)`;

  database
    .query(sql_query, [SKU_insert, customer_id_insert, quantity_insert])
    .then((result) => {
      res.statusCode = 200;
      res.send("Successful insert");
      console.log(result);
      database.close();
    })
    .catch((error) => {
      res.send(`${error.message}`);
    });
});

//UPDATE method
// UPDATES Tshirt's size
app.put("/update/tshirt", (req, res) => {
  const SKU_tshirt = req.body.SKU;
  const size_tshirt = req.body.size;
  console.log("SKU recieved: ", SKU_tshirt, "  size", size_tshirt);
  database = new Database();
  let sql_update = `UPDATE T_shirt SET size = ? WHERE SKU = ? LIMIT 1`;
  database.query(sql_update, [size_tshirt, SKU_tshirt]).then((result) => {
    console.log(result);
    res.send(result);
    database.close();
  });
});

//UPDATE method
// UPDATES CUSTOMER's email
app.put("/update/customer", (req, res) => {
  const customer_id_customer = req.body.customer_id;
  const email_customer = req.body.email;
  console.log(
    "customer_id recieved: ",
    customer_id_customer,
    "  email_customer",
    email_customer
  );
  database = new Database();
  let sql_update = `UPDATE CUSTOMER SET email = ? WHERE customer_id = ? LIMIT 1`;
  database
    .query(sql_update, [email_customer, customer_id_customer])
    .then((result) => {
      console.log(result);
      res.send(result);
      database.close();
    });
});
