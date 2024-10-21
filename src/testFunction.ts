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
  taficloud
    .uploadBase64(
      "data:image/png;base64,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",
      "image/png",
      "general"
    )
    .then((response) => {
      console.log("File uploaded successfully:", response);
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
    });
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

  taficloud
    .download(key)
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

const compressImg = async () => {
  try {
    const filePath = "./src/asset/NY.jpg";

    const options = {
      quality: 5,
    };

    await taficloud.compressImage(filePath, options);
    console.log("Image compression test passed.");
  } catch (error) {
    console.error("Error in compressImage test:", error);
  }
};

compressImg();
