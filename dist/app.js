"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const bookroutes_1 = __importDefault(require("./routes/bookroutes"));
const authorRoutes_1 = __importDefault(require("./routes/authorRoutes"));
const pages_1 = __importDefault(require("./routes/pages"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = ((0, express_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
// view engine setup
app.set("views", path_1.default.join(__dirname, '..', "views"));
app.set("view engine", "ejs");
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
app.use('/', pages_1.default);
app.use('/books', bookroutes_1.default);
app.use('/author', authorRoutes_1.default);
// app.get("/", (req:Request, res:Response)=>{
// res.json('Hello Woorld')
// })
mongoose_1.default.connect(process.env.DB_URL, () => {
    console.log('Database connected successfully');
});
const PORT = 2300;
app.listen(PORT, () => {
    console.log(`Server is listening to http://localhost:${PORT}`);
});
exports.default = app;
