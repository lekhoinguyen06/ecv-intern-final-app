"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getApiVersion;
const fs_1 = require("fs");
const path_1 = require("path");
function getApiVersion() {
    const packageJson = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(process.cwd(), 'package.json'), 'utf-8'));
    const apiVersion = process.env.API_VERSION ?? packageJson.version;
    return apiVersion;
}
//# sourceMappingURL=getApiVersion.js.map