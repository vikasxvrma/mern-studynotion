// here we are making connection with server to database which here is mongodb

// we need mongoose to make connection  with database

const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      tls: true,
      tlsAllowInvalidCertificates: true,
      retryWrites: true,
      w: "majority",
    });

    console.log("connection established with database !");
  } catch (error) {
    console.error("DB connection failed ", error);
    process.exit(1);
  }
};

module.exports = dbConnect;
