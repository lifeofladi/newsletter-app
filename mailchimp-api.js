const axios = require("axios");
const BASE_URL = "https://us6.api.mailchimp.com/3.0/lists/";
const config = {
  headers: {
    Authorization: "apiKey: 5a684147a7465e5ae46a7ada3167bce1-us6",
  },
};

class MailChimp {
  static async addContactToList(fname, lname, email) {
    const listID = "4774f527d5";
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
      if (response.data.error_count > 0) {
        console.log("Problematic data!!\n", response.data.errors);
      }
      if (response.data.error_count === 0) {
        console.log("Data sent successfully!!");
      }
      //   console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  static async getTotalContacts() {
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
}

module.exports = MailChimp;
