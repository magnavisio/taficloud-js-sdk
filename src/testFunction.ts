import * as fs from "fs";
import path from "path";
import { Taficloud } from "./taficloud";

const taficloud = new Taficloud("your-api-key");

async function streamToBuffer(stream: fs.ReadStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: any[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

const base64Upload = async () => {
  taficloud.uploadBase64(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAaJSURBVHgB7Z1NVhtHEMf/...",
    "image/png",
    "general"
  );
};

base64Upload();

const fileUpload = async () => {
  const filePath = path.join(
    __dirname,
    "..",
    "src",
    "asset",
    "Black-4k-Wallpaper.jpg"
  );

  (async () => {
    const fileStream = fs.createReadStream(filePath);

    const fileBuffer = await streamToBuffer(fileStream);

    const fileBlob = new Blob([fileBuffer]);

    taficloud
      .uploadFile(fileBlob, "Ny.png")
      .then((response) => {
        console.log("File uploaded successfully:", response);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  })();
};

fileUpload();

const uploadMultipleFiles = async () => {
  (async () => {
    const filePaths = [
      path.join(__dirname, "..", "src", "asset", "NY.jpg"),
      path.join(__dirname, "..", "src", "asset", "Black-4k-Wallpaper.jpg"),
    ];

    const fileNames = ["NY.jpg", "Black-4k-Wallpaper.jpg"];

    const files: Blob[] = [];

    for (const filePath of filePaths) {
      const fileStream = fs.createReadStream(filePath);

      const fileBuffer = await streamToBuffer(fileStream);

      const fileBlob = new Blob([fileBuffer]);
      files.push(fileBlob);
    }

    if (files.length === filePaths.length) {
      taficloud
        .uploadMultiple(files, fileNames, "folderName")
        .then((response) => {
          console.log("Files uploaded successfully:", response);
        })
        .catch((error) => {
          console.error("Error uploading files:", error);
        });
    }
  })();
};

uploadMultipleFiles();

const fileDownload = async () => {
  const key = "merged_1728040255248.pdf";
  const shouldDownload = true;

  taficloud
    .download(key, shouldDownload)
    .then(() => {
      console.log("Download initiated successfully");
    })
    .catch((error) => {
      console.error("Error downloading file:", error);
    });
};
fileDownload();

const metaData = async () => {
  const fileKey =
    "magnavisio/20200630_091003-7f09285e6911e683e325351129c08d6e.jpg";

  taficloud
    .getMetadata(fileKey)
    .then((response) => {
      console.log("Metadata Gotten:", response);
    })
    .catch((error) => {
      console.error("Error getting metadata", error);
    });
};

metaData();

const pdfMerge = async () => {
  const firstPdfPath = path.join(
    __dirname,
    "..",
    "src",
    "asset",
    "last-resume.pdf"
  );
  const secPdfPath = path.join(
    __dirname,
    "..",
    "src",
    "asset",
    "NEW-(ALWAYS EDIT).pdf"
  );

  const pdf1Buffer = fs.readFileSync(firstPdfPath);
  const pdf2Buffer = fs.readFileSync(secPdfPath);

  const pdf1 = new Blob([pdf1Buffer], { type: "application/pdf" });
  const pdf2 = new Blob([pdf2Buffer], { type: "application/pdf" });

  taficloud
    .mergePDFs([pdf1, pdf2])
    .then((mergedPDF) => {
      console.log("Merged PDF:", mergedPDF);
    })
    .catch((error) => {
      console.error(
        "Error merging PDFs:",
        error.response?.data || error.message
      );
    });
};

pdfMerge();

const fileCompression = async () => {
  const imagePath = path.join(__dirname, "..", "src", "asset", "NY.jpg");
  const imageBuffer = fs.readFileSync(imagePath);
  const imageFile = new Blob([imageBuffer]);

  const compressionOptions = {
    quality: 50,
  };

  taficloud
    .compressImage(imageFile, compressionOptions)
    .then((compressedImage) => {
      console.log("Compressed image:", compressedImage);
    })
    .catch((error) => {
      console.error(
        "Error compressing image:",
        error.response?.data || error.message
      );
    });
};
fileCompression();
