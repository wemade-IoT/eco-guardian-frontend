export class OrderRequest {
    action: string;
    consumerId: number;
    installationDate: Date;
    details: Array<{OrderDetailRequest: any}>;

    constructor(
        action: string,
        consumerId: number,
        installationDate: Date,
        details: Array<{OrderDetailRequest: any}>
    ) {
        this.action = action;
        this.consumerId = consumerId;
        this.installationDate = installationDate;
        this.details = details;
    }


}