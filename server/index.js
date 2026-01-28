// --------------------- Express App Setup ---------------------
const express = require("express");
require("dotenv").config();

const app = express();
app.set("trust proxy", 1);

const PORT = process.env.PORT || 5000;

// --------------------- Database Connection -------------------
const dbConnect = require("./config/database");
dbConnect();

// --------------------- Cloudinary Connection -----------------
const cloudinaryConnect = require("./config/cloudinary");
cloudinaryConnect();

// --------------------- Middlewares ---------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(
  cors({
    origin: true,        // ✅ allow request origin dynamically
    credentials: true,   // ✅ needed for cookies / auth
  })
);
app.use(cookieParser());



// --------------------- Routes Mounting -----------------------
const userRoute = require("./routes/User");
const categoryRoute = require("./routes/Category");
const sectionRoute = require("./routes/Section");
const subSectionRoute = require("./routes/SubSection");
const courseRoute = require("./routes/Course");
const paymentRoute = require("./routes/Payment");
const profileRoute = require("./routes/Profile");
const contactRoute = require("./routes/ContactUs");
const tagRoute = require("./routes/Tag");
const ratingRoute = require("./routes/RatingAndReview");
const courseProgressRoute = require("./routes/CourseProgress");

app.use("/api/v1/auth", userRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/section", sectionRoute);
app.use("/api/v1/subsection", subSectionRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1", contactRoute);
app.use("/api/v1", tagRoute);
app.use("/api/v1", ratingRoute);
app.use("/api/v1/progress", courseProgressRoute);

// default route
app.get("/", (req, res) => {
  return res.send(`<h1> this is your default route </h1>`);
});

// --------------------- Start Server --------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server started successfully on port ${PORT}`);
});
