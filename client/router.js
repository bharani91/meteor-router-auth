Meteor.Router.add({
    '/': function() {
        Session.set("current_page", 'home');
        return 'home';
    },

    '/static_pages/:page': function(page) {
        Session.set("current_page", page);
        return page;
    },

    '/login': function() {
        Session.set("current_page", 'login');
        return 'login';
    },

    '/signup': function() {
        Session.set("current_page", 'signup');
        return 'signup';
    },

    '/logout': function() {
        Meteor.logout(function(error) {
            if(error) {
                alert("Could not logout!")
            } else {
                Meteor.Router.to("/");        
            }

        });
    },

    '/reset-password': function() {
        Session.set("current_page", 'recover_email');
        return 'recover_email';
    },

    '/reset-password/:token': function(token) {
        Session.set("resetPassword", token);
        Session.set("current_page", 'password_update');
        return 'password_update';
    },

    '/users/:id': function(id) {
        Session.set("current_page", 'viewProfile');
        return 'viewProfile';
    },

    '/users/:id/edit': function(id) {
        Session.set("current_page", 'editProfile');
        return 'editProfile';
    },

});


Meteor.Router.filters({
    requireLogin: function(page) {
        if (Meteor.user()) {
            return page;
        } else {
            return 'login';
        }
    }
});



// Meteor.Router.filter('requireLogin', {except: ['home', 'signin', 'signup', 'about', 'terms']});