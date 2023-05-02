"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const restaurantsRoutes_1 = __importDefault(require("./routes/restaurantsRoutes"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        // set up middleware
        this.app.use(body_parser_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    routes() {
        // set up routes
        this.app.use('/users', userRoutes_1.default);
        this.app.use('/restaurants', restaurantsRoutes_1.default);
    }
}
// create an instance of the app
const app = new App().app;
// connect to the database and start listening for requests
(0, db_1.connect)().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`);
    });
});
//# sourceMappingURL=app.js.map