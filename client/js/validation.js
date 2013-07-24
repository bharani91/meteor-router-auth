App = window.App || {};

App.myValidation = function (theseRules, theseMessages, thisForm, thisPlacement, handleSubmit) {
	$(function() {
		var validateThis = _.extend({}, theseRules, theseMessages, thisPlacement, handleSubmit);
		$(thisForm).validate(
			validateThis
		);
		$(thisForm).keyup(function() {
			$(":focus", this).valid();
		});
	});
};
