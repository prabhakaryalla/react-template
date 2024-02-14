import { LabServicesApi } from "../../core/LabApi";
import { IComment } from "./IComment";

class CommentsClient {

    public fetchComments(): Promise<IComment[]> {
        return LabServicesApi.get<IComment[]>('/comments').then(response => response.data);
    }

}

export default new CommentsClient;