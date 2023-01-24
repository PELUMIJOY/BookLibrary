"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controller/bookController");
const router = express_1.default.Router();
router.post('/createbook', bookController_1.createBook);
router.get('/getbook', bookController_1.getBook);
router.get('/getbook/:id', bookController_1.getOne);
router.patch('/updatebook/:id', bookController_1.updateBook);
router.delete('/deletebook/:id', bookController_1.deleteBook);
exports.default = router;
