const docModel = require("../../model/documents/Document_tbl");

const fileUplaodService = require("../../fileUploadService");
const addDoc = async (req, res) => {
  console.log("documents", req.body);
  console.log("documents", req.files);
  try {
    const documents = req.body;
    const photo = req.files.photo;

    const uploadedDoc = await fileUplaodService(photo.tempFilePath);
    const newDocument = await docModel.create({
      docTitle: documents.documentTitle,
      docContent: uploadedDoc.secure_url, // Assuming the file URL is obtained from fileUploadService
    });

    res.status(201).json({
      success: true,
      message: "Documents uploaded successfully!",
      data: newDocument,
    });
  } catch (error) {
    console.error("Error creating sp:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the sp",
    });
  }
};

const getAllDoc = async (req, res) => {
  try {
    const user = await docModel.find();
    if (user) {
      res.status(201).json({
        message: "Document get successfully",
        data: user,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateDocById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await docModel.findByIdAndUpdate(id, req.body);

    if (user) {
      res.status(201).json({
        message: "Document updated successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        message: "Document not found",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const deleteDocById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await docModel.findByIdAndDelete(id, req.body);

    if (user) {
      res.status(201).json({
        message: "Document deleted successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        message: "Document not found",
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
  addDoc,
  getAllDoc,
  updateDocById,
  deleteDocById,
};
