import { EmptyTokenError, IllegalJWTTokenError } from './token-errors';
import { urlBase64Decode } from '../auth-oauth2.utils';

export function decodeJwtPayload(payload: string): any {
    if (payload.length === 0) {
        throw new EmptyTokenError('Cannot extract from an empty payload.');
    }

    const parts = payload.split('.');
    if (parts.length !== 3) {
        throw new IllegalJWTTokenError(`The payload ${payload} is not valid JWT payload and must consist of 3 parts.`);
    }

    let decoded;
    try {
        decoded = urlBase64Decode(parts[1]);
    } catch (e) {
        throw new IllegalJWTTokenError(`The payload ${payload} is not valid JWT payload and cannot be parsed.`);
    }

    if (!decoded) {
        throw new IllegalJWTTokenError(`The payload ${payload} is not valid JWT payload and cannot be decoded.`);
    }

    return JSON.parse(decoded);
}
