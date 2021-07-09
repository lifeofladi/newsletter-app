const express = require("express");
// const axios = require("axios");
const app = express();
const mailchimpAPI = require("./mailchimp");

// app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Handle Home route
app.get("/", (req, res) => {
  // axios("");

  res.sendFile(__dirname + "index.html");
  // res.render("index", {
  //   title: "Newsletter App",
  // });
});

//Handling POST request from home route
app.post("/", (req, res) => {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  mailchimpAPI(firstName, lastName, email);
  // mailchimpAPI.addContactToList(firstName, lastName, email);

  res.sendFile(__dirname + "/public/index.html");
  // res.render("index", {
  //   title: "Newsletter App - Success",
  // });
});

app.listen(3300, () => {
  console.log("listening on port 3300");
});
