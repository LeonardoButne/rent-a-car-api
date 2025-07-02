"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbLoadUserByTokenFactory = void 0;
const db_load_client_by_token_1 = require("../../../data/usecases/user/db-load-client-by-token");
const jwt_adpter_1 = require("../../../infraestruture/cryptograph/jwt/jwt-adpter");
const user_sequelize_adapter_1 = require("../../../infraestruture/database/user-sequelize-adapter");
const dbLoadUserByTokenFactory = () => {
    const jwtAdapter = new jwt_adpter_1.JwtAdapter(process.env.JWTSECRET_KEY);
    const userSequelizeAdapter = new user_sequelize_adapter_1.ClientSequelizeAdapter();
    return new db_load_client_by_token_1.DbLoadUserByToken(jwtAdapter, userSequelizeAdapter);
};
exports.dbLoadUserByTokenFactory = dbLoadUserByTokenFactory;
//# sourceMappingURL=auth-user-middleware-factory.js.map