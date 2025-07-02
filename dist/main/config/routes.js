"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_routes_1 = __importDefault(require("../routers/client-routes"));
const owner_routes_1 = __importDefault(require("../routers/owner-routes"));
const administrator_routes_1 = __importDefault(require("../routers/administrator-routes"));
const car_routes_1 = __importDefault(require("../routers/car-routes"));
exports.default = (app) => {
    app.use('/api/client', client_routes_1.default);
    app.use('/api/owner', owner_routes_1.default);
    app.use('/api/administrator', administrator_routes_1.default);
    app.use('/api/car', car_routes_1.default);
};
//# sourceMappingURL=routes.js.map