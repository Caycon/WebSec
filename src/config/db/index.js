const mongoose = require("mongoose");
const subscriptionJob = require("../../services/subscriptionJob");
async function connect() {
  try {
    await mongoose.connect("mongodb+srv://dangtrieulb:1fumuZFs66bCLamK@cluster0.rlvft53.mongodb.net/rises");
    console.log("Connect Successfully!!!");
    subscriptionJob;
    console.log("Subscription job started successfully!");
  } catch (error) {
    console.log("Connect fail!!!", error);
}
}
module.exports = { connect };
