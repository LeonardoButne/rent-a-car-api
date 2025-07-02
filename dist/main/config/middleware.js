"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("../middlewares");
const cors_1 = require("../middlewares/cors");
const static_folder_1 = require("../middlewares/static-folder");
exports.default = (app) => {
    app.use(middlewares_1.bodyParser);
    app.use(cors_1.corsApp);
    app.use(middlewares_1.helmetApp);
    app.use(middlewares_1.morganApp);
    app.use(static_folder_1.staticfolder);
};
//# sourceMappingURL=middleware.js.map