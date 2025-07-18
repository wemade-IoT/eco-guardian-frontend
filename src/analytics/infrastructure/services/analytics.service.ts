import { HttpService } from "../../../shared/services/http-common.ts";
import { MetricDataAssembler } from "../../domain/data-assembler.ts";
import type { metricData } from "../../domain/data-response.ts";

export class AnalyticsService extends HttpService {

//
  public async getAnalytics(plantId: number, time:string): Promise<metricData[]> {
    try {
      // The mehod returns historic analytics data
      
      console.log("Fetching analytics for plant ID:", plantId, "with time period:", time);


      
      const response = await this.http.get(`metric-registry`,{
        params: {
          deviceId: plantId, 
          
          period: time
        }
      });
      console.log("Analytics data:", response.data);
     

       const metricsData = MetricDataAssembler.toResponse(response.data);
      console.log("Transformed metrics data:", metricsData);
      return metricsData;
    } catch (error) {
      console.error("Error fetching analytics:", error);
      throw error;
    }
  }

  //The method to get he most recent analytics
  public async getWidgetAnalytics(deviceId: number): Promise<metricData> {

    try {      
      const response = await this.http.get(`metric-registry/devices/${deviceId}/latest`);
      console.log("Widget Analytics data:", response.data);
      const metricsData = MetricDataAssembler.toSingleResponse(response.data);
      console.log("Widget Analytics data Transform:", metricsData);

      return metricsData;
    } catch (error) {
      console.error("Error fetching widget analytics:", error);
      throw error;
    }
  }
}
