require("dotenv").config();
const express = require("express");
const app = express();
const mailchimpAPI = require("./mailchimp-api");
let statusMessage = "";
let totalContacts = 0;

//setting templating engine to EJS
app.set("view engine", "ejs");

//Allows you to grab values from inputs
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

//Handling GET request on home route
app.get("/", async (req, res) => {
  totalContacts = await mailchimpAPI.getTotalContacts();

  res.render("index", { message: statusMessage, listTotal: totalContacts });
});

//Handling POST request from home route
app.post("/", async (req, res) => {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  try {
    let status = await mailchimpAPI.addContactToList(
      firstName,
      lastName,
      email,
    );

    if (status.isDelivered !== false) {
      statusMessage = `Thank you ${firstName}, we will be in touch!`;
      totalContacts = status.numOfContacts;
    } else {
      if ("errorMsg" in status) {
        statusMessage = status.errorMsg;
      }
    }
    res.redirect("/");
  } catch (error) {
    console.log(error.message, "in post");
  }
});

app.listen(3300, () => {
  console.log("listening on port 3300");
});
