const spDocModel = require("../../model/documents/Sp_Document_tbl");

const addSpDoc = async (req, res) => {
  const user = req.body;

  try {
    const saveUser = await spDocModel.create({
      Sp_id: user.sp_id,
      doc_id: user.doc_id,
    });

    if (saveUser) {
      res.status(201).json({
        message: "Service provider Document created successfully...",
        data: saveUser,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "error to create document",
      error: err.message,
    });
  }
};

const getAllSpDoc = async (req, res) => {
  try {
    const user = await spDocModel.find();
    if (user) {
      res.status(201).json({
        message: "Service provider Document get successfully",
        data: user,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  addSpDoc,
  getAllSpDoc,
};
