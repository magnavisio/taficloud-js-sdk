import axios from "axios";
import {TaficloudMedia, TaficloudResponse} from "./Media";

export class Taficloud {

    constructor(private apiKey: string) {
    }

    private getAxiosInstance() {
        return axios.create({
            baseURL: 'https://stash.taficloud.com/media',
            headers: {
                Authorization: `Bearer ${this.apiKey}`
            }
        });
    }

    async uploadFile(file: File | Blob, fileName: string, folder?: string): Promise<TaficloudMedia> {
        try {
            const formData = new FormData();
            formData.append('file', file, fileName);

            if (folder) {
                formData.append('folder', folder);
            }

            const response = await this.getAxiosInstance().post("/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return (response.data as TaficloudResponse<TaficloudMedia>).data;
        } catch (error) {
            throw new Error(`Failed to upload file: ${error}`);
        }
    }
}
