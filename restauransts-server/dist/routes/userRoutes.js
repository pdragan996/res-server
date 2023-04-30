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
const express_1 = require("express");
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
        res.status(500).send('Server Error');
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const newUser = yield userRepository.create(user);
        res.json(newUser);
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
            return res.status(404).send('User not found');
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