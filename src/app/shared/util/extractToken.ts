export type Payload = {
    sub: number;
    user: string;
}

export const extractToken = (token: string): Payload | null => {

    try {
        const payloadBase64 = token?.split('.')[1];
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);
        return payload;
    }
    catch (error) {
        console.error('failed to extract token', error);
        return null;
    }
}