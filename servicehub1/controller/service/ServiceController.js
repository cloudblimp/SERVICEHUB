const serviceModel = require("../../model/services/Service_tbl");
const spAvlSchema = require("../../model/Sp_Avl_tbl");
const addService = async (req, res) => {
  const e = req.body;

  try {
    const service = await serviceModel.create({
      mini_cat_id: e.mini_cat_id,
      sp_id: e.sp_id,
      price: e.price,
      admin_commission: e.admin_commission,
      sp_earning: e.sp_earning,
      service_time: e.service_time,
      yoe: e.yoe,
      created_at: e.created_at,
      updated_at: "",
    });
    return res.status(201).json({
      success: true,
      message: "Service created successfully!",
      data: service,
    });
  } catch (error) {
    console.error("Error creating service:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the service",
    });
  }
};

const getAllService = async (req, res) => {
  try {
    // Fetch all services while populating related data
    const services = await serviceModel
      .find()
      .populate("sp_id")
      .populate({
        path: "mini_cat_id",
        populate: {
          path: "nested_cat_id",
          populate: {
            path: "sub_cat_id",
            populate: {
              path: "s_id",
            },
          },
        },
      });

    if (!services || services.length === 0) {
      return res.status(404).json({
        message: "No services found",
      });
    }

    // Extract unique sp_ids from services
    const spIds = services.map((service) => service.sp_id._id);

    // Fetch sp_availability for the extracted sp_ids
    const spAvailability = await spAvlSchema.find({
      sp_id: { $in: spIds },
    });

    // Create a map for easy lookup
    const availabilityMap = {};
    spAvailability.forEach((availability) => {
      availabilityMap[availability.sp_id] = availability;
    });

    // Combine service data with availability data
    const servicesWithAvailability = services.map((service) => {
      const spAvailability = availabilityMap[service.sp_id._id];
      return { ...service.toObject(), sp_availability: spAvailability };
    });

    res.status(200).json({
      message: "Services and availability fetched successfully",
      data: servicesWithAvailability,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateServiceById = async (req, res) => {
  const id = req.params.id;
  console.log("req.body", req.body);
  try {
    const user = await serviceModel.findByIdAndUpdate(id, req.body);

    if (user) {
      res.status(201).json({
        message: "Service updated successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        message: "Service not found",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const deleteServiceById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await serviceModel.findByIdAndDelete(id, req.body);

    if (user) {
      res.status(201).json({
        message: "Service deleted successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        message: "Service not found",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const getServiceByMini = async (req, res) => {
  console.log("request,", req);
  try {
    const user = await serviceModel.find({
      mini_cat_id: req.params.id,
    });
    console.log(user);
    if (user && user != undefined) {
      res.status(201).json({
        message: "Category fetched successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        message: "Category not found",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
const getServiceByID = async (req, res) => {
  console.log("request,", req);
  try {
    const user = await serviceModel
      .find({ sp_id: req.params.id })
      .populate("mini_cat_id");

    console.log(user);
    if (user && user != undefined) {
      res.status(201).json({
        message: "Category fetched successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        message: "Category not found",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
const getService = async (req, res) => {
  console.log("request,", req);
  try {
    const user = await serviceModel
      .find({
        _id: req.params.id,
      })
      .populate("sp_id")
      .populate("mini_cat_id");
    console.log(user);
    if (user && user != undefined) {
      res.status(201).json({
        message: "Category fetched successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        message: "Category not found",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
module.exports = {
  addService,
  getAllService,
  updateServiceById,
  deleteServiceById,
  getServiceByMini,
  getServiceByID,
  getService,
};
