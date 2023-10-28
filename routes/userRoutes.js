import express from "express"
import { getMyProfile, logOut, userLogin, userSignup } from "../controller/userAuth.js";
import { isAuthenticate } from "../middlewares/auth.js";
const router = express()


router.post('/signup',userSignup);
router.post('/login', userLogin);
router.get('/logout', logOut)
router.get('/me', isAuthenticate, getMyProfile)


export default router;