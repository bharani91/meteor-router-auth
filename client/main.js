var App = window.App || {};

// Add 'active' class to current page link
Handlebars.registerHelper('TabActive', function (route) {
    return (route == Session.get("current_page")) ? "active" : "";
});




// Login
Template.login.events({
    "keyup #password": function (event) {
        if (event.type == "keyup" && event.which == 13) {
            console.log("keyup identified enter was pressed");
            App.login();
        }
    },

    "click #login": function(event) {
        App.login();
    }
});

Template.login.rendered = function() {
    App.myValidation (App.loginRules, App.loginMessages, App.loginForm, App.messagePlacement, App.loginHandleSubmit);
};




// Signup
Template.signup.rendered = function() {
    App.myValidation (App.signupRules, App.signupMessages, App.signupForm, App.messagePlacement, App.signupHandleSubmit);
};




// Logged in views
Template.editProfile.user = function() {
    return Meteor.user();
};

Template.editProfile.rendered = function() {
    App.myValidation (App.editProfileRules, App.editProfileMessages, App.editProfileForm, App.messagePlacement, App.editProfileHandleSubmit);
};

Template.viewProfile.user = function() {
    return Meteor.user();
};

Template.loggedin_header.helpers({
    fullName: function() {
        var profile = Meteor.user().profile;
        return profile.firstName + ' ' + profile.lastName;
    },

    id: function() {
        return Meteor.user()._id;
    }
});