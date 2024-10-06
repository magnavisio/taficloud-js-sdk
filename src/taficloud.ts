import axios from "axios";
import * as fs from "fs";
import path from "path";
import { TaficloudMedia, TaficloudResponse } from "./media";

export class Taficloud {
  constructor(private apiKey: string) {}

  private getAxiosInstance() {
    return axios.create({
      baseURL: "https://cloudloom-api-dev.craftme.dev/media",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  async uploadFile(
    file: File | Blob | Buffer,
    fileName: string,
    folder?: string
  ): Promise<TaficloudMedia> {
    try {
      const formData = new FormData();

      if (Buffer.isBuffer(file)) {
        formData.append("file", new Blob([file]), fileName);
      } else {
        formData.append("file", file, fileName);
      }

      if (folder) {
        formData.append("folder", folder);
      }

      const response = await this.getAxiosInstance().post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return (response.data as TaficloudResponse<TaficloudMedia>).data;
    } catch (error) {
      throw new Error(`Failed to upload file: ${error}`);
    }
  }

  async uploadMultiple(
    files: (File | Blob | Buffer)[],
    fileNames: string[],
    folder?: string
  ): Promise<TaficloudMedia[]> {
    try {
      const formData = new FormData();

      files.forEach((file, index) => {
        if (Buffer.isBuffer(file)) {
          const fileBlob = new Blob([file]);
          formData.append("files", fileBlob, fileNames[index]);
        } else {
          formData.append("files", file, fileNames[index]);
        }
      });

      if (folder) {
        formData.append("folder", folder);
      }

      const response = await this.getAxiosInstance().post(
        "/upload/multiple",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return (response.data as TaficloudResponse<TaficloudMedia[]>).data;
    } catch (error) {
      throw new Error(`Failed to upload file: ${error}`);
    }
  }

  async uploadBase64(
    base64File: string,
    mimeType: string,
    folder?: string
  ): Promise<TaficloudMedia> {
    try {
      const payload = {
        file: base64File,
        mimeType,
        folder,
      };
      const response = await this.getAxiosInstance().post(
        "/upload/base64",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);

      return (response.data as TaficloudResponse<TaficloudMedia>).data;
    } catch (error) {
      throw new Error(`Failed to upload file: ${error}`);
    }
  }

  async download(
    key: string,
    download: boolean = false,
    width?: number,
    height?: number
  ): Promise<void> {
    try {
      const url = `/download/?media=${encodeURIComponent(key)}`;
      const response = await this.getAxiosInstance().get(url, {
        responseType: "arraybuffer",
        params: { width, height },
      });

      const downloadsDir = path.join(__dirname, "..", "src", "downloads");
      await fs.promises.mkdir(downloadsDir, { recursive: true });

      const fileName = path.basename(key);
      const filePath = path.join(downloadsDir, fileName);

      await fs.promises.writeFile(filePath, Buffer.from(response.data));
      if (download) {
        console.log(`File downloaded to ${filePath}`);
      }
    } catch (error) {
      throw new Error(`Failed to download file: ${error}`);
    }
  }

  async getMetadata(key: string): Promise<TaficloudMedia> {
    try {
      const response = await this.getAxiosInstance().get(
        `/metadata/?mediaKey=${encodeURIComponent(key)}`
      );
      return (response.data as TaficloudResponse<TaficloudMedia>).data;
    } catch (error) {
      throw new Error(`Failed to get image metadata: ${error}`);
    }
  }

  async convertImageFormat(
    key: string,
    format: "jpeg" | "png" | "webp" | "tiff" | "avif"
  ): Promise<any> {
    try {
      const response = await this.getAxiosInstance().post("/convert", {
        key,
        format,
      });
      return (response.data as TaficloudResponse<TaficloudMedia>).data;
    } catch (error) {
      throw new Error(`Failed to get image metadata: ${error}`);
    }
  }

  async mergePDFs(pdfs: Array<File | Blob | Buffer>): Promise<TaficloudMedia> {
    try {
      const formData = new FormData();

      pdfs.forEach((pdf, index) => {
        if (Buffer.isBuffer(pdf)) {
          formData.append(
            `pdf${index + 1}`,
            new Blob([pdf]),
            `pdf${index + 1}.pdf`
          );
        } else {
          formData.append(`pdf${index + 1}`, pdf, `pdf${index + 1}.pdf`);
        }
      });

      const response = await this.getAxiosInstance().post(
        "/merge-pdfs",
        formData,
        {
          headers: {
            "Content-Type": "application/pdf",
          },
        }
      );

      return (response.data as TaficloudResponse<TaficloudMedia>).data;
    } catch (error) {
      throw new Error(`Failed to merge PDFs: ${error}`);
    }
  }

  async compressImage(
    imageFile: File | Blob | Buffer,
    customOptions: any = {}
  ): Promise<any> {
    try {
      const formData = new FormData();

      if (Buffer.isBuffer(imageFile)) {
        formData.append("image", new Blob([imageFile]), "image.jpg");
      } else {
        formData.append("image", imageFile);
      }

      formData.append("options", JSON.stringify(customOptions));

      const response = await this.getAxiosInstance().post(
        "/compress-img-file",
        formData,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
          },
        }
      );

      return (response.data as TaficloudResponse<TaficloudMedia>).data;
    } catch (error) {
      throw new Error(`Failed to compress image: ${error}`);
    }
  }
}
