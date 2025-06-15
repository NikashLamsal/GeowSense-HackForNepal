import express from "express";
import UserTable from "./userSchema.js";
import bcrypt from "bcrypt";
import validateReqBody from "../middleware/validateReqBody.js";
import {
  loginCredentialSchema,
  registerCredentialSchema,
} from "./userValidation.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/user/register",
  validateReqBody(registerCredentialSchema),
  async (req, res) => {
    const newUser = req.body;

    const user = await UserTable.findOne({ email: newUser.email });

    if (user) {
      return res.status(401).send({ message: "User Already Exists" });
    }

    const plainPassword = newUser.password;
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRound);
    newUser.password = hashedPassword;

    await UserTable.create(newUser);

    return res.status(200).send({ message: "User Registered Successfully" });
  }
);

router.post(
  "/user/login",
  validateReqBody(loginCredentialSchema),
  async (req, res) => {
    const loginDetails = req.body;

    const user = await UserTable.findOne({ email: loginDetails.email });

    if (!user) {
      return res.status(401).send({ message: "Invalid login Credentials" });
    }

    const plainPassword = loginDetails.password;
    const hashedPassword = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      plainPassword,
      hashedPassword
    );

    if (!isPasswordCorrect) {
      return res.status(200).send({ message: "Incorrect Password" });
    }

    const payLoad = { email: user.email };
    const secretKey = "F70D898AA044C281";

    const token = jwt.sign(payLoad, secretKey, {
      expiresIn: "7D",
    });

    user.password = undefined;

    return res.status(200).send({
      message: "Logged in Successfully",
      accessToken: token,
      userDetails: user,
    });
  }
);

export { router as userController };
