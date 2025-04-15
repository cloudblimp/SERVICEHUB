const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  docTitle: {
    type: String,
    required: true,
    maxlength: 30,
  },
  docContent: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Documents_Table", documentSchema);
