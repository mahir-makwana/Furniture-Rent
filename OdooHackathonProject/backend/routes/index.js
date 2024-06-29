const express = require("express");
const router = express.Router();

const authToken = require("../middleware/authToken");
const userLogOut = require("../controller/user/userLogout");
const getCategoryProductOne = require("../controller/product/getCategoryProductOne");

const allUsers = require("../controller/user/allUsers");
const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignin");
const userDetailController = require("../controller/user/userDetail");
const updateProductController = require("../controller/product/updateProduct");
const getProductController = require("../controller/product/getProduct");
const uploadProductController = require("../controller/product/uploadProduct");
const updateUser = require("../controller/user/updateUser");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getProductDetails = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/user/addToCartController");
const countAddToCartProduct = require("../controller/user/countAddToCartProduct");
const addToCartViewProduct = require("../controller/user/addToCartViewProduct");
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct");
const searchProduct = require("../controller/product/searchProduct");
const filterProductController = require("../controller/product/filterProduct");
const paymentController = require("../controller/order/paymentController");
const webhook = require("../controller/order/webhook");
const orderController = require("../controller/order/ordereController");
const allOrderController = require("../controller/order/allOrderController");

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailController);
router.get("/userLogout", userLogOut);

//admin panel
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

//product

router.post("/upload-product", authToken, uploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProductOne);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.post("/filter-product", filterProductController);

//user add to cart
router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/view-cart-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);
router.get("/search", searchProduct);

//payment and order
router.post("/checkout", authToken, paymentController);
router.post("/webhook", webhook); // /api/webhook
router.get("/order-list", authToken, orderController);
router.get("/all-order", authToken, allOrderController);
module.exports = router;
