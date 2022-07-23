"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageSchema = void 0;
var yup_1 = require("yup");
exports.createMessageSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        chatId: (0, yup_1.string)().required('Chat id is required'),
        content: (0, yup_1.string)().required('Content is required.'),
    }),
});
