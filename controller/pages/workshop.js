//const workshopsarray = require('../../data/workshops.json')
const workshops = require('../../data/workshops.json')

const allworkshopsdata = (req, res, next) => {
    const { sort } = req.query;

    // res.setHeader( 'Content-Type', 'application/json' );
    // res.end( JSON.stringify( workshops ) );

    // // sort the array
    // workshops.sort(( w1, w2 ) => {
    //     if( w1[sort] < w2[sort] ) {
    //         return -1;
    //     }

    //     if( w1[sort] > w2[sort] ) {
    //         return 1;
    //     }

    //     return 0;
    // });

    // res.json( workshops );


    res.render('workshop', { workshops })
    // res.render('workshop', { workshops: workshopsarray })

    // for empty
    //    res.render('workshop', { workshops: []})

}
const pages = (req, res, next) => {

    res.render('home')


}
const workshopsbyid = (req, res, next) => {
    let { id } = req.params;
    id = parseInt(id);

    if (isNaN(id)) {
        const error=new Error("workshop id must be number")
        error.status=400
        next(error)
        return
    }

    const match = workshops.find(workshop => id === workshop.id)

    
        if (!match) {
            next(new Error("workshop id not exist"))
            return 
        }
       
    
    res.json(workshops.find(workshop => id === workshop.id));


    // res.json(match)
}
module.exports = {
    allworkshopsdata, pages,
    workshopsbyid
}