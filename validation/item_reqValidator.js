const Validator = require("validator");
const isEmpty = require("is-empty");

const item_reqValidator = {

    StoreInput: (data) => {

        let errors = [];
        var { item, amount, user } = data;

        // Convert empty fields to an empty string so we can use validator functions

        item = !isEmpty(item) ? item : "";
        user = !isEmpty(user) ? user : "";
        amount = !isEmpty(amount) ? amount + "" : "";

        // Item checks
        if (Validator.isEmpty(item)) {
            errors = [...errors, "Item is required"];
        }
        // User checks
        if (Validator.isEmpty(user)) {
            errors = [...errors, "User is required"];
        }
        // Amount checks
        if (Validator.isEmpty(amount + "")) {
            errors = [...errors, "Amount is required"];
        } else if (!Validator.isNumeric(amount + "")) {
            errors = [...errors, "Amount should be number"];
        }

        return {
            errors,
            isValid: isEmpty(errors)
        };
    }
}
module.exports = item_reqValidator