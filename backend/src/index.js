import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";
dotenv.config({
  path: "C:\\Users\\PRANJAL_01\\Downloads\\CodeFiles\\Node Revision\\backend\\.env",
});

const StartServer = async () => {
  try {
    await connectDB();
    app.on("error", (error) => {
      console.log("Error starting the server:", error);
      throw error;
    });
    app.listen(process.env.PORT || 4060, () => {
      console.log(`Server is running on port ${process.env.PORT || 4060}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

StartServer();
