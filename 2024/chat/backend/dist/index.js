"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// Require Dependencies
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
const cors_1 = __importDefault(require("cors"));
const router_1 = require("./routes/router");
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : "3000";
// Instantiate an Express Application
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(server);
// Configure Express App Instance
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
app.use((0, cors_1.default)());
// Assign Routes
app.use("/", router_1.rootRoute);
// Handle not valid route
app.use("*", (req, res) => {
    res.status(404).json({ status: false, message: "Endpoint Not Found" });
});
io.on("connection", (socket) => {
    console.log("User connected");
    //  socket.io("disconnect", () => {
    //    console.log("User disconnected");
    //  });
});
// Open Server on selected Port
server.listen(PORT, () => console.info("Server listening on port ", PORT));
