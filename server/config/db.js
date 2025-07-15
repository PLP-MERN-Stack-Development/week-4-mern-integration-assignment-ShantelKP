const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {  // use MONGO_URI to match your .env
      useNewUrlParser: true,                         // fix typo here
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");  // fix typo here
  } catch (error) {
    console.error("MongoDb connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
