Meteor.startup(function () {
	process.env.MAIL_URL = "smtp://xxxx%40gmail.com:yyyy@smtp.gmail.com:465";
});


Accounts.config({sendVerificationEmail: false, forbidClientAccountCreation: false});
Accounts.emailTemplates.siteName = "Signup";
Accounts.emailTemplates.from = "Signup <admin@localhost:3000>";


Accounts.emailTemplates.verifyEmail.subject = function (user) {
	return "Welcome to our App" + user.profile.firstName + " !";
};


Accounts.emailTemplates.verifyEmail.text = function (user, url) {
	return "Thanks for signing up. \n" +
		"Click the link below to activate your account. \n \n" + 
		url +
		"\n \n Drop us a line at support@example.com if you run into any issues." +
		"\n \n Thanks!";
};


Accounts.onCreateUser(function (options, user) {
	user.profile = options.profile;

	//Accounts.sendVerificationEmail(user._id, user.emails[0].address);
	return user;
});
