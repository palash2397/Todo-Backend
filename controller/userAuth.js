import { userModal } from "../modals/userSchema.js";
import { createToken } from "../utils/token.js";
import "dotenv/config.js"
import bcrypt from "bcrypt"

export const userSignup =  async (req, res)=>{
    const {name, email, password}=req.body;
    const saltRound = 10
    const hashPassword = await bcrypt.hash(password, saltRound)
  
    const newUser = await userModal.create({name, email, password:hashPassword});
    createToken(newUser, res, "Registered Successfully", 201)
  }


export const userLogin = async(req, res)=>{
  const {email, password}= req.body
  const user = await userModal.findOne({email:email}).select("+password");
  if(!user){
    res.status(500).send('user does not exits')
  }

  if(!password || !user.password){
    res.status(500).send('Invalid password1')
  }

  await bcrypt.compare(password, user.password, (err, result)=>{
    if(err){
      console.log(err);
    }else{
      console.log(result)
      result?createToken(user,res, `Welcome back ${user.name}`, 200): res.send("Invalid password");
    }
  })
}


export const getMyProfile =(req, res)=>{
  res.status(200).json({
    success: true,
    user: req.user
  })

}


export const logOut =(req, res)=>{
   res
      .status(200)
      .cookie("token", "", { expires: new Date(Date.now())})
      .json({
         success: true,
         user: req.user
      })
}