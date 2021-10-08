const express=require("express")
const workshoppagecontroller=require("../../controller/pages/workshop")

const router=express.Router();

//here is / pages/-----  bz /pages is declared in basic_express...
router.get("/",workshoppagecontroller.pages)
router.get("/workshops",workshoppagecontroller.allworkshopsdata)
router.get("/:id",workshoppagecontroller.workshopsbyid)

//router.get("/workshops/:id",workshoppagecontroller.workshopsbyid)


module.exports=router