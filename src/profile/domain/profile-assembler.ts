import { ProfileRequest } from "./profile-request.ts";
import { ProfileResponse } from "./profile-response.ts";

export class ProfileAssembler {
    static toRequestForm(request: ProfileRequest): FormData {
        const formData = new FormData();
        formData.append("Name", request.Name);
        formData.append("LastName", request.LastName);
        formData.append("Email", request.Email);
        formData.append("Address", request.Address);
        formData.append("UserId", request.UserId.toString());
        formData.append("SubscriptionId", request.SubscriptionId.toString());

        // avatarUrl is expected to be a File or Blob
        if (request.AvatarUrl) {
            formData.append("AvatarUrl", request.AvatarUrl);
        }
        else{
            // If avatarUrl is not provided, append an empty string to avoid issues in the backend
            formData.append("AvatarUrl", "");
        }
        
        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
            } else {
                console.log(`${key}: ${value}`);
            }
        }

        return formData;
    }

    static toRequest(request: ProfileRequest): any {
        return {
            Name: request.Name,
            LastName: request.LastName,
            Email: request.Email,
            Address: request.Address,
            AvatarUrl: request.AvatarUrl || "", // Default to empty string if AvatarUrl is not provided
            UserId: request.UserId,
            SubscriptionId: request.SubscriptionId
        };
    }

    static toResponse(response: any) {
        return new ProfileResponse(
            response.id,
            response.name,
            response.username,
            response.email,
            response.address,
            response.avatarUrl,
            response.userId,
            response.subscriptionId
        );
    }
}