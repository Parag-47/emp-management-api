import { Schema, model } from "mongoose";

const registerSchema = new Schema({
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
});
    
const Register = model("Register", registerSchema);
export default Register;