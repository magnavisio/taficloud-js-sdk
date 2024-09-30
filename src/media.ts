
export interface TaficloudResponse<T> {
    code: number;
    message: string;
    data: T;
}

export interface TaficloudMedia {
    id: number;
    name: string;
    organizationId: number;
    url: string;
    key: string;
    mimeType: string;
    size: number;
}
