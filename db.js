import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error("❌ MongoDB URI is not defined in environment variables.");
}

let isConnected = false; // Track connection status

const connectToDb = async () => {
  if (isConnected) {
    console.log("✅ Using existing database connection.");
    return;
  }

  try {
    const connection = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false, // Prevents command buffering
    });

    isConnected = connection.connections[0].readyState === 1;
    console.log("✅ Database connection established.");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1); // Exit the process in case of a critical failure
  }
};

export default connectToDb;
