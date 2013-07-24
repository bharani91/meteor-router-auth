Template.password_update.rendered = function() {
    if(Session.get("resetPassword")) {
        // update password
        App.myValidation (App.passwordUpdateRules, App.passwordUpdateMessages, App.passwordUpdateForm, App.messagePlacement, App.passwordUpdateHandleSubmit);    
    } 
};