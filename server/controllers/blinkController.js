const express= require('express');
const router = express.Router()

router.get('/', (req, res) => {
    res.send('HELLO FROM BLINK CONTROLLER')
})

module.exports=router 