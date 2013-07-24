Template.recover_email.rendered = function() {
    
        // password reset email form
        App.myValidation (App.recoverEmailRules, App.recoverEmailMessages, App.recoverEmailForm, App.messagePlacement, App.recoverEmailHandleSubmit);    
    
    
};
