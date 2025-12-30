"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = pgErrorMapper;
const pg_error_enum_1 = require("pg-error-enum");
const ERROR_MAP = {
    [pg_error_enum_1.PostgresError.UNIQUE_VIOLATION]: {
        code: '23505',
        name: 'UNIQUE_VIOLATION',
        httpStatus: 409,
    },
    [pg_error_enum_1.PostgresError.FOREIGN_KEY_VIOLATION]: {
        code: '23503',
        name: 'FOREIGN_KEY_VIOLATION',
        httpStatus: 400,
    },
    [pg_error_enum_1.PostgresError.NOT_NULL_VIOLATION]: {
        code: '23502',
        name: 'NOT_NULL_VIOLATION',
        httpStatus: 400,
    },
    [pg_error_enum_1.PostgresError.CHECK_VIOLATION]: {
        code: '23514',
        name: 'CHECK_VIOLATION',
        httpStatus: 400,
    },
    [pg_error_enum_1.PostgresError.INVALID_TEXT_REPRESENTATION]: {
        code: '22P02',
        name: 'INVALID_TEXT_REPRESENTATION',
        httpStatus: 400,
    },
    [pg_error_enum_1.PostgresError.STRING_DATA_RIGHT_TRUNCATION]: {
        code: '22001',
        name: 'STRING_DATA_RIGHT_TRUNCATION',
        httpStatus: 400,
    },
    [pg_error_enum_1.PostgresError.NUMERIC_VALUE_OUT_OF_RANGE]: {
        code: '22003',
        name: 'NUMERIC_VALUE_OUT_OF_RANGE',
        httpStatus: 400,
    },
    [pg_error_enum_1.PostgresError.INVALID_DATETIME_FORMAT]: {
        code: '22007',
        name: 'INVALID_DATETIME_FORMAT',
        httpStatus: 400,
    },
};
const DEFAULT_ERROR = {
    code: '99999',
    name: 'DATABASE_ERROR',
    httpStatus: 500,
};
function pgErrorMapper(code) {
    return ERROR_MAP[code] ?? DEFAULT_ERROR;
}
//# sourceMappingURL=pgErrorMapper.js.map