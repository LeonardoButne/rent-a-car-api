"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./config/app"));
const PORT = process.env.PORT || 4002;
app_1.default.listen(PORT, () => {
    console.log(`Server run at http://localhost:${PORT}`);
    console.log(`Swagger is run at http://localhost:${PORT}/api-docs`);
});
//# sourceMappingURL=server.js.map