const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')    //This is needed here bcos we will be checking with our local database for a match
const bcrypt = require('bcryptjs');   //This is needed here bcos we need to Decrypt the password in our database to see if it match wit wat the User is submitting


// We bring in our User model
const User = require('../models/User.model');




module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'userID' }, (userID, password, done)=> {
            // Now we want to make sure that the userID passed in actually match a User in our database first
            User.findOne({ userID: userID})
                .then( user=>{  //The search is actually supposed to give us a User
                    if(!user) {
                        return done(null, false, {message: 'The userID entered is not registered'});
                    }

                    // A normal if/else to check if Admin or Student
                    (user.isAdmin === '1')? console.log("You are Admin") : console.log("You are Student");

                    // Now if we get a User registered to that userID ten we go ahead and check if password match
                    bcrypt.compare(password, user.password, (err, isMatch)=>{
                        if(err) throw err;

                        if(isMatch){
                            return done(null, user);

                        } else{
                            return done(null, false, {message: 'Wrong Password'});
                        }
                    })

                })

                .catch(err => console.log(err));
        })
    )   // End of LocalStrategy

    // Time for Serializing and Deserializing the User

    passport.serializeUser( (user, done)=>{
        done(null, user.id);
    });

    passport.deserializeUser( (id, done)=>{
        User.findById( id, (err, user)=>{
            done(err, user);
        })
    })
}