import {defineStore} from "pinia";
import {ProfileAssembler} from "../../domain/profile-assembler.ts";
import {ProfileService} from "../../infrastructure/services/profile.service.ts";
import {ProfileResponse} from "../../domain/profile-response.ts";

const profileService = new ProfileService()
export const ProfileStore = defineStore("profile",{
    state: () => ({
        profile: ProfileResponse as any,
    }),
    actions: {

        async updateProfile(id: number, data: any) {
            // Always build FormData here
            const formData = new FormData();
            formData.append("Name", data.Name);
            formData.append("LastName", data.LastName);
            formData.append("Address", data.Address);
            if (data.AvatarUrl) {
                formData.append("AvatarUrl", data.AvatarUrl);
            } else {
                formData.append("AvatarUrl", "");
            }
            try {
                return await profileService.updateProfile(id, formData);
            } catch (error) {
                console.error("Error updating profile:", error);
                throw error;
            }
        },

        async createProfile(data: any) {
            const request = ProfileAssembler.toRequest(data);
            console.log("Data from the assembler:", data);
            try {
                return await profileService.createProfile(request);
            } catch (error) {
                console.error("Error creating profile:", error);
                throw error;
            }
        },

        async getProfileByEmail(email: string) {
            try{
                const response = await profileService.getProfileByEmail(email);
                const data = response.data;
                if (data) {
                    this.profile = ProfileAssembler.toResponse(data);
                } else {
                    console.warn("No profile found for email:", email);
                }
            } catch (error) {
                console.error("Error fetching profile by email:", error);
                throw error;
            }
        }
    },
})