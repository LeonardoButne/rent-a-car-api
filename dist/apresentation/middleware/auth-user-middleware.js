"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserMiddleware = void 0;
const jwt_adpter_1 = require("../../infraestruture/cryptograph/jwt/jwt-adpter");
const access_denied_error_1 = require("../errors/access-denied-error");
const http_helpers_1 = require("../helpers/http-helpers");
class AuthUserMiddleware {
    loadClientById;
    constructor(loadClientById) {
        this.loadClientById = loadClientById;
    }
    async handle(httpRequest) {
        const jwt = new jwt_adpter_1.JwtAdapter(process.env.JWTSECRET_KEY);
        try {
            const authHeader = httpRequest.header?.authorization;
            if (!authHeader) {
                return (0, http_helpers_1.forbidden)(new access_denied_error_1.AccessDeniedError('Token não fornecido'));
            }
            const [bearer, token] = httpRequest.header.authorization.split(' ');
            if (bearer !== 'Bearer' || !token) {
                return (0, http_helpers_1.forbidden)(new access_denied_error_1.AccessDeniedError());
            }
            const payload = await jwt.decrypt(token);
            return (0, http_helpers_1.ok)({ token: payload });
        }
        catch (error) {
            return (0, http_helpers_1.serverError)(error);
        }
    }
}
exports.AuthUserMiddleware = AuthUserMiddleware;
//# sourceMappingURL=auth-user-middleware.js.map