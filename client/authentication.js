App = window.App || {};
var LoginErr, createUserError, recoverEmailError, passwordUpdateError;


/*==========  SIGNUP  ==========*/


App.createUserAccount = function () {
	console.log("INIT create user account ");
	
	// get the values form the input elements 
	var username = $("#usernameSignup").val().toLowerCase();
	var email = $("#email").val().toLowerCase();	
	var password = $("#passwordSignup").val();
	var firstName = $("#firstName").val();	
	var lastName = $("#lastName").val();	

	Accounts.createUser({
		username: username, 
		password: password, 
		email: email, 
		profile: {
			firstName: firstName, 
			lastName: lastName
		}
	}, function(error) {
		if (error) {
			console.log(error);
			//$("#signupForm div .alert").remove();
			$("#createUser").button('reset');
			if (createUserError >= 1) {
				$("#main div.alert:first").fadeOut(100).fadeIn(100);
			} else {
				$("form#signupForm").before("<div class='alert alert-error'>" + error.reason + "</div>");
				createUserError = 1;
			}
		} else {
			Meteor.Router.to("/");
		}
	});
	
};


App.signupRules = {
	rules: {
		usernameSignup: {
			required: true,
			alphanumeric: true,
			minlength: 2
		},
		email: {
			required: true,
			email: true
		},
		passwordSignup: {
			required: true
		},
		password_againSignup: {
			required: true,
			equalTo: "#passwordSignup",
			minlength: 3,
			maxlength: 12
		},
		firstName: {
			required: true,
			minlength: 3,
			maxlength: 50
		},
		lastName: {
			required: true,
			minlength: 3,
			maxlength: 50
		},
	}
};


App.signupMessages = {
	messages: {
		usernameSignup: {
			required: "<strong>Note!</strong> required *",
			alphanumeric: "Must be alphanumerical",
			minlength: "must be at least 2 chars"
		},
		email: {
			required: "We need your email adress to contact you",
			email: "Your email must be in the format of name@domain.com"
		},
		password_againSignup: {
			required: "Retype your password",
			equalTo: "The passwords have to match",
			minlength: "At least 3 chars!",
			maxlength: "No longer then 12 chars!"
		},
		firstName: {
			required: "What is your first name?",
			minlength: "At least 3 chars!",
			maxlength: "no longer then 50 chars!"
		},
		lastName: {
			required: "What is your last name?",
			minlength: "At least 3 chars!",
			maxlength: "no longer then 50 chars!"
		}
	}
};

App.signupForm = "#signupForm";

App.messagePlacement = {
	onkeyup: false,
	debug: true,
	errorElement: "div",
	success: function(label) {
		label.html("<strong>Ok!</strong>");
		label.parent("div.alert").removeClass("alert-info alert-error").addClass("alert-success");
	},
	errorPlacement: function(error, element) {
		console.log("error");
		console.log(element.parent().children("div.alert").length);
		if (element.parent().children("div.alert").length < 1) {
			var help_block = element.parent().children("div.help-block");
			if(help_block.length < 1) {
				element.parent().append("<div class='alert alert-error'>&nbsp;</div>");
			} else {
				help_block.removeClass("help-block muted").addClass("alert alert-error");
			}
			element.next("div.alert").html(error);
		} else {
			element.next("div.alert").html(error);
		}
	},
	highlight: function(element, errorClass, validClass) {
		$(element).next("div.alert").removeClass("alert-info alert-success").addClass("alert-error");
	},
	unhighlight: function(element, errorClass, validClass) {
		$(element).next("div.alert").removeClass("alert-error alert-info").addClass("alert-success");
	}
};

App.signupHandleSubmit = {
	submitHandler: function () {
		$("#createUser").button('loading');
		App.createUserAccount();
		return false;
	}
};



/*==========  LOGIN  ==========*/

App.login = function () {
	var username = $("#usernameLogin").val();
	var password = $("#passwordLogin").val();
	Meteor.loginWithPassword(username, password, function (error){
		if (error) {

			if (LoginErr >= 1) {
				$("#main div.alert").fadeOut(100).fadeIn(100);
				LoginErr = LoginErr + 1;
			} else {
				$("form#loginForm").before("<div class='alert alert-error'>Wrong username or password!</div>");
				LoginErr = 1;
			}


			$("#login").button('reset');
		} else {
			Meteor.Router.to("/");
		}
	});
}



App.loginRules = {
	rules: {
		usernameLogin: {
			required: true,
			alphanumeric: true,
			minlength: 2
		},
		passwordLogin: {
			required: true,
			minlength: 2
		}
	}
};





