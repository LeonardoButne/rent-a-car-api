"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressAdapterRouter = void 0;
const expressAdapterRouter = (controller) => {
    return async (req, res) => {
        const httpRequest = {
            body: req.body,
            query: req.query,
            file: req.file,
            files: req.files,
            params: req.params,
            token: req.token,
        };
        const httpResponse = await controller.handle(httpRequest);
        if (httpResponse.statusCode === 201 || httpResponse.statusCode === 200 || httpResponse.statusCode === 500) {
            res.status(httpResponse.statusCode).json(httpResponse.body);
        }
        else {
            res.status(httpResponse.statusCode).json({
                error: httpResponse.body?.message || (typeof httpResponse.body === 'string' ? httpResponse.body : JSON.stringify(httpResponse.body)) || 'Erro desconhecido'
            });
        }
    };
};
exports.expressAdapterRouter = expressAdapterRouter;
//# sourceMappingURL=express-router-adapter.js.map