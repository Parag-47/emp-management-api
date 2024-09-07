import express, { json } from "express";
import cors from "cors";
import { connect } from "mongoose";
import routes from "./routes/empDataRoute.js";

const app = express();
app.use(cors());
app.use(json());
app.use("/images",express.static('./images'));
app.use("/", routes);

const DB = process.env.MONGODB_URI;

connect(DB).then(() => {
    console.log("Connection Successful");
  })
  .catch((error) => {
    console.log(error);
  });
 
app.listen(9000, () => {
  console.log("ready @ 9000");
});