App.loginMessages = {
	messages: {
		usernameLogin: {
			required: "<strong>Note!</strong> required",
			alphanumeric: "Must be alphanumerical",
			minlength: "must be at least 2 chars"
		}, 
		passwordLogin: {
			required: "<strong>Note!</strong> required",
			minlength: "Must be at least 2 chars"
		}
	}
};


App.loginForm = "#loginForm"



App.loginHandleSubmit = {
	submitHandler: function () {
		$("#login").button('loading');
		$("#loginForm div .alert").remove();
		App.login();
		return false;
	}
};




/*==========  EDIT PROFILE  ==========*/

App.editUserAccount = function () {
	console.log("INIT create user account ");
	
	// get the values form the input elements 
	var firstName = $("#firstName").val();	
	var lastName = $("#lastName").val();	
	var bio = $("#bio").val();	

	Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.firstName": firstName, "profile.lastName": lastName, "profile.bio": bio}});
	$("#editProfileForm div.alert").remove();
	$("#saveEdit").button('reset');
	
	Meteor.Router.to("/users/" + Meteor.userId());
	
};


App.editProfileRules = {
	rules: {
		firstName: {
			required: true,
			minlength: 3,
			maxlength: 50
		},
		lastName: {
			required: true,
			minlength: 3,
			maxlength: 50
		},
	}
};


App.editProfileMessages = {
	messages: {
		firstName: {
			required: "What is your first name?",
			minlength: "At least 3 chars!",
			maxlength: "no longer then 50 chars!"
		},
		lastName: {
			required: "What is your last name?",
			minlength: "At least 3 chars!",
			maxlength: "no longer then 50 chars!"
		}
	}
};

App.editProfileForm = "#editProfileForm";


App.editProfileHandleSubmit = {
	submitHandler: function () {
		$("#saveEdit").button('loading');
		App.editUserAccount();
		return false;
	}
};




/*==========  RECOVERY EMAIL  ==========*/

App.recoverEmailSubmit = function () {
	
	// get the values form the input elements 
	var email = $("#email").val();	
	Accounts.forgotPassword({email: email}, function(error){
		if (error) {
			console.log(error);
			$("#recoverEmail").button('reset');
			if (recoverEmailError >= 1) {
				$("#main div.alert:first").fadeOut(100).fadeIn(100);
			} else {
				$("form#recoverEmailForm").before("<div class='alert alert-error'>" + error.reason + "</div>");
				recoverEmailError = 1;
			}
		} else {
			Meteor.Router.to("/login");
		}
	});
	
};


App.recoverEmailRules = {
	rules: {
		email: {
			required: true,
			email: true
		}
	}
};


App.recoverEmailMessages = {
	messages: {
		email: {
			required: "We need your email adress to contact you",
			email: "Your email must be in the format of name@domain.com"
		}
	}
};

App.recoverEmailForm = "#recoverEmailForm";


App.recoverEmailHandleSubmit = {
	submitHandler: function () {
		$("#recoverEmail").button('loading');
		App.recoverEmailSubmit();
		return false;
	}
};




/*==========  PASSWORD UPDATE  ==========*/

App.passwordUpdateSubmit = function () {
	var password = $("#passwordUpdate").val();	
	Accounts.resetPassword(Session.get('resetPassword'), password, function(error){
		if (error) {
			console.log(error);
			$("#passwordUpdateBtn").button('reset');
			if (passwordUpdateError >= 1) {
				console.log("Length", $("#main div.alert:first").length);
				$("#main div.alert:first").fadeOut(100).fadeIn(100);
			} else {
				$("form#passwordUpdateForm").before("<div class='alert alert-error'>" + error.reason + "</div>");
				passwordUpdateError = 1;
			}
		} else {
			Meteor.Router.to("/login");
		}
	});
	
};


App.passwordUpdateRules = {
	rules: {
		passwordUpdate: {
			required: true,
			minlength: 3,
			maxlength: 12
		},
		password_againUpdate: {
			required: true,
			equalTo: "#passwordUpdate",
			minlength: 3,
			maxlength: 12
		},
	}
};


App.passwordUpdateMessages = {
	messages: {
		passwordUpdate: {
			required: "Please enter a valid password",
			minlength: "At least 3 chars!",
			maxlength: "No longer then 12 chars!"

		},
		password_againUpdate: {
			required: "Retype your password",
			equalTo: "The passwords have to match",
			minlength: "At least 3 chars!",
			maxlength: "No longer then 12 chars!"
		}
	}
};

App.passwordUpdateForm = "#passwordUpdateForm";


App.passwordUpdateHandleSubmit = {
	submitHandler: function () {
		$("#passwordUpdateBtn").button('loading');
		console.log("calling update...")
		App.passwordUpdateSubmit();
		return false;
	}
};

