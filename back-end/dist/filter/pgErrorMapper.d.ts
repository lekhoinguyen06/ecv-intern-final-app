type PGErrorOutput = {
    code: string;
    name: string;
    httpStatus: number;
};
export default function pgErrorMapper(code: string): PGErrorOutput;
export {};
