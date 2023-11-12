//import HTML_TEMPLATE from "./mail-template.js";
import crypto from "crypto";
import HTML_TEMPLATE from "../email_template/mail-template.cjs";
import SENDMAIL from "../email_template/mail.js";
import { Router } from "express";
const router = Router();
import User from "../models/userSchema.js";
import Register from "../models/registerSchema.js";
import Token from "../models/tokenSchema.js";

/*let localCode = "";

function generateAlphanumericString(length) {
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    localCode = result;
  }
  return result;
}*/

const isFNameEmpty = async function (firstName) {
  try {
    if (firstName === "") throw new Error("FirstName can't be empty!");
    else return true;
  } catch (error) {
    console.log("Error: ", error.message);
    return false;
  }
};

const isLNameEmpty = async function (lastName) {
  try {
    if (lastName === "") throw new Error("LastName can't be empty!");
    else return true;
  } catch (error) {
    console.log("Error: ", error.message);
    return false;
  }
};

const isEmailEmpty = async function (email) {
  try {
    if (email === "" || email === undefined || email === null)
      throw new Error("Email can't be empty!");
    else return true;
  } catch (error) {
    console.log("Error: ", error.message);
    return false;
  }
};

const isPhoneEmpty = async function (phone) {
  try {
    if (phone === "") throw new Error("Phone can't be empty!");
    else return true;
  } catch (error) {
    console.log("Error: ", error.message);
    return false;
  }
};

const isSalaryEmpty = async function (salary) {
  try {
    if (salary === "" || salary === null || salary === undefined)
      throw new Error("Salary can't be empty!");
    else return true;
  } catch (error) {
    console.log("Error: ", error.message);
    return false;
  }
};

const isThisEmailInUse = async function (email) {
  try {
    //if(!email)
    //throw new Error("Invalid Email!");
    const emailCheck = await User.findOne({ email: email });
    if (emailCheck) return false;
    else return true;
  } catch (error) {
    console.log("Error: ", error.message);
    return false;
  }
};

const isThisPhoneInUse = async function (phone) {
  //if(!phone)
  //throw new Error("Invalid Phone Number!");
  try {
    const phoneCheck = await User.findOne({ phone: phone });
    if (phoneCheck) return false;
    else return true;
  } catch (error) {
    console.log("Error: ", error.message);
    return false;
  }
};

router.route("/create").post(async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;
  const DOB = req.body.DOB;
  const gender = req.body.gender;
  const salary = req.body.salary;

  const isNewFNameEmpty = await isFNameEmpty(firstName);
  const isNewLNameEmpty = await isLNameEmpty(lastName);
  const isNewEmailEmpty = await isEmailEmpty(email);
  const isNewPhoneEmpty = await isPhoneEmpty(phone);
  const isNewSalaryEmpty = await isSalaryEmpty(salary);
  const isNewEmail = await isThisEmailInUse(email);
  const isNewPhone = await isThisPhoneInUse(phone);

  if (!isNewFNameEmpty) return res.json({ sucess: false, message: "fName" });
  else if (!isNewLNameEmpty)
    return res.json({ sucess: false, message: "lName" });
  else if (!isNewEmailEmpty)
    return res.json({ sucess: false, message: "Email" });
  else if (!isNewPhoneEmpty)
    return res.json({ sucess: false, message: "Phone" });
  else if (!isNewSalaryEmpty)
    return res.json({ sucess: false, message: "Salary" });
  if (!isNewEmail)
    return res.json({
      sucess: false,
      message: "!NewEmail",
    });
  if (!isNewPhone)
    return res.json({
      sucess: false,
      message: "!NewPhone",
    });

  const newUser = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    DOB: DOB,
    gender: gender,
    salary: salary,
  });
  try {
    newUser.save();
    res.send({ Success: true, message: "Recored Created!" });
  } catch (error) {
    res.send({ Success: false, message: error.message });
    console.log("User Error: " + error);
  }
  console.log("Hi from router");
});

router.route("/data").get((req, res) => {
  User.find({})
    .then((user) => res.json(user))
    .catch((error) => res.json(error));
});

router.route("/get").get((req, res) => {
  User.find({}).sort({"salary":-1}).limit(5)
    .then((user) => res.json(user))
    .catch((error) => res.json(error));
});

router.route("/delete").post(async (req, res) => {
  try {
    await User.deleteOne({ email: req.body.email });
    return res.json({ sucess: true, message: "Recored Delete!" });
  } catch (error) {
    res.send({ Success: false, message: error.message });
    console.log("User Error: " + error);
  }
});

router.route("/find").post(async (req, res) => {
  console.log(req.body);
  const email = req.body.Email;
  //console.log(req.body.Email);
  if (email === null)
    return res.send({ sucess: false, message: "Email can't be null!" });
  else {
    try {
      const response = await User.findOne({ email });
      console.log(response._id);
      res.send(response);
    } catch (error) {
      res.send({ sucess: true, message: error.message });
    }
  }
});

