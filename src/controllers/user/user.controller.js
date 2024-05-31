import { promises as fsPromises } from "fs";
import { userModel } from "../../models/userModels/User.model.js";
import { generateHashPassword } from "../../utlis/PasswordSecuritry.js";

const addUser = async (req, res) => {
  const imageProfile = req.file.filename;
  const { name, email, mobile, password, subject } = req.body;
  try {
    let dt = await userModel.findOne({ email: email, delete_status: false });
    if (dt) {
      await fsPromises.unlink(req.file.path);
      return res
        .status(400)
        .send({ status: 400, message: "User is already exist try again..." });
    }
   let hashPassword= await generateHashPassword(password)
    let data = await userModel({
      name,
      email,
      mobile,
      password:hashPassword,
      subject,
      imageProfile,
    });
    let result = await data.save();
    if (!result) {
      return res.status(401).send({ status: 401, message: "Not found" });
    }
    return res
      .status(201)
      .send({ status: 201, message: "User add successfully" });
  } catch (err) {
    console.log(err.message, 12);
    return res
      .status(500)
      .send({ status: 500, message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(id, 45);

  try {
    let data = await userModel.findByIdAndUpdate(
      { _id: id },
      { $set: { delete_status: true } }
    );
    if (data) {
      return res
        .status(200)
        .send({ status: 200, message: "User deleted successfully" });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ status: 500, message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    console.log(req.body)
    const  id  = req.params.id;
    console.log(id,4545)

    if (!id) {
      return res.status(400).send({ status: 400, message: "Please send id" });
    }
    console.log("req.body",req.body);
    let dt = await userModel.findByIdAndUpdate(
        { _id: id,delete_status: false },
        { $set: {...req.body } }
    );

    if (dt) {
      return res
        .status(200)
        .send({ status: 200, message: "User updated successfully" });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ status: 500, message: "Internal server error" });
  }
};

const getAllUser=async(req,res)=>{
try{
    let data=await userModel.find({delete_status:false});
    console.log(data,454)
    if(data){
        return res.status(200).send({status:200,message:"User fetched successfully",users:data})
    }
}catch(err){
return  res.status(500).send({status:500,message:"Internal server error"})
}
}

export { addUser, deleteUser, updateUser,getAllUser };
