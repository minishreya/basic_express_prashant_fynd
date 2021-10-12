const workshops=require('../data/workshops.json')
const mongoose = require( 'mongoose' );
const Workshoping = mongoose.model( 'Workshop' );
//const Workshoping=require('../models/Workshop')
//const workshoping=require('../models/Workshopcopy')
const  data=(req,res,next)=>{
    // res.setHeader('Content-Type','application/json')
    // res.status(200)
    // res.end(JSON.stringify(workshops))
    res.json(workshops)
}
//==============================================

// Let's say every "page" shows 10 documents
// Sample queries
// page=3 will result in fetching documents from 21 - 30
// http://localhost:3000/workshops?fields=startDate&sort=desc&page=3
// const getWorkshops = async ( req, res, next ) => {
//     let { fields, sort, page } = req.query;
//     page = parseInt( page ); // please check for errors

//     if( isNaN( page ) ) {
//         page = 1;
//     }

//     const skip = ( page - 1 ) * 10;
//     const limit = 10;

//     let sortClause;

//     if( sort === 'desc' ) {
//         sortClause = {
//             [fields]: -1 // startDate: 1
//         };
//     } else {
//         sortClause = {
//             [fields]: 1
//         }
//     }

//     try {
//         const workshops = await Workshop.find().sort( sortClause ).skip( skip ).limit( limit );
//         res.status( 200 ).json( workshops );
//     } catch( error ) {
//         error.status = 500;
//         return next( error );
//     }
// };
//======================================

const getWorkshopById = async ( req, res, next ) => {
    let { id } = req.params;

    // there are better ways to do this check
    if( id.length !== 24 ) {
        const error = new Error( 'Invalid workshop id' );
        error.status = 400; // bad request
        next( error );
        return;
    }

    try {
        const match = await Workshop.findById( id );

        if( !match ) {
            const error = new Error( 'Workshop with given id does not exist' );
            error.status = 404;
            next( error );
            return;
        }

        res.json( match );
    } catch( error ) {
        error.status = 500;
        return next( error );
    }
};

const postWorkshop = ( req, res, next ) => {
    const workshop = req.body;
    


    try {
        const updatedWorkshop =  Workshoping.create( workshop )
        res.json( updatedWorkshop );
        //  const updatedWorkshop =  Workshop.pre('save',function(error,workshop ){
        //     res.json( updatedWorkshop );
        //  })
        
    //     var newworkshop= new workshoping(workshop)
    // const updatedworkshop=newworkhsop.save().then(function()
    // {
    //     res.json(updatedworkshop)
    // })
    
    } catch( error ) {
        // error could have occured due to
        //      1. DB issues (for example DB server not connected to etc.)
        //      2. Mongoose validation check failure
        
        // Case 2 (Mongoose validation check failure)
        if( error.name === 'ValidationError' ) {
            error.status = 400; // bad request as required fields are missing or not proeprly given
            return next( error )
        }

        error.status = 500;
        console.log(".............",error)
        next( error );
    }
 };

// POST request body : { "name": "Express workshop v2" }
// findByIdAndUpdate - db.workshops.updateOne( { _id: req.params.id }, { $set: { "name": "Express workshop v2" } } )
const patchWorkshopById = async ( req, res, next ) => {
    const { id } = req.params;
    const workshop = req.body;

    /*
    workshop = { 
        "location": {
            "address": "Dadar",
            "city": "Mumbai"
        }
    }
    */
    if( workshop.location ) {
        if( workshop.location.address ) {
            // workshop = { 
            //     "location": {
            //         "address": "Dadar",
            //         "city": "Mumbai"
            //     },
            //     "location.address": "Dadar"
            // }
            workshop["location.address"] = workshop.location.address;
        }

        if( workshop.location.city ) {
            workshop["location.city"] = workshop.location.city;
        }
       
        if( workshop.location.state ) {
            workshop["location.state"] = workshop.location.state;
        }

        // workshop = {
        //     "location.address": "Dadar",
        //     "location.city": "Mumbai"
        // };
        delete workshop.location
    }

    try {
        const updatedWorkshop = await Workshop.findByIdAndUpdate( id, workshop, { runValidators : true, returnOriginal: false });
        res.json( updatedWorkshop );
    } catch( error ) {
        // check what type of error and send appropriate error message/status code etc.
        error.status = 500;
        next( error );
    }
};

const deleteWorkshopById = async ( req, res, next ) => {
    const { id } = req.params;

    try {
        const removed = await Workshop.findByIdAndRemove( id );
        
        if( !removed ) {
            const error = new Error( 'Workshop not found' );
            error.status = 404;
            return next( error );
        }
        
        res.status( 204 ).send(); // 204 -> success but nothing sent in response body
    } catch( error ) {
        error.status = 500;
        next( error );
    }
};

module.exports = {
   // getWorkshops,
    getWorkshopById,
    postWorkshop,
    patchWorkshopById,
    deleteWorkshopById,data
};