router.route("/update").put(async (req, res) => {
  const _id = req.body._id;
  console.log(_id);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;
  const DOB = req.body.Format;
  const gender = req.body.gender;
  const salary = req.body.salary;

  const isNewFNameEmpty = await isFNameEmpty(firstName);
  const isNewLNameEmpty = await isLNameEmpty(lastName);
  const isNewEmailEmpty = await isEmailEmpty(email);
  const isNewPhoneEmpty = await isPhoneEmpty(phone);
  const isNewSalaryEmpty = await isSalaryEmpty(salary);
  const isNewEmail = await isThisEmailInUse(email);
  const isNewPhone = await isThisPhoneInUse(phone);

  if (!isNewFNameEmpty) return res.json({ sucess: false, message: "fName" });
  else if (!isNewLNameEmpty)
    return res.json({ sucess: false, message: "lName" });
  else if (!isNewEmailEmpty)
    return res.json({ sucess: false, message: "Email" });
  else if (!isNewPhoneEmpty)
    return res.json({ sucess: false, message: "Phone" });
  else if (!isNewSalaryEmpty)
    return res.json({ sucess: false, message: "Salary" });

  const data = {
    firstName,
    lastName,
    email,
    phone,
    DOB,
    gender,
    salary,
  };
  console.log(data);
  try {
    if (req.body._id) {
      const result = await User.findOneAndUpdate(
        { _id },
        { $set: data },
        { upsert: true }
      );
      console.log("Result from if " + result);
      res.send({ sucess: true, message: "Record Updated!" });
    } else {
      if (!isNewEmail)
        return res.json({
          sucess: false,
          message: "!NewEmail",
        });
      if (!isNewPhone)
        return res.json({
          sucess: false,
          message: "!NewPhone",
        });
      const result = await new User(data).save();
      console.log("Result from else " + result);
      res.send({
        sucess: true,
        message: "No Such Record Found So New Record Was Created!",
      });
    }
  } catch (error) {
    res.send({ sucess: false, message: error.message });
  }
});

router.route("/sendMail").put(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    if (!email) return;
    const emailCheck = await Register.findOne({ email: email });
    if (emailCheck)
      res.send({
        sucess: false,
        message: " This Email is already Registered!",
      });
    else {
      const register = await new Register({
        email: email,
        password: password,
      }).save();

      const token = await new Token({
        registerId: register._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

      const message = "Click on Verify to Verify Your Email. ";
      const link =  `http://localhost:9000/verify/${register.id}/${token.token}`;

      const options = {
        from: "Parag7155@gmail.com", // sender addressre
        to: email, // receiver email
        subject: "Email Verification! ", // Subject line
        text: message,
        html: HTML_TEMPLATE(message,link),
      };

      SENDMAIL(options, (info) => {
        console.log("Email sent successfully");
        console.log("MESSAGE ID: ", info.messageId);
      });
      res.send({
        sucess: true,
        message: "Please Check Your Email for Verification Link!",
      });
    }
  } catch (error) {
    console.log("Error: ", error.message);
    res.send({ sucess: false, message: error.message });
  }
});

router.route("/verify/:id/:token").get(async (req, res) => {
  try {
    const register = await Register.findOne({ _id: req.params.id });
    /*console.log("Register = "+register.verified)
    console.log("reqid = "+req.params.id)
    console.log("re._id = "+register._id);
    console.log("Token = "+req.params.token);*/

    if (!register) {
      console.log("returned from register!");
      return res.status(400).send("Invalid link");
    }

    if (register.verified === true) {
      return (
        res.send('<script>alert("Alredy Verified! Redirecting to Login Page."); window.location.href = "http://localhost:3000/login"; </script>')
      )
    }

    const token = await Token.findOne({
      registerId: register._id,
      token: req.params.token,
    });

    console.log(token);

    if (!token) {
      console.log("returned from token!");
      return res.status(400).send("Invalid link");
    }

    await Register.updateOne({ _id: register._id, verified: true });
    await Token.findByIdAndRemove(token._id);
    res.send('<script>alert("Email Verified! Going back to Login Page."); window.location.href = "http://localhost:3000/login"; </script>')
  } catch (error) {
    res.status(400).send("An error occured");
  }
});

router.route("/login").post(async (req,res)=>{
  try {
    const register = await Register.findOne({ email: req.body.email });
    if (!register) {
      console.log("returned from register!");
      return res.status(400).send({message: "This Email is not registered!",name: register.name});
    }
    else {
      res.status(200).send({sucess: true, message: "Login Sucessful!"});
    }

  } catch (error) {
    res.status(400).send(error.message);
  }
});


export default router;
