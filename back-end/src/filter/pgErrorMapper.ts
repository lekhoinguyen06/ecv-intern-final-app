import { PostgresError as PGE } from 'pg-error-enum';

export default function pgErrorMapper(code: string): string {
  switch (code as PGE) {
    // Integrity Constraints (23xxx) - Most Common
    case PGE.UNIQUE_VIOLATION:
      return 'UNIQUE_VIOLATION';
    case PGE.FOREIGN_KEY_VIOLATION:
      return 'FOREIGN_KEY_VIOLATION';
    case PGE.NOT_NULL_VIOLATION:
      return 'NOT_NULL_VIOLATION';
    case PGE.CHECK_VIOLATION:
      return 'CHECK_VIOLATION';

    // Data Exceptions (22xxx) - Common
    case PGE.INVALID_TEXT_REPRESENTATION:
      return 'INVALID_TEXT_REPRESENTATION';
    case PGE.STRING_DATA_RIGHT_TRUNCATION:
      return 'STRING_DATA_RIGHT_TRUNCATION';
    case PGE.NUMERIC_VALUE_OUT_OF_RANGE:
      return 'NUMERIC_VALUE_OUT_OF_RANGE';
    case PGE.INVALID_DATETIME_FORMAT:
      return 'INVALID_DATETIME_FORMAT';

    default:
      return 'DATABASE_ERROR';
  }
}
