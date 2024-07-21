const Validator = require("validator");
const isEmpty = require("is-empty");

const userValidator = {

  StoreInput: (data) => {

    let errors = [];
    var { first_name, middle_name, last_name, sex, username,
      password, password2, role, b_date } = data;

    // Convert empty fields to an empty string so we can use validator functions

    first_name = !isEmpty(first_name) ? first_name : "";
    middle_name = !isEmpty(middle_name) ? middle_name : "";
    last_name = !isEmpty(last_name) ? last_name : "";
    sex = !isEmpty(sex) ? sex : "";
    username = !isEmpty(username) ? username : "";
    password = !isEmpty(password) ? password : "";
    password2 = !isEmpty(password2) ? password2 : "";
    role = !isEmpty(role) ? role : "";
    b_date = !isEmpty(b_date) ? b_date : "";

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
    // User name checks
    if (Validator.isEmpty(username)) {
      errors = [...errors, "User name is required"];
    }
    // Password checks
    if (Validator.isEmpty(password)) {
      errors = [...errors, "Password is required"];
    }

    if (Validator.isEmpty(password2)) {
      errors = [...errors, "Confirm password is required"];
    }
    if (!Validator.isLength(password, { min: 6, max: 30 })) {
      errors = [...errors, "Password must be at least 6 characters"];
    }
    if (!Validator.equals(password, password2)) {
      errors = [...errors, "Passwords must match"];
    }
    // Role checks
    if (Validator.isEmpty(role)) {
      errors = [...errors, "Role is required"];
    } else if (!["admin", "reception", "collection", "reporter"].includes(role)) {
      errors = [...errors, "Role can only be admin, reception, collection or reporter"];
    }
    // D_date checks
    if (Validator.isEmpty(b_date)) {
      errors = [...errors, "B_date is required"];
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  },
  PasswordInput: (data) => {

    let errors = [];
    var { password, password2 } = data;

    // Convert empty fields to an empty string so we can use validator functions

    password = !isEmpty(password) ? password : "";
    password2 = !isEmpty(password2) ? password2 : "";

    // Password checks
    if (Validator.isEmpty(password)) {
      errors = [...errors, "Password is required"];
    }
    if (Validator.isEmpty(password2)) {
      errors = [...errors, "Confirm password is required"];
    }
    if (!Validator.isLength(password, { min: 6, max: 30 })) {
      errors = [...errors, "Password must be at least 6 characters"];
    }
    if (!Validator.equals(password, password2)) {
      errors = [...errors, "Passwords must match"];
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  },
  UpdateInput: (data) => {

    let errors = [];
    var { first_name, middle_name, last_name, sex, username,
      role, b_date } = data;

    // Convert empty fields to an empty string so we can use validator functions

    first_name = !isEmpty(first_name) ? first_name : "";
    middle_name = !isEmpty(middle_name) ? middle_name : "";
    last_name = !isEmpty(last_name) ? last_name : "";
    sex = !isEmpty(sex) ? sex : "";
    username = !isEmpty(username) ? username : "";
    role = !isEmpty(role) ? role : "";
    b_date = !isEmpty(b_date) ? b_date : "";

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
    // User name checks
    if (Validator.isEmpty(username)) {
      errors = [...errors, "User name is required"];
    }
    // Role checks
    if (Validator.isEmpty(role)) {
      errors = [...errors, "Role is required"];
    } else if (!["admin", "reception", "collection", "reporter"].includes(role)) {
      errors = [...errors, "Role can only be admin, reception, collection or reporter"];
    }
    // B_date checks
    if (Validator.isEmpty(b_date)) {
      errors = [...errors, "B_date is required"];
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  },
  LoginInput: (data) => {
    let errors = [];
    var { username, password } = data

    // Convert empty fields to an empty string so we can use validator functions
    username = !isEmpty(username) ? username : "";
    password = !isEmpty(password) ? password : "";

    // User name checks
    if (Validator.isEmpty(username)) {
      errors = [...errors, "User name is required"];
    }
    // Password checks
    if (Validator.isEmpty(password)) {
      errors = [...errors, "Password is required"];
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
}

module.exports = userValidator