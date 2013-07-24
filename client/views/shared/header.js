Handlebars.registerHelper('TabActive', function (route) {
    return (route == Session.get("currentPage")) ? "active" : "";
});


Template.loggedin_header.helpers({
    firstName: function() {
        var profile = Meteor.user().profile;
        return profile.firstName;
    },

    id: function() {
        return Meteor.user()._id;
    }
});
