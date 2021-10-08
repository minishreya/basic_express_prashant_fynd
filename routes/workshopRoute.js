const express=require("express")
const workshopcontroller=require("../controller/workshopcontroller")

const router=express.Router();
router.get('/workshop',workshopcontroller.data)
module.exports=router