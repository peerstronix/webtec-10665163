const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport');

// User mdel brought in
const User = require('../models/User.model');

// Login Page
// router.get('/login', (req, res)=>{
//     res.render('./students/login')
// })



// Register Page
router.get('/register', (req, res)=>{
    res.render('./user/register');
})


// Handling user registration
router.post('/register', (req, res)=>{
   
    // We are using DESTRUCTURING here
    const { name, userID, isAdmin, password, password2 } = req.body;

    console.log(req.body)

    // Form validation
    const errors = [];

    if(!name || !userID  || isAdmin === "" || !password || !password2){
        errors.push({msg: 'Please fill in all fields'});
    }

    if(password !== password2){
        errors.push({msg: 'Passwords do not match'});
    }

    if(password.length < 6){
        errors.push({msg: 'Password must be at least 6 characters'});
    }


    if(errors.length > 0){
        // If there are errors then we want to re-render the same register form with the values
        res.render('./user/register', {
            errors,
            name,
            userID
        })
    } else{
        // After all checks are done
        User.findOne({userID: userID})
            .then(user=>{
                if(user){
                    // If user with that userID exist

                    errors.push({msg: 'userID is already taken'});
                    res.render('./user/register', {
                        errors,
                        name,
                        userID
                    })
                }else{
                    // If userID is not already taken
                    const newUser = new User({
                        name,
                        userID,
                        isAdmin,
                        password
                    });

                    // We hash password
                    bcrypt.genSalt(10, (err, salt) =>{
                        bcrypt.hash(newUser.password, salt, (err, hash)=>{
                            if(err) throw err;

                            // Set the password to hashed
                            newUser.password = hash;

                            // Now we are ready to save to database
                            newUser.save()
                            
                                .then(()=> {
                                    req.flash('success_msg', 'Registration successful. You can now login');
                                    res.redirect('/');
                                })

                                .catch(err=> console.log(err));
                        })
                    })

                }
            })
    }
});









module.exports = router;