"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.serverError = exports.forbidden = exports.unAuthorizedError = exports.badRequest = exports.send = exports.noContent = exports.created = exports.resourceConflict = exports.ok = void 0;
const errors_1 = require("../errors");
const ok = (data) => ({
    statusCode: 200,
    body: data,
});
exports.ok = ok;
const resourceConflict = (error) => ({
    statusCode: 409,
    body: error,
});
exports.resourceConflict = resourceConflict;
const created = (data) => ({
    statusCode: 201,
    body: data,
});
exports.created = created;
const noContent = (data) => ({
    statusCode: 204,
    body: data,
});
exports.noContent = noContent;
const send = (data) => ({
    statusCode: 250,
    body: data,
});
exports.send = send;
const badRequest = (error) => ({
    statusCode: 400,
    body: {
        name: error.name,
        message: error.message
    }
});
exports.badRequest = badRequest;
const unAuthorizedError = (data) => ({
    statusCode: 401,
    body: new errors_1.UnauthorizedError(data),
});
exports.unAuthorizedError = unAuthorizedError;
const forbidden = (error) => ({
    statusCode: 403,
    body: error,
});
exports.forbidden = forbidden;
const serverError = (error) => ({
    statusCode: 500,
    body: error,
});
exports.serverError = serverError;
const notFound = (error) => ({
    statusCode: 404,
    body: error
});
exports.notFound = notFound;
//# sourceMappingURL=http-helpers.js.map