"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controller/bookController");
const authorController_1 = require("../controller/authorController");
const router = express_1.default.Router();
router.get('/', bookController_1.getBook);
router.post('/login', authorController_1.Login);
router.post('/register', authorController_1.Register);
router.get('/login', function (req, res) {
    res.render('login');
});
router.get('/signup', function (req, res) {
    res.render('signup');
});
router.get('/dashboard', function (req, res) {
    res.render('dashboard');
});
router.get('/verify', function (req, res) {
    res.render('verify');
});
exports.default = router;
