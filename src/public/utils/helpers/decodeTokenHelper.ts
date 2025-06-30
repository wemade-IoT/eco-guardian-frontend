export function getPayload(token: string): any {
    if (!token || typeof token !== 'string') {
        console.warn('Token is empty or invalid');
        return null;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
        console.warn('Token does not have valid JWT format (should have 3 parts)');
        return null;
    }

    try {
        const payload = parts[1];
        if (!payload) {
            console.warn('Token payload is empty');
            return null;
        }

        const decodedPayload = atob(payload);
        return JSON.parse(decodedPayload);
    } catch (error) {
        console.error('Error decoding token payload:', error);
        return null;
    }
}

export function getClaimType(type: string, token: string): any {
    if (!type || !token) {
        console.warn('Type or token is missing for getClaimType');
        return null;
    }

    const namespaces: Record<string, string> = {
        role: "role",
        sid: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid",
    };

    const namespace = namespaces[type];
    
    const payload = getPayload(token);
    if (!payload) {
        console.warn(`Cannot extract payload from token for claim type: ${type}`);
        return null;
    }
    return payload[namespace] ?? null;
}