const db = require('../models/users')
const express = require('express')
const app = express();
const User = db.sequelize.models.User;
app.use(express.urlencoded({ extended: true }));

exports.postUser = async(req, res, next) => {
    try{
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const data = await db.create({name: name, email: email, phone: phone})
        res.status(201).json({newUserDetails: data})
    }catch(err){
        console.log(err)
    } 
}

exports.getUsers = (req, res, next) => {
    return db.findAll()
    .then((result) =>{
        res.send(result);
    })   
}

exports.getUser = (req, res, next) => {
    const userId = req.params.id
    db.findOne({where: {id: userId}})
    .then((result) => {
        res.send(result)
    }).catch((err)=> {
        console.log(err)
    })
}

exports.deleteUser = async (req, res, next) =>{
    const userId = req.params.id
    try{
        if(userId == 'undefined'){
            console.log("id is missing")
            return res.status(400).json({err: 'ID is missing'})
        }
        db.destroy({where: {id: userId}})
        res.sendStatus(200)
    }catch(err) {
        return res.status(500).json(err)
    }
}

exports.getHome = (req, res, next) => {
    res.send('whlcome back home')
    res.end()
}