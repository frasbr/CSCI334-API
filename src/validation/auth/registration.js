const isEmpty = require("lodash/isEmpty");

module.exports = (input) => {
    const { username, password, firstName, lastName, email } = input;

    let errors = {};

    if (!username) {
        errors.username = "Please enter a username";
    }

    if (!password) {
        errors.password = "Please enter a password";
    } else {
        // other password requirements here
    }

    if (!email) {
        errors.email = "This field is required";
    } else {
        // other email validation (e.g. check if the format is correct)
    }

    if (!firstName) {
        errors.firstName = "This field is required";
    }

    if (!lastName) {
        errors.lastName = "This field is required";
    }

    return {
        errors,
        isValid: !isEmpty(errors)
    };
};
