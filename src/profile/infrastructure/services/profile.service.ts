import {HttpService} from "../../../shared/services/http-common.ts";
import type {ProfileRequest} from "../../domain/profile-request.ts";

export class ProfileService extends HttpService{

    async createProfile(request: ProfileRequest){
        this.http.defaults.headers.common["Content-Type"] = "multipart/form-data";
        let formData = new FormData();
        formData.append("name", request.name);
        formData.append("email", request.email);
        formData.append("username", request.username);
        formData.append("address", request.address);
        formData.append("avatarUrl", request.avatarUrl);
        formData.append("userId", request.userId.toString());
        formData.append("subscriptionId", request.subscriptionId.toString());
        return await this.http.post("/profiles", formData);

    }

    async getProfileByEmail(email: string) {
        return await this.http.get(`/profiles/${email}`);
    }
}