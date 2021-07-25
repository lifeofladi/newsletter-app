const express = require("express");
const mailchimpAPI = require("../mailchimp-api");

const router = express.Router();

let statusMessage = "";
let totalContacts = 0;

//Handling GET request on home route
router.get("/", async (req, res) => {
  totalContacts = await mailchimpAPI.getTotalContacts();

  res.render("index", { message: statusMessage, listTotal: totalContacts });
});

//Handling POST request on home route
router.post("/", async (req, res) => {
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

module.exports = router;
