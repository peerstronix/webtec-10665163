module.exports = {

    // Now if we have any route that we want the User to have access to only if they a logged in
    // then we will have to pass tis function in there. This makes sure they are logged in.
    ensureAuthenticated: function(req, res, next) {

        // If the User is Authenticated then it works
        if(req.isAuthenticated()){
            return next();
        }

        // If the User is not Authenticated then they will be redirected to login with a message
        req.flash('error_msg', 'Please log in to view this page');
        res.redirect('homePage');

    }
}