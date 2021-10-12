// const workshops = require( '../data/workshops.json' );
const mongoose = require( 'mongoose' );
const Workshop = mongoose.model( 'Workshop' );

const getModesForWorkshop = async ( req, res, next ) => {
    let { id } = req.params;

    // there are better ways to do this check
    if( id.length !== 24 ) {
        const error = new Error( 'Invalid workshop id' );
        error.status = 400; // bad request
        next( error );
        return;
    }

    try {
        const match = await Workshop.findById( id ).select( { modes : 1 } );

        if( !match ) {
            const error = new Error( 'Workshop with given id does not exist' );
            error.status = 404;
            next( error );
            return;
        }

        res.json( match.modes );
    } catch( error ) {
        error.status = 500;
        return next( error );
    }
};

const postModeForWorkshop = async ( req, res, next ) => {
    const { id } = req.params;
    const modes = req.body;

    try {
        let updateClause = {
            $addToSet: {
                modes: {
                    $each: modes
                }
            }
        }
        const updatedWorkshop = await Workshop.findByIdAndUpdate( id, updateClause );
        res.json( updatedWorkshop.modes );
    } catch( error ) {
        // check what type of error and send appropriate error message/status code etc.
        error.status = 500;
        next( error );
    }
};

module.exports = {
    getModesForWorkshop,
    postModeForWorkshop
};