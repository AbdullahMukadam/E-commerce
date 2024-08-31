import AsyncHandler from "../middlewares/AsyncHandler.js";
import User from "../models/UserModel.js";
import bycrypt from "bcryptjs"
import CreateToken from "../utils/createToken.js";

const CreateUser = AsyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new Error("Please Enter the Details")
    }

    const exitsUser = await User.findOne({ email })
    if (exitsUser) {
        res.status(400).send("Please Enter Diferent Email")
    }

    const salt = await bycrypt.genSalt(10)
    const hashpassword = await bycrypt.hash(password,salt)

    const newUser = new User({ username, email, password:hashpassword });

    try {
        await newUser.save();
        CreateToken(res, newUser._id);

        res.status(201).json({_id:newUser._id, username: newUser.username, email: newUser.email, isAdmin: newUser.isAdmin })

    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
});

const LoginUser = AsyncHandler(async (req, res)=>{
   const {email, password} = req.body;

   const exitsUser = await User.findOne({email})
   if (exitsUser) {
   const isPasswordValid = await bycrypt.compare(password, exitsUser.password)
     if(isPasswordValid){
        CreateToken(res, exitsUser._id)

        res.status(201).json({_id:exitsUser._id, username: exitsUser.username, email: exitsUser.email, isAdmin: exitsUser.isAdmin })
     } else {
        return
     }
   }
    return;
})

const LogoutUser = AsyncHandler(async (req, res)=>{
   res.cookie("jwt", "", {
    httpOnly : true,
    expires: new Date(0)
   })

   res.status(200).json({message: "Logout Seccessfully"})
})

export { CreateUser, LoginUser, LogoutUser }