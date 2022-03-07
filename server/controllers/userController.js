const express= require('express');
const User = require('../models/User') 
const router = express.Router()

router.get('/', (req, res) => {
    res.send('HELLO UUUSSSEEERRR')
})
router.post('/register', async (req, res) => {

    try {
       
        console.log('req.body is', req.body)
        const {email, username, password} = req.body

        if (!email || !username || !password) return res.send({success: false, errorId: 1})
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