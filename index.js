const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors")
const clientsModel = require('./models/clients')
const app = express();
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb://127.0.0.1:27017/clients")

app.post('/login',(req,res)=>{
     const {email,password}=req.body;
     clientsModel.findOne({email:email})
     .then(user => {
          if(user){
               if(user.password===password){
                    res.json({name:user.name})
               }
               else{
                    res.json("the password is incorrect,ops!")
               }
          }
          else{
               res.json("no record existed")

          }
     })
})

app.post('/register',(req,res)=>{
clientsModel.create(req.body).
then(clients => res.json(clients))
.catch(err => res.json(err))
})
// Démarrage du serveur
app.listen(3001, () => {
    console.log("Serveur run good");
});
