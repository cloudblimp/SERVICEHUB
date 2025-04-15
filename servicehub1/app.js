const express = require("express");
const mongoose = require("mongoose");
const Razorpay = require("razorpay");
const cors = require("cors");
const { config } = require("dotenv");
const cloudinary = require("cloudinary").v2; // Explicitly use v2
const fileUpload = require("express-fileupload");

// Load environment variables from config.env
config({
  path: "./config.env",
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Cloudinary configuration
cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dk8wd9myt",
  api_key: process.env.CLOUDINARY_API_KEY || "753893913514568",
  api_secret: process.env.CLOUDINARY_API_SECRET || "LF5-gXTsWBd44dXY8qYF73x4qh4",
});

// MongoDB local connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://14.139.122.120/32:27017/servicehub", {
      // Mongoose 8.x defaults are sufficient
    });
    console.log("Database connected successfully...");
  } catch (error) {
    console.error("Connection error:", error);
    process.exit(1); // Exit on failure
  }
};
connectDB();

// Routes
const userRoutes = require("./routes/Users_Routes/UserRoutes");
const spRoutes = require("./routes/Users_Routes/SpRoutes");
const docRoutes = require("./routes/Doc_Routes/DocumentRoutes");
const spDocRoutes = require("./routes/Doc_Routes/SpDocRoutes");
const catRoutes = require("./routes/Category_Routes/ServiceCatRoutes");
const subcatRoutes = require("./routes/Category_Routes/SubCatRoutes");
const nestedcatRoutes = require("./routes/Category_Routes/NestedCatRoutes");
const minicatRoutes = require("./routes/Category_Routes/MiniCatRoutes");
const offerRoutes = require("./routes/OfferRoutes");
const serviceRoutes = require("./routes/Service_Routes/ServiceRoutes");
const servicereqRoutes = require("./routes/Service_Routes/ServiceReqRoutes");
const cartRoutes = require("./routes/Cart_Routes/CartRoutes");
const cartItemRoutes = require("./routes/Cart_Routes/CartItemRoutes");
const feedbackRoutes = require("./routes/FeedbackRoutes");
const yoeRoutes = require("./routes/YoeRoutes");
const spAvlRoutes = require("./routes/SpAvlRoutes");
const paymentRoutes = require("./routes/Payment_Routes/PaymentRoutes");
const refundRoutes = require("./routes/Payment_Routes/RefundRoutes");
const chatRoutes = require("./routes/Chat_Routes/ChatRoutes");
const messageRoutes = require("./routes/Chat_Routes/MessageRoutes");
const otpRoutes = require("./routes/Users_Routes/OtpRoutes");

app.use("/user", userRoutes);
app.use("/otp", otpRoutes);
app.use("/sp", spRoutes);
app.use("/doc", docRoutes);
app.use("/spDoc", spDocRoutes);
app.use("/cat", catRoutes);
app.use("/subcat", subcatRoutes);
app.use("/nestedcat", nestedcatRoutes);
app.use("/minicat", minicatRoutes);
app.use("/offer", offerRoutes);
app.use("/service", serviceRoutes);
app.use("/serviceReq", servicereqRoutes);
app.use("/cart", cartRoutes);
app.use("/cartItem", cartItemRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/yoe", yoeRoutes);
app.use("/spavl", spAvlRoutes);
app.use("/api", paymentRoutes);
app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);
app.use("/refund", refundRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});