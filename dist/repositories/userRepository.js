"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_1 = require("../models/user");
class UserRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.UserModel.find();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.UserModel.findById(id);
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new user_1.UserModel(user);
            return newUser.save();
        });
    }
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.UserModel.findByIdAndUpdate(id, user, { new: true });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.UserModel.findByIdAndDelete(id);
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=userRepository.js.map