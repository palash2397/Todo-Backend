import { userModal } from "../modals/userSchema.js"
import Jwt  from "jsonwebtoken";


export const isAuthenticate = async(req, res, next)=>{
     const { token } = req.cookies
     if(!token){
        return res.status(404).json({
            success:false,
            message: "Login First"
        })
     }

     const decoded = Jwt.verify(token, process.env.JWT_SECRET_KEY)
     req.user = await userModal.findById(decoded._id);
     next()

}