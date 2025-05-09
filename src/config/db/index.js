const mongoose = require("mongoose");
const subscriptionJob = require("../../services/subscriptionJob");
async function connect() {
  try {
    await mongoose.connect("mongodb+srv://nbctan4:ioDTaEk7nTdlptlV@cluster0.dkucpgv.mongodb.net/rises");
    console.log("Connect Successfully!!!");
    subscriptionJob;
    console.log("Subscription job started successfully!");
  } catch (error) {
    console.log("Connect fail!!!");
  }
}
module.exports = { connect };
