App = window.App || {};


$(function () { 
	$.validator.addMethod(
		"regex",
		function (value, element, regexp) {
			var re = new RegExp(regexp);
			console.log("value: " + value);
			console.log(re.test(value));
			return this.optional(element) || re.test(value);
		},
		"illegal characters"
	);
});

App.myValidation = function (theseRules, theseMessages, thisForm, thisPlacement, handleSubmit) {
	$(function() {
		var validateThis = _.extend({}, theseRules, theseMessages, thisPlacement, handleSubmit);
		console.log("Validation is active!");
		// console.log(JSON.stringify(handleSubmit));
		console.log(JSON.stringify(validateThis));
		$(thisForm).validate(
			validateThis
		);
		
		$(thisForm).keyup(function() {
			console.log("KEYUP was fired");
			$(":focus", this).valid();
		});
	});
};
