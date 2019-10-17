const express = require('express');
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');


const app = express();


// From Passport Config
// require('./config/passport.student')(passport);
require('./config/passport.user')(passport);


// From DB Config
const db = require('./config/dbKeys').MongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true})
    .then(()=> console.log("DB Connected..."))
    .catch(err=> console.log(err));


// #######  Middlewares ##############
// BodeyParser
app.use(express.urlencoded({extended: false}))
app.use(express.json());


// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


// Passport Middlewares
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());


// Create our own piece of custom middleware that have some
// Global variables in it
app.use((req, res, next)=>{
// Global variables are set by doing this
res.locals.success_msg = req.flash('success_msg');
res.locals.error_msg = req.flash('error_msg');
res.locals.error = req.flash('error');

next();
});

// Setting up the EJS middleware
app.use(express.static('public'));
app.use(expressLayouts);
app.set('view engine', 'ejs');


// Bringing in all routes
app.use('/', require('./routes/index'));
// app.use('/students', require('./routes/student'));
app.use('/user', require('./routes/user'));
app.use('/halls', require('./routes/hall'));
app.use('./admin', require('./routes/admin'));



const port = process.env.PORT || 5000;


app.listen(port, ()=> console.log(`Server started on port ${port}`));