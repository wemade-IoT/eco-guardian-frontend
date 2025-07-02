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
        async createProfile(data: any) {
            const request = ProfileAssembler.toRequest(data);
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