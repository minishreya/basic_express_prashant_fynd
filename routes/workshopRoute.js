const express=require("express")
const workshopcontroller=require("../controller/workshopcontroller")

const router=express.Router();
router.get('/workshop',workshopcontroller.data)
router.get( '/:id', workshopcontroller.getWorkshopById );
router.post( '/postworkshop', workshopcontroller.postWorkshop ); // not working.........................done by robot3t   
router.patch( '/:id', workshopcontroller.patchWorkshopById );
router.delete( '/:id', workshopcontroller.deleteWorkshopById );
module.exports=router