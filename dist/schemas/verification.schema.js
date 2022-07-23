"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmailVerificationCodeSchema = exports.verificationEmailSchema = void 0;
var yup_1 = require("yup");
exports.verificationEmailSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        email: (0, yup_1.string)()
            .email('Must be a valid email')
            .required('Email is required'),
    }),
});
exports.checkEmailVerificationCodeSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        email: (0, yup_1.string)()
            .email('Must be a valid email')
            .required('Email is required'),
        code: (0, yup_1.number)().required('Verification Code is required'),
    }),
});
