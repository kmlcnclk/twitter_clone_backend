"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionSchema = void 0;
var yup_1 = require("yup");
exports.createSessionSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        password: (0, yup_1.string)()
            .required('Password is required')
            .min(6, 'Password is too short - should be 6 chars minimum')
            .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),
        email: (0, yup_1.string)()
            .email('Must be a valid email')
            .required('Email is required.'),
    }),
});
