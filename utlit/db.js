import mongoose from "mongoose";
let db = "mongodb+srv://Mujahid:Mujahid_1@cluster0-tbovr.mongodb.net/crud";
const dbConn = async () => {
  try {
    await mongoose.connect(db);
    console.log("Database Connected");
  } catch (error) {
    console.log("conn_err", error);
  }
};

export default dbConn;
