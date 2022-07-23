"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserSchema = void 0;
var yup_1 = require("yup");
exports.registerUserSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        name: (0, yup_1.string)().required('Name is required'),
        password: (0, yup_1.string)()
            .required('Password is required')
            .min(8, 'Password is too short - should be 8 chars minimum')
            .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),
        email: (0, yup_1.string)().email('Must be a valid email'),
        phone: (0, yup_1.string)(),
        birthDate: (0, yup_1.object)({
            day: (0, yup_1.number)().required('Day is required'),
            month: (0, yup_1.string)().required('Month is required'),
            year: (0, yup_1.number)().required('Year is required'),
        }).required('Birth Date is required'),
        // passwordConfirmation: string()
        //   .oneOf([ref('password'), null], 'Password must match')
        //   .required('Password Confirmation is required'),
        // username: string()
        //   .required('Username is required')
        //   .min(2, 'Username is too short - should be 6 chars minimum')
        //   .matches(/^[a-zA-Z0-9_.-]*$/, 'Username can only contain Latin letters.'),
        // profileText: string(),
        // location: string(),
    }),
});
