const Validator = require("validator");
const isEmpty = require("is-empty");

const labfValidator = {

    StoreInput: (data) => {

        let errors = [];
        var { title, catagory, range, unit, price, type,
            duration, test, title_id, catagory_id } = data;

        // Convert empty fields to an empty string so we can use validator functions

        title = !isEmpty(title) ? title : "";
        catagory = !isEmpty(catagory) ? catagory : "";
        range = !isEmpty(range) ? range : "";
        unit = !isEmpty(unit) ? unit : "";
        price = !isEmpty(price) ? price + "" : "";
        type = !isEmpty(type) ? type : "";
        duration = !isEmpty(duration) ? duration : "";
        test = !isEmpty(test) ? test : "";


        // Title checks
        if (Validator.isEmpty(title)) {
            errors = [...errors, "Title is required"];
        }
        // Catagory checks
        if (Validator.isEmpty(catagory)) {
            errors = [...errors, "Catagory is required"];
        }

        // Range checks
        if (Validator.isEmpty(range)) {
            errors = [...errors, "Range is required"];
        }

        // Unit checks
        if (Validator.isEmpty(unit)) {
            errors = [...errors, "Unit is required"];
        }
        // Price checks
        if (Validator.isEmpty(price)) {
            errors = [...errors, "Price is required"];
        } else if (!Validator.isNumeric(price + "")) {
            errors = [...errors, "Price should be number"];
        }
        // Type checks
        if (Validator.isEmpty(type)) {
            errors = [...errors, "Type is required"];
        }
        // Duration checks
        if (Validator.isEmpty(duration)) {
            errors = [...errors, "Duration is required"];
        }
        // Test checks
        if (Validator.isEmpty(test)) {
            errors = [...errors, "Test is required"];
        }

        return {
            errors,
            isValid: isEmpty(errors)
        };
    },
    StoreForm_titleInput: (data) => {

        let errors = [];
        var { title, catagory } = data;

        // Convert empty fields to an empty string so we can use validator functions
        title = !isEmpty(title) ? title : "";
        catagory = !isEmpty(catagory) ? catagory : "";

        // Title checks
        if (Validator.isEmpty(title)) {
            errors = [...errors, "Title name is required"];
        }
        // Catagory name checks
        if (Validator.isEmpty(catagory)) {
            errors = [...errors, "Catagory name is required"];
        }
        return {
            errors,
            isValid: isEmpty(errors)
        };
    },
    StoreForm_catagoryInput: (data) => {

        let errors = [];
        var { catagory } = data;
        // Convert empty fields to an empty string so we can use validator functions
        catagory = !isEmpty(catagory) ? catagory : "";
        // Catagory checks
        if (Validator.isEmpty(catagory)) {
            errors = [...errors, "Catagory name is required"];
        }
        return {
            errors,
            isValid: isEmpty(errors)
        };
    }
}
module.exports = labfValidator