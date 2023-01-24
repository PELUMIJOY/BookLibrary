"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorController_1 = require("../controller/authorController");
const router = express_1.default.Router();
router.post('/create-author', authorController_1.Register);
router.post('/verify/:signature', authorController_1.verifyAuthor);
router.post('/login-author', authorController_1.Login);
exports.default = router;
