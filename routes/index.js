const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport');

const { ensureAuthenticated } = require('../config/authUser');


router.get('/', (req, res)=>{
    res.render('homePage');
})


// Login Handler
router.post('/', (req, res, next)=>{

    passport.authenticate('local', {

        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
})


router.get('/home', (req, res, next)=>{
    // We check if we are able to get the user here, then we use it to make decisions....
    // console.log(req.user);

    (req.user.isAdmin === "0")? res.render('./halls/allHalls') : res.render('./admin/adminHomePage');
})



// Logout Handler
router.get('/logout', (req, res)=>{
    // Logout is easy since we get the logout() method from Passport
    req.logOut();

    // After logout button is clicked we want to redirect and display a message
    req.flash('success_msg', 'Logout successful');
    res.redirect('/');
})



// DashBoard route
// router.get('/dashboard', ensureAuthenticated, (req, res)=>{
//     res.render('./dashboard', {
//         name: req.user.fName
//     });
// })


module.exports = router;