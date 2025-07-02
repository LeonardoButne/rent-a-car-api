"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAuthUserMiddleware = void 0;
const auth_user_middleware_1 = require("../../../apresentation/middleware/auth-user-middleware");
const auth_user_middleware_factory_1 = require("./auth-user-middleware-factory");
const makeAuthUserMiddleware = (role) => {
    return new auth_user_middleware_1.AuthUserMiddleware((0, auth_user_middleware_factory_1.dbLoadUserByTokenFactory)());
};
exports.makeAuthUserMiddleware = makeAuthUserMiddleware;
//# sourceMappingURL=db-load-user-by-token.js.map