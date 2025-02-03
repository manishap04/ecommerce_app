import UserModel from "../models/UserModel.js"
import { comparePassword, hashPassword } from "../helpers/AuthHelper.js"
import jwt from "jsonwebtoken";
import orderModel from "../models/OrderModel.js";

export const registerController=async(req,res)=>{
    try {
        const {name,email,phone,password,address,question}=req.body;
        if(!name){
            return res.send({message:"n-Field required"})
        }
        if(!email){
            return res.send({message:"e-Field required"})
        }
        if(!password){
            return res.send({message:"p-Field required"})
        }
        if(!phone){
            return res.send({message:"ph-Field required"})
        }
        if(!address){
            return res.send({message:"a-Field required"})
        }
        if(!question){
          return res.send({message:"q-Field required"})
        }

        const existingUser=await UserModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
                message:"Already registered",
            })
        }
        const hashedPassword=await hashPassword(password)
        const user=await new UserModel({
            name,email,phone,password:hashedPassword,address,question
        }).save();
        res.status(201).send({
            success:true,
            message:"user registeration success",
            user
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success:false,
            message:"message in reg",
            err
        })
    }
}


//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};


//
export const forgotpasswordController=async(req,res)=>{
  try {
    const {email,question,newPassword}=req.body
    if(!email || !question || !newPassword){
      res.status(400).send({message: "field required"})
    }
    const user=await UserModel.findOne({email,question})
    if(!user){
      return res.status(404).send({success:false,
        message:"wrong email or question"
      })
    }
    const hashed=await hashPassword(newPassword)
    await UserModel.findByIdAndUpdate(user._id,{password:hashed})
    res.status(200).send({
      success:true,
      message:"password reset success"
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      success:false,
      message:"Something went wrong",
      err
    })
  }
}

//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await UserModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};


export const getOrdersController=async(req,res)=>{
  try {
    const orders=await orderModel.find({buyer: req.user._id}).populate("products","-photo").populate("buyer","name")
    res.json(orders)
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile getting orders",
      error,
    });
  }
}

export const getallOrdersController=async(req,res)=>{
  try {
    const orders=await orderModel.find().populate("products","-photo").populate("buyer","name")
    res.json(orders)
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile all orders",
      error,
    });
  }
}

export const getorderstatusController=async(req,res)=>{
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Order status",
      error,
    });
  }
}

export const getallUsersController = async (req, res) => {
  try {
    const users = await UserModel
      .find({})
    res.status(200).send({
      success: true,
      message: "All userss ",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};
