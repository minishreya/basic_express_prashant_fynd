require("./models/Workshopcopy")
const express = require('express')
const mongoose=require('mongoose')
const dburl ="mongodb://localhost:27017/basicCRUDbyresturant"
const servers = express()
const port = process.env[0] || 5000
console.log(process.env.NODE_ENV)
// console.log("working",__dirname,".....filename with...",__filename)
const path = require('path')
const fs = require('fs')
const rounting = require("./routes/index")//1... importing the route.. by default index take..
const routingworkshop = require("./routes/workshopRoute")
const routingpageworkshop = require("./routes/pages/workshop")

const { pageNotFound, apiNotFound } = require( './middleware/notFound' );
const logger = require('./middleware/logger');
const errorhandling=require("./middleware/error")
// middleware 1
servers.use(logger);
servers.use(express.static(path.join(__dirname,"public")))//,,,,,,,,,,,,,,,,static file to included


// built-in Express middleware
// Set up form data on req.body
servers.use(express.urlencoded({ extended: false }));
// Set up JSON data sent using Ajax request on req.body
servers.use(express.json());
servers.set('view engine', 'ejs')


//middleware one is called at time so called next...
// servers.use((req,res,next)=>{
//     const receivedDate=new Date()
//     console.log("routing contectionns at recevied",receivedDate.toTimeString())
//     next()
// })
servers.use(rounting)//2.. 
servers.use(routingworkshop)
servers.use("/pages",routingpageworkshop)



// // const filepath1=path.join(__dirname,'index.html')
// servers.get('/',function(req,res)
// {
//     res.write("working")
//     res.end("ending")
// })
servers.get('/pipefile', function (req, res) {
    //res.send("i m in home page\i")
    const filepathcontact = path.join(__dirname, 'index.html')
    const rs1 = fs.createReadStream(filepathcontact)
    rs1.pipe(res)
})

servers.use( '/pages', pageNotFound );
servers.use( apiNotFound );
servers.use(errorhandling)

mongoose.connect(dburl).then(function(){
    servers.listen(port, function (error, result) {
        if (error) {
            console.log(error)
        }
        console.log(" server is listining...", port)
        console.log(`check http://localhost:${port}`)
    })

})


// mongoose.connection.on( 'connected', () => {
//     console.log( 'connected' );
//     console.log("working.....")
// });

// mongoose.connection.on( 'error', error => {
//     console.error( error.message );
// });

// mongoose.connection.on( 'disconnect', error => {
//     console.error( error.message );
// });