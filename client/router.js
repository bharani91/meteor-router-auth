Meteor.Router.add({
	'/': function() {
		Session.set("currentPage", "home");
		return "home";
	},

	'/static_pages/:page': function(page) {
		Session.set("currentPage", page);
		return page;
	},
	
	'/login': function() {
		Session.set("currentPage", 'login');
		return 'login';
	},

	'/signup': function() {
		Session.set("currentPage", 'signup');
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
		Session.set("currentPage", 'recover_email');
		return 'recover_email';
	},

	'/reset-password/:token': function(token) {
		Session.set("resetPassword", token);
		Session.set("currentPage", 'password_update');
		return 'password_update';
	},

	'/users/:id': function(id) {
		Session.set("currentPage", 'viewProfile');
		return 'viewProfile';
	},

	'/users/:id/edit': function(id) {
		Session.set("currentPage", 'editProfile');
		return 'editProfile';
	}
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

