import { AuthUserMiddleware } from "../../../apresentation/middleware/auth-user-middleware";
import { Middleware } from "../../../apresentation/protocols/midleware";
import { dbLoadUserByTokenFactory } from "./auth-user-middleware-factory";


export const makeAuthUserMiddleware = (role?: string): Middleware => {
    return new AuthUserMiddleware(dbLoadUserByTokenFactory())
}