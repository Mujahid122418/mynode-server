import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import dbConn from "./utlit/db.js";
import userRouter from "./routes/user.route.js";
import products from "./routes/products.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(cors({
//     origin : "http://localhost:5173",
//     Credential : true
// }))

app.get("/", (req, res) =>
  res.status(200).json({ messgae: "Hello World!", success: true })
);

app.use("/user", userRouter);
app.use("/products", products);

app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
  dbConn();
});
