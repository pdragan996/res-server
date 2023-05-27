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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = require("express");
const user_1 = require("../models/user");
const userRepository_1 = require("../repositories/userRepository");
const router = (0, express_1.Router)();
const userRepository = new userRepository_1.UserRepository();
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userRepository.getAll();
        res.json(users);
    }
    catch (error) {
        console.error(error);
        //TODO Move message and status to shared file
        res.status(500).send('Server Error');
    }
}));
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, isAdmin, isSuperAdmin } = req.body;
        const matchUser = yield userRepository.getByEmail(email);
        console.log(matchUser);
        if (!!matchUser) {
            return res.status(522).send('User already exists');
        }
        bcrypt_1.default.hash(password, user_1.saltRounds)
            .then((hash) => {
            const user = new user_1.UserModel({
                name,
                email,
                password: hash,
                isAdmin,
                isSuperAdmin
            });
            const newUser = userRepository.create(user)
                .then((user) => res.json(user));
        }).catch(err => {
            res.status(522).send('Failed to create hash');
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const { id } = req.params;
        const updatedUser = yield userRepository.update(id, user);
        if (!updatedUser) {
            return res.status(404).send('User with id not found');
        }
        res.json(updatedUser);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}));
exports.default = router;
//# sourceMappingURL=userRoutes.js.map