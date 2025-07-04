import { metricData } from "./data-response";

// Interface for single analytics entry from backend
export interface AnalyticsEntry {
    id: number;
    deviceId: number;
    createdAt: string;
    metrics: Array<{
        id: number;
        metricValue: number;
        metricTypesId: number;
    }>;
}

export class MetricDataAssembler {

    static metricTypeConverter(metricType: number): string {
        switch (metricType) {
            case 1:
                return "Humidity";
            case 2:
                return "Light";
            case 3:
                return "Temperature";
            case 4:
                return "Water Consumption";
            default:
                return "Unknown Metric Type";
        }
    } 

    static descripionConverter(metricType: number): string {
        switch (metricType) {
            case 1:
                return "Humidity of the most recent monitored plantation";
            case 2:
                return "Light Levels of the most recent monitored plantation";
            case 3:
                return "Temperature of the most recent monitored plantation";
            case 4:
                return "Water Consumption in the last month";
            default:
                return "Unknown Metric Type";
        }
    }

    // For handling multiple analytics entries (array)
    static toResponse(analyticsData: AnalyticsEntry[]): metricData[] {
        console.log('MetricDataAssembler.toResponse input:', analyticsData);
        const result = analyticsData.map(entry => this.toSingleResponse(entry));
        console.log('MetricDataAssembler.toResponse output:', result);
        return result;
    }

    // For handling single analytics entry (object)
    static toSingleResponse(analyticsData: AnalyticsEntry): metricData {
        console.log('MetricDataAssembler.toSingleResponse input:', analyticsData);
        
        const metrics = analyticsData.metrics.map(metric => ({
            id: metric.id,
            metricValue: metric.metricValue,
            metricType: this.metricTypeConverter(metric.metricTypesId),
            metricTypesId: metric.metricTypesId,
            description: this.descripionConverter(metric.metricTypesId)
        }));
        
        const result = new metricData(
            analyticsData.createdAt,
            analyticsData.deviceId,
            analyticsData.id,
            metrics
        );
        
        console.log('MetricDataAssembler.toSingleResponse output:', result);
        return result;
    }

}