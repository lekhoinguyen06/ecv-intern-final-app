"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = pgErrorMapper;
const pg_error_enum_1 = require("pg-error-enum");
function pgErrorMapper(code) {
    switch (code) {
        case pg_error_enum_1.PostgresError.UNIQUE_VIOLATION:
            return 'UNIQUE_VIOLATION';
        case pg_error_enum_1.PostgresError.FOREIGN_KEY_VIOLATION:
            return 'FOREIGN_KEY_VIOLATION';
        case pg_error_enum_1.PostgresError.NOT_NULL_VIOLATION:
            return 'NOT_NULL_VIOLATION';
        case pg_error_enum_1.PostgresError.CHECK_VIOLATION:
            return 'CHECK_VIOLATION';
        case pg_error_enum_1.PostgresError.INVALID_TEXT_REPRESENTATION:
            return 'INVALID_TEXT_REPRESENTATION';
        case pg_error_enum_1.PostgresError.STRING_DATA_RIGHT_TRUNCATION:
            return 'STRING_DATA_RIGHT_TRUNCATION';
        case pg_error_enum_1.PostgresError.NUMERIC_VALUE_OUT_OF_RANGE:
            return 'NUMERIC_VALUE_OUT_OF_RANGE';
        case pg_error_enum_1.PostgresError.INVALID_DATETIME_FORMAT:
            return 'INVALID_DATETIME_FORMAT';
        default:
            return 'DATABASE_ERROR';
    }
}
//# sourceMappingURL=pgErrorMapper.js.map