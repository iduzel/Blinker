const express= require('express');
const router = express.Router()

const User = require('../models/Users') 

router.post('/register', async (req, res) => {

    try {
        console.log('req.body is', req.body)
        const {email, username, pass} = req.body

        if (!email || !username || !pass) return res.send({success: false, errorId: 1})
        const newUser = new User(req.body)
        const user = await newUser.save()
        console.log('Register: user created is', user)
        res.send({success: true})
    } catch (error) {
        
        console.log('Register ERROR:', error.message)
        res.send(error.message)
    }
})

module.exports=router 