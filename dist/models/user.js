"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.saltRounds = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.saltRounds = 10;
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isSuperAdmin: { type: Boolean, required: true },
    isAdmin: { type: Boolean, required: true },
});
exports.UserModel = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=user.js.map