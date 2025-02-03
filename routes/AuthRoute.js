import express from "express"
import { forgotpasswordController, getallOrdersController, getallUsersController, getOrdersController, getorderstatusController, loginController, registerController, updateProfileController } from "../controller/AuthController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router=express.Router()

router.post('/register',registerController)
router.post('/login',loginController)

router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})

router.post('/forgot-password',forgotpasswordController)
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})

//update profile
router.put("/profile", requireSignIn, updateProfileController);
router.get('/orders',requireSignIn,getOrdersController);

router.get('/all-orders',requireSignIn,isAdmin,getallOrdersController);
router.put('/order-status/:orderId',requireSignIn,isAdmin,getorderstatusController);
router.get('/get-users',requireSignIn,isAdmin,getallUsersController);


export default router;