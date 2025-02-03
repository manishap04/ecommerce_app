import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/AuthMiddleware.js";
import formidable from "express-formidable";
import {createProductController, deleteProductController, getProductController, getSingleProductController, orderController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, realtedProductController, searchProductController, updateProductController } from "../controller/ProductController.js";

const router=express.Router()

router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)
router.get('/get-product',getProductController)
router.get('/get-product/:slug',getSingleProductController)
router.get('/product-photo/:pid',productPhotoController)
router.delete('/delete-product/:pid',requireSignIn,isAdmin,deleteProductController)
router.post('/product-filters',productFiltersController)
router.get("/product-count", productCountController);
router.get("/product-list/:page", productListController);
//search product
router.get("/search/:keyword", searchProductController);
//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

router.post("/make-order", requireSignIn, orderController);
export default router;