"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareAdapter = void 0;
const middlewareAdapter = (middleware) => {
    return async (req, res, next) => {
        const httpRequest = {
            header: req.headers,
        };
        const httpResponse = await middleware.handle(httpRequest);
        if (httpResponse.statusCode === 200 || httpResponse.statusCode === 201) {
            req.token = httpResponse.body.token;
            next();
        }
        else {
            res.status(httpResponse.statusCode).json({
                error: httpResponse.body.message,
            });
        }
    };
};
exports.middlewareAdapter = middlewareAdapter;
//# sourceMappingURL=express-middleware-adapter.js.map