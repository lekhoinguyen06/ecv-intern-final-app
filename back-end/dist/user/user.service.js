"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
const log_service_1 = require("../log/log.service");
let UserService = class UserService {
    usersRepository;
    logService;
    constructor(usersRepository, logService) {
        this.usersRepository = usersRepository;
        this.logService = logService;
    }
    async create(user) {
        const userEntity = this.usersRepository.create(user);
        const savedUser = await this.usersRepository.save(userEntity);
        this.logService.info(`Created user with email: ${savedUser.id}`);
    }
    async findOne(email) {
        const existingUser = await this.usersRepository.findOneBy({ email });
        if (!existingUser)
            throw new common_1.NotFoundException(`Cannot find user with email: ${email}`);
        this.logService.info(`Found user with email: ${email}`);
        return existingUser;
    }
    async update(user) {
        const existingUser = await this.findOne(user.email);
        if (!existingUser)
            throw new common_1.NotFoundException(`Cannot find user with email: ${user.email}`);
        await this.usersRepository.update(existingUser.id, user);
        this.logService.info(`Updated user with email: ${user.email}`);
    }
    async remove(user) {
        const existingUser = await this.findOne(user.email);
        if (!existingUser)
            throw new common_1.NotFoundException(`Cannot find user with email: ${user.email}`);
        await this.usersRepository.delete(existingUser.id);
        this.logService.info(`Deleted user with email: ${user.email}`);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        log_service_1.LogService])
], UserService);
//# sourceMappingURL=user.service.js.map