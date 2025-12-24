"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user/entity/user.entity");
const logger_module_1 = require("./logger/logger.module");
const secret_module_1 = require("./secret/secret.module");
const secret_service_1 = require("./secret/secret.service");
const config_1 = require("@nestjs/config");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
async function setupDBCredentials(secretManager) {
    const dbSecret = await secretManager.load(process.env.SECRET_NAME ?? 'rds!db-a92b39b1-e81e-4780-999b-87d7c95ad8c8');
    return {
        type: 'postgres',
        host: process.env.DB_HOST ??
            'ecv-intern-rds.cpw4gissg1ma.ap-southeast-1.rds.amazonaws.com',
        port: process.env.DB_PORT ?? 5432,
        username: dbSecret?.username || process.env.DB_USERNAME || 'postgres',
        password: dbSecret.password,
        database: process.env.DB_DATABASE ?? 'postgres',
        entities: [user_entity_1.User],
        synchronize: true,
        ssl: true,
        extra: {
            ssl: {
                rejectUnauthorized: false,
            },
        },
    };
}
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', '..', 'front-end', 'out'),
                exclude: ['/api/*', '/health'],
            }),
            user_module_1.UserModule,
            logger_module_1.LoggerModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [secret_module_1.SecretModule],
                inject: [secret_service_1.SecretManagerService],
                useFactory: async (secretManager) => {
                    return await setupDBCredentials(secretManager);
                },
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map