const Validator = require("validator");
const isEmpty = require("is-empty");

const patientValidator = {

  StorePatient: (data) => {

    let errors = [];
    var { first_name, middle_name, last_name, sex, age } = data;

    // Convert empty fields to an empty string so we can use validator functions

    first_name = !isEmpty(first_name) ? first_name : "";
    middle_name = !isEmpty(middle_name) ? middle_name : "";
    last_name = !isEmpty(last_name) ? last_name : "";
    sex = !isEmpty(sex) ? sex : "";
    age = !isEmpty(age) ? age : "";

    // First name checks
    if (Validator.isEmpty(first_name)) {
      errors = [...errors, "First name is required"];
    }
    // Middle name checks
    if (Validator.isEmpty(middle_name)) {
      errors = [...errors, "Middle name is required"];
    }
    // Last name checks
    if (Validator.isEmpty(last_name)) {
      errors = [...errors, "Last name is required"];
    }
    // Sex checks
    if (Validator.isEmpty(sex)) {
      errors = [...errors, "Sex is required"];
    } else if (!["male", "female", "Male", "Female"].includes(sex)) {
      errors = [...errors, "Sex should be either male or female"];
    }
    // Age checks
    if (Validator.isEmpty(age)) {
      errors = [...errors, "Age is required"];
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
}

module.exports = patientValidator