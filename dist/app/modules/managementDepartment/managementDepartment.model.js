"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Management = exports.managementSchema = void 0;
const mongoose_1 = require("mongoose");
exports.managementSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Management = (0, mongoose_1.model)('Management', exports.managementSchema);
