export class OrderResponse{
    id: number;
    action: string;
    createdAt: Date;
    completedAt: Date;
    stateId: number;
    consumerId: number;
    specialistId: number;
    installationDate: Date;
    details: Array<{OrderDetailResponse: any}>;

    constructor(
        id: number,
        action: string,
        createdAt: Date,
        completedAt: Date,
        stateId: number,
        consumerId: number,
        specialistId: number,
        installationDate: Date,
        details: Array<{OrderDetailResponse: any}>
    ) {
        this.id = id;
        this.action = action;
        this.createdAt = createdAt;
        this.completedAt = completedAt;
        this.stateId = stateId;
        this.consumerId = consumerId;
        this.specialistId = specialistId;
        this.installationDate = installationDate;
        this.details = details;
    }
}