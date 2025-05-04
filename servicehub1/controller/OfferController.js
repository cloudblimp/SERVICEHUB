const offerModel = require("../model/Offer_tbl");

const addOffer = async (req, res) => {
  const offerData = req.body;

  try {
    const savedOffer = await offerModel.create({
      title: offerData.title,
      description: offerData.description,
      start_date: offerData.start_date,
      end_date: offerData.end_date,
      discount: offerData.discount,
      Created_at: offerData.Created_at,
      Update_at: offerData.Updated_at,
    });

    console.log("saveOffer: ", savedOffer);

    if (savedOffer) {
      res.status(201).json({
        message: "Offer created successfully...",
        data: savedOffer,
      });
    } else {
      // If the offer wasn't saved, return a 500 error
      res.status(500).json({
        message: "Error creating offer",
      });
    }
  } catch (err) {
    // If any error occurs during the save operation, return a 500 error
    res.status(500).json({
      message: "Error creating offer",
      error: err.message,
    });
  }
};

const getAllOffer = async (req, res) => {
  try {
    const user = await offerModel.find();
    if (user) {
      res.status(201).json({
        message: "Offers get successfully",
        data: user,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getAllOffers = async (req, res) => {
  try {
    console.log("Fetching all offers from the database...");

    const offers = await OfferModel.find(); // Assuming OfferModel is the Mongoose model for offers

    if (!offers || offers.length === 0) {
      console.warn("No offers found in the database.");
      return res.status(200).json({
        success: true,
        message: "No offers found",
        data: [],
      });
    }

    console.log("Offers fetched successfully:", offers);

    return res.status(200).json({
      success: true,
      message: "Offers fetched successfully",
      data: offers,
    });
  } catch (err) {
    console.error("Error fetching offers:", err);
    return res.status(500).json({
      success: false,
      message: "Error fetching offers",
      error: err.message,
    });
  }
};

const updateOfferById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await offerModel.findByIdAndUpdate(id, req.body);

    if (user) {
      res.status(201).json({
        message: "Offer updated successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        message: "offer not found",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const deleteOfferById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await offerModel.findByIdAndDelete(id, req.body);

    if (user) {
      res.status(201).json({
        message: "offer deleted successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        message: "offer not found",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const OfferForService = async (req, res) => {
  try {
    const currentDate = new Date();
    const dateStr = currentDate.toISOString().split("T")[0];
    const filteredOffers = await offerModel.find({
      end_date: { $gt: dateStr },
      start_date: { $ne: dateStr },
    });

    res.json(filteredOffers);
  } catch (error) {
    console.error("Error retrieving filtered offers:", error);
    res.status(500).json({ error: "Internal server errorrrrrrrrrrrrrr" });
  }
};
module.exports = {
  addOffer,
  getAllOffer,
  getAllOffers,
  updateOfferById,
  deleteOfferById,
  OfferForService,
};
