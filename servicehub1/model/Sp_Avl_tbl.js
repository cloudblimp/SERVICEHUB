const mongoose = require("mongoose");

const spAvlSchema = new mongoose.Schema({
  sp_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SP_Table", // Reference to the service provider
    required: true, // Assuming the sp_id is required
  },
  dayOfWeek: {
    type: String, // Day of the week (e.g., "Monday", "Tuesday", ...)
    required: true, // Assuming the dayOfWeek is required
  },
  availableSlots: [
    {
      slot: {
        type: String, // Time slot (e.g., "morning", "afternoon", "evening")
        required: true, // Assuming the slot is required
      },
      isAvailable: {
        type: Boolean, // Indicates whether the service provider is available during this slot
        required: true, // Assuming isAvailable is required
      },
    },
  ],
});

module.exports = mongoose.model("Sp_Availability_Table", spAvlSchema);
