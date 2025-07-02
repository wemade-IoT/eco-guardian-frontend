import {ProfileRequest} from "./profile-request.ts";
import {ProfileResponse} from "./profile-response.ts";

export class ProfileAssembler{
    static toRequest(request:any){
        return new ProfileRequest(
            request.name,
            request.username,
            request.email,
            request.address,
            request.avatarUrl,
            request.userId,
            request.subscriptionId
        )
    }

    static toResponse(response:any){
        return new ProfileResponse(
            response.id,
            response.name,
            response.username,
            response.email,
            response.address,
            response.avatarUrl,
            response.userId,
            response.subscriptionId
        )
    }
}