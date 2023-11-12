import { Schema, model } from "mongoose";

const tokenSchema = new Schema({
  registerId: {
    type: Schema.Types.ObjectId,
    ref: "Register",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const Token = model("token", tokenSchema);

export default Token;