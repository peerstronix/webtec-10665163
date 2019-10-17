const express = require('express');
const router = express.Router();


router.get('/allHalls', (req, res)=>{
    res.render('./halls/allHalls');
})


module.exports = router;