const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')    //This is needed here bcos we will be checking with our local database for a match
const bcrypt = require('bcryptjs');   //This is needed here bcos we need to Decrypt the password in our database to see if it match wit wat the Student is submitting


// We bring in our Student model
const Student = require('../models/Student.model');




module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ StudentnameField: 'email' }, (email, password, done)=> {
            // Now we want to make sure that the email passed in actually match a Student in our database first
            Student.findOne({ email: email})
                .then( Student=>{  //The search is actually supposed to give us a Student
                    if(!Student) {
                        return done(null, false, {message: 'The email entered is not registered'});
                    }

                    // Now if we get a Student registered to that email then we go ahead and check if password match
                    bcrypt.compare(password, Student.password, (err, isMatch)=>{
                        if(err) throw err;

                        if(isMatch){
                            return done(null, Student);

                        } else{
                            return done(null, false, {message: 'Wrong Password'});
                        }
                    })

                })

                .catch(err => console.log(err));
        })
    )   // End of LocalStrategy

    // Time for Serializing and Deserializing the Student

    passport.serializeUser( (student, done)=>{
        done(null, student.id);
    });

    passport.deserializeUser( (id, done)=>{
        Student.findById( id, (err, student)=>{
            done(err, student);
        })
    })
}