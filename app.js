const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const cors = require('cors')
const app = express();


const sequelize = require('./util/database');
const User = require('./models/users')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoute = require('./routes/users')

app.use(userRoute)




sequelize.sync()
.then(() => {
    app.listen(3000, ()=>{
        console.log('server started')
    })
})
.catch((err)=>{
    console.log(err)
})
