const express=require('express');
const app=express();

app.listen(3000);
console.log("Server is listening in the port : 3000");

module.exports=app;