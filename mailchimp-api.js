const axios = require("axios");
const BASE_URL = "https://us6.api.mailchimp.com/3.0/lists/";
const listID = "4774f527d5";
const config = {
  headers: {
    Authorization: `apiKey: ${process.env.MC_API}`,
  },
};

class MailChimp {
  static async addContactToList(fname, lname, email) {
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
        if (response.data.errors[0].error_code === "ERROR_CONTACT_EXISTS")
          return {
            isDelivered: false,
            errorMsg: "You are already on our list!",
          };
        return {
          isDelivered: false,
        };
      }
      if (response.data.error_count === 0) {
        // console.log("Data sent successfully!!");
        let totalContacts = await this.getTotalContacts();

        return {
          isDelivered: true,
          numOfContacts: totalContacts,
        };
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  static async getTotalContacts() {
    try {
      const response = await axios.get(BASE_URL + listID, config);
      if (response.status === 200) {
        return response.data.stats.member_count;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MailChimp;
