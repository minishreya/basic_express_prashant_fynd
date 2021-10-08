const pageNotFound = ( req, res, next ) => {
    res.render( 'page-not-found' );
    console.log("page not found log.....................")
};

const apiNotFound = ( req, res, next ) => {
    // res.json({
    //     status: 'error',
    //     message: 'API endpoint not supported'
    // });

    next(new Error("API not found."))
};

module.exports = {
    pageNotFound,
    apiNotFound
};