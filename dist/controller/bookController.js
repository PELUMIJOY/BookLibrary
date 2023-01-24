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
exports.deleteBook = exports.updateBook = exports.getOne = exports.getBook = exports.createBook = void 0;
const bookModel_1 = __importDefault(require("../model/bookModel"));
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.author;
        const book = yield bookModel_1.default.findOne({ name: req.body.name });
        if (!book) {
            const books = new bookModel_1.default({
                name: req.body.name,
                isPublished: req.body.isPublished,
                datePublished: req.body.datePublished,
                serialNumber: req.body.serialNumber,
            });
            const createbook = yield books.save();
            if (createbook) {
                return res
                    .status(200)
                    .json({ message: "Book created successfully", createbook });
            }
        }
        return res.status(400).json({ Error: "Book already exist" });
    }
    catch (error) {
        return res.status(500).json({
            Error: "internal server error",
            route: "/createbook",
        });
    }
});
exports.createBook = createBook;
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield bookModel_1.default.find({});
        res.status(200).render('index', { books: books });
    }
    catch (err) {
        res.status(500).json({
            err: "internal server error",
            route: '/getbook'
        });
    }
});
exports.getBook = getBook;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const getOneBook = yield bookModel_1.default.findById(id);
        return res.status(200).json({
            message: "Book retrived successfully", getOneBook
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "internal server error",
            route: '/getbook/:id'
        });
    }
});
exports.getOne = getOne;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const update = {
            name: req.body.name,
            isPublished: req.body.isPublished,
            datePublished: req.body.datePublished,
            serialNumber: req.body.serialNumber,
        };
        const updateOne = yield bookModel_1.default.findByIdAndUpdate(id, { $set: update });
        if (updateOne) {
            return res.status(200).json({
                message: "Book updated successfully", updateOne
            });
        }
        return res.status(400).json({
            Error: "Book not updated"
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "internal server error",
            route: '/updatebook/:id'
        });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deleted = yield bookModel_1.default.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).json({
                message: "Book deleted successfully"
            });
        }
        return res.status(400).json({
            Error: "Error deleting book"
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "internal server error",
            route: '/deletebook/:id'
        });
    }
});
exports.deleteBook = deleteBook;
