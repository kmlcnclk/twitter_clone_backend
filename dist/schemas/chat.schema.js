"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChatSchema = void 0;
var yup_1 = require("yup");
exports.createChatSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        _id: (0, yup_1.string)().required('Id is required'),
    }),
});
