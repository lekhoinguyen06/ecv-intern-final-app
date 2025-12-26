import { PostgresError as PGE } from 'pg-error-enum';

type PGErrorOutput = {
  code: string;
  name: string;
  httpStatus: number;
};

const ERROR_MAP: Record<string, PGErrorOutput> = {
  // Integrity Constraints (23xxx)
  [PGE.UNIQUE_VIOLATION]: {
    code: '23505',
    name: 'UNIQUE_VIOLATION',
    httpStatus: 409,
  },
  [PGE.FOREIGN_KEY_VIOLATION]: {
    code: '23503',
    name: 'FOREIGN_KEY_VIOLATION',
    httpStatus: 400,
  },
  [PGE.NOT_NULL_VIOLATION]: {
    code: '23502',
    name: 'NOT_NULL_VIOLATION',
    httpStatus: 400,
  },
  [PGE.CHECK_VIOLATION]: {
    code: '23514',
    name: 'CHECK_VIOLATION',
    httpStatus: 400,
  },

  // Data Exceptions (22xxx)
  [PGE.INVALID_TEXT_REPRESENTATION]: {
    code: '22P02',
    name: 'INVALID_TEXT_REPRESENTATION',
    httpStatus: 400,
  },
  [PGE.STRING_DATA_RIGHT_TRUNCATION]: {
    code: '22001',
    name: 'STRING_DATA_RIGHT_TRUNCATION',
    httpStatus: 400,
  },
  [PGE.NUMERIC_VALUE_OUT_OF_RANGE]: {
    code: '22003',
    name: 'NUMERIC_VALUE_OUT_OF_RANGE',
    httpStatus: 400,
  },
  [PGE.INVALID_DATETIME_FORMAT]: {
    code: '22007',
    name: 'INVALID_DATETIME_FORMAT',
    httpStatus: 400,
  },
};

const DEFAULT_ERROR: PGErrorOutput = {
  code: '99999',
  name: 'DATABASE_ERROR',
  httpStatus: 500,
};

export default function pgErrorMapper(code: string): PGErrorOutput {
  return ERROR_MAP[code] ?? DEFAULT_ERROR;
}
