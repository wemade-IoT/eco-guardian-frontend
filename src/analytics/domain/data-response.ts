export class metricData {
    createdAt: string;
    deviceId: number;
    analyticsId: number;
    metrics: Array<{
        id: number;
        metricValue: number;
        metricType: string;
        metricTypesId: number;
        description?: string;
    }>;
    
    constructor(
        createdAt: string,
        deviceId: number,
        analyticsId: number,
        metrics: Array<{
        id: number;
        metricValue: number;
        metricType: string;
        metricTypesId: number;
        description?: string;

    }>) {
        this.metrics = metrics;
        this.createdAt = createdAt;
        this.deviceId = deviceId;
        this.analyticsId = analyticsId;
        
    }
}
