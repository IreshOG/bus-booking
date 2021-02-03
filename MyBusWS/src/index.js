const express = require('express');
const app = express();
const create = require("./model/dbsetup");

app.get('/setupDb', (req, res, next) => {
    create.setupDb().then((data) => {
        res.send(data);
    }).catch((error) => {
        next(error);
    })
})

app.listen(3000);
console.log("Server is listening in the port : 3000");

module.exports=app;