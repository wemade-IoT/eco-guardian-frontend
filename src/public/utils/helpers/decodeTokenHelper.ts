export function getPayload(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
}

export function getClaimType(type: string, token: string): any {
    const namespaces: Record<string, string> = {
        role: "http://schemas.microsoft.com/ws/2008/06/identity/claims/",
        sid: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/",
    };

    const namespace = namespaces[type] || "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/";
    const payload = getPayload(token);
    return payload[`${namespace}${type}`];
}