const axios = require("axios");
const BASE_URL = "https://us6.api.mailchimp.com/3.0/lists/";
const listID = "4774f527d5";
const config = {
  headers: {
    Authorization: "apiKey: 5a684147a7465e5ae46a7ada3167bce1-us6",
  },
};

// class MailChimp {
// }
async function addContactToList(fname, lname, email) {
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname,
        },
      },
    ],
  };

  try {
    const response = await axios.post(BASE_URL + listID, data, config);
    if (response.status === 200) {
      console.log("Data Successfully sent!");
    }
  } catch (error) {
    console.log(error);
  }
}

async function getTotalContacts() {
  try {
    const response = await axios.get(BASE_URL + listID, config);
    if (response.status === 200) {
      // console.log(response.data);
      // console.log(response.data.stats.member_count);
      return response.data.stats.member_count;
    }
  } catch (error) {
    console.log(error);
  }
}
// getTotalContacts();

module.exports = addContactToList;
// module.exports = getTotalContacts;
// module.exports = MailChimp;
