App = window.App || {};

App.myValidation = function (theseRules, theseMessages, thisForm, thisPlacement, handleSubmit) {
	$(function() {
		var validateThis = _.extend({}, theseRules, theseMessages, thisPlacement, handleSubmit);
		// console.log("Validation is active!");
		// console.log(JSON.stringify(validateThis));
		$(thisForm).validate(
			validateThis
		);
		$(thisForm).keyup(function() {
			$(":focus", this).valid();
		});
	});
};
