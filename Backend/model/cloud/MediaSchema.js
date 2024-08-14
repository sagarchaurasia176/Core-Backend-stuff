const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const transporter = require("../../config/MailConfig");

require("dotenv").config();
//media schema applied
const MediaScheam = new mongoose.Schema({
  //name
  name: {
    type: String,
    required: true,
  },
  //tag
  tag: {
    type: String,
  },
  //image url
  Url: {
    type: String,
  },
  email: {
    type: String,
  },
});

//Create the post middleware
MediaScheam.post("save", async function mailer(doc) {
  try {
    //send the email to the gmail
    let info = await transporter.sendMail({
      from: " | Thanks to you used Nodemailer service |  ",
      to: doc.email,
      subject: "Hello sir",
      text: "I hope you not faced any problem while you sending your media to the server",
      html: "<b>Team Nodemailer</b>",
    });
    console.log("info messsage from gmail server", info);
  } catch (er) {
    console.log("error", er);
  }
});

//exports that media schema here
module.exports = mongoose.model("CloudMedia", MediaScheam);
