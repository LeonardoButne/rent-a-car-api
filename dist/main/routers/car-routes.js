"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const list_all_cars_factory_1 = require("../factories/car/list-all-cars-factory");
const get_car_by_id_factory_1 = require("../factories/car/get-car-by-id-factory");
const express_router_adapter_1 = require("../adapters/express-router-adapter");
const router = (0, express_1.Router)();
router.get('/cars', (0, express_router_adapter_1.expressAdapterRouter)((0, list_all_cars_factory_1.makeListAllCarsController)()));
router.get('/:carId', (0, express_router_adapter_1.expressAdapterRouter)((0, get_car_by_id_factory_1.makeGetCarByIdController)()));
exports.default = router;
//# sourceMappingURL=car-routes.js.map