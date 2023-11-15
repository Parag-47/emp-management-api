import express, { json } from "express";
import cors from "cors";
import { connect } from "mongoose";
import routes from "./routes/empDataRoute.js";

const app = express();
app.use(cors());
app.use(json());
app.use("/images",express.static('./images'));
app.get('/home', (req,res)=>{
res.send("Hello!");
});
app.use("/", routes);

const DB =
"mongodb+srv://paragyadav74:qdmec0pETyJaYrJz@cluster0.mtdcup9.mongodb.net/emp_db";

connect(DB).then(() => {
    console.log("Conection Successful");
  })
  .catch((error) => {
    console.log(error);
  });
 
app.listen(9000, () => {
  console.log("ready @ 9999");
});