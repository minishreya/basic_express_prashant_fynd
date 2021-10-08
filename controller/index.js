const path = require('path')
const fs = require('fs')
console.log(">>>>>>>>>>>>>",)

const indexing = function (req, res) {
    // res.write("working")
    // res.end(".....ending")

    res.send("html code... write....that html head title write here...")
    
    
}
const sendingfile = function (req, res) {
    // res.write("working")
    // res.end(".....ending")
    console.log(">>>>>>>>>>>>>",__dirname)
     const filepathcontact = path.join(__dirname, '../public/home.html')
    // const rs1 = fs.createReadStream(filepathcontact)
    // rs1.pipe(res)

    res.sendFile(filepathcontact)
}

const postmessage = function (req, res) {
    console.log(req.body)
    res.end("noted data")

    
}
module.exports = {
    indexing,
    postmessage,
    sendingfile
}





