import { userModel } from "../../models/userModels/User.model.js";
import { compareHashPassword } from "../../utlis/PasswordSecuritry.js";
import { jwtTokenGenerate } from "../../utlis/TokenGenerate.js";

const UserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    let data = await userModel.findOne({ email: email });
    console.log(data.password);
    let hashPass = data.password;

    if (!data) {
      return res.status(400).send({ status: 400, message: "User not found" });
    }

    let isMatch = await compareHashPassword(password, hashPass);
    console.log(isMatch, 111);
    if (isMatch) {
      // toObject() method converts the Mongoose document to a plain JavaScript object.
      let token = await jwtTokenGenerate(data._id);
      console.log(token, 5858);
      const { password, ...userWithoutPassword } = data.toObject();
      return res.status(200).send({
        message: "User login successfully",
        user: userWithoutPassword,
        token: token,
      });
    } else {
      return res
        .status(401)
        .send({ status: 401, message: "Incorrect password" });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ status: 500, message: "Internal server Error" });
  }
};

export { UserLogin };
