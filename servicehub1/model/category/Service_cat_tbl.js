const mongoose = require("mongoose");

const serivceCatSchema = new mongoose.Schema({
  service_name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  photo: {
    type: String,
    maxlength: 250,
  },
});

module.exports = mongoose.model("Service_Category_Table", serivceCatSchema);
