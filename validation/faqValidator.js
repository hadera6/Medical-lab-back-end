const Validator = require("validator");
const isEmpty = require("is-empty");

const faqValidator = {

    StoreInput: (data) => {

        let errors = [];
        var { content, user } = data;

        // Convert empty fields to an empty string so we can use validator functions

        content = !isEmpty(content) ? content : "";
        user = !isEmpty(user) ? user : "";

        // Content checks
        if (Validator.isEmpty(content)) {
            errors = [...errors, "Content is required"];
        }
        // User checks
        if (Validator.isEmpty(user)) {
            errors = [...errors, "User is required"];
        }
        return {
            errors,
            isValid: isEmpty(errors)
        };
    }
}
module.exports = faqValidator