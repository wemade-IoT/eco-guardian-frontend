import axios, { type AxiosInstance } from "axios";
import { ExternalPlantCareResponse } from "../../domain/external-plant-care-response";
import { ExternalPlantCareAssembler } from "../../domain/external-plant-care-assembler";

// We make a call to the following API
/*
  To Search For Plants care guide
  
https://www.perenual.com/api/species-care-guide-list?key=KEY&q=plant_name
 
  We must limit the number of requests to avoid hitting the API limits.
  for managing this we can use a cache or a local database to store the results of previous queries.
  In this case we can use a local database to store the results of previous queries so that we can avoid hitting the API limits.
*/


export class ExternalApiService {
    protected http: AxiosInstance;
    
    constructor() {
        this.http = axios.create({
            baseURL: "https://perenual.com/api",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });               
    }    
    public async searchPlants(plantName: string): Promise<ExternalPlantCareResponse> {
        try {
            const cachedData = localStorage.getItem(`plant-care-guide-${plantName}`);
            if (cachedData) {
                console.log("Cached data found, returning from local storage.");
                return JSON.parse(cachedData);
            }else{
            const response = await this.http.get(`/species-care-guide-list`, {
                params: {
                    key: import.meta.env.VITE_PERENUAL_API_KEY,
                    q: plantName
                }
            });
            if (!response.data || !response.data.data) {
                throw new Error("No data found for the given plant");
            }

            const apiResponse = ExternalPlantCareAssembler.toResponse(response.data);
            //Save data in local database or cache for future use
            //validate that it is already in cache or local database
                console.log("No cached data found, saving to local storage.");
                // If not cached, save the response to local storage
                localStorage.setItem(`plant-care-guide-${plantName}`, JSON.stringify(apiResponse));
                return apiResponse;
            }
            //There may be times where he names are similar so we may want to return the apiResponse
        } catch (error) {
            console.error("Error searching plants:", error);
            throw error;
        }
    }
}