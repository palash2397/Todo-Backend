import Jwt  from "jsonwebtoken";
import "dotenv/config"

export const createToken =async(user, res, messege, statusCode)=>{
    const token = await Jwt.sign({_id:user._id}, process.env.JWT_SECRET_KEY);
    res
      .status(statusCode)
      .cookie("token", token,{
        httpOnly:true,
        maxAge: 15 * 60 * 1000,
      })
      .json({
        success: true,
        message: messege,
        token
      })
    
  

}
