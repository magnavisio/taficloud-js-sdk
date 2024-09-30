
# Taficloud

Taficloud-js-sdk is a simple library for uploading, downloading, and merging files using JavaScript. It supports authenticated requests with API keys and is designed to be easily integrated into web applications.

## Features

- Upload files to a specified URL with optional folder support.
- Download files from a specified URL.
- Merge multiple files into a single file.

## Installation

You can install the Taficloud library using npm:

```bash
npm install taficloud-js
```

If you want to install it as a development dependency:

```bash
npm install taficloud-js --save-dev
```

## Usage

### Importing the Library

After installing the library, you can import it into your JavaScript/TypeScript project.

```typescript
import Taficloud from 'taficloud-js';
```

### Initializing the Taficloud Class

You need to initialize the `Taficloud` class with your API key. The API key will be used in the `Authorization` header for authenticated requests.

```typescript
const taficloud = new Taficloud('your-api-key');
```

### Uploading a File

To upload a file, use the `uploadFile` method. This method takes a file (as a `File` or `Blob` object), a `fileName`, and a `url`. Optionally, you can specify a `folder`.

```typescript
const file = new File([new Blob(['file content'])], 'example.txt');

taficloud.uploadFile(file, 'example.txt', 'optional-folder')
    .then(response => {
        console.log('File uploaded successfully:', response);
    })
    .catch(error => {
        console.error('Failed to upload file:', error);
    });
```

### Downloading a File

To download a file from a URL, use the `downloadFile` method. This method will initiate a file download.

```typescript
taficloud.downloadFile('example.txt')
    .then(file => {
        console.log('File downloaded successfully:', file);
    })
    .catch(error => {
        console.error('Failed to download file:', error);
    });
```

### Merging Files

You can merge multiple files into a single file using the `mergeFiles` method. It takes an array of `File` or `Blob` objects and returns a merged file.

```typescript
const files = [
    new File([new Blob(['file1 content'])], 'file1.txt'),
    new File([new Blob(['file2 content'])], 'file2.txt')
];

taficloud.mergeFiles(files, 'merged-file.txt')
    .then(mergedFile => {
        console.log('Files merged successfully:', mergedFile);
    })
    .catch(error => {
        console.error('Failed to merge files:', error);
    });
```

## API Reference

### Taficloud Class

#### `constructor(apiKey: string)`

Initializes the `Taficloud` class with the provided API key.

- `apiKey`: The API key used for authorization in requests.

#### `uploadFile(file: File | Blob, fileName: string, folder?: string): Promise<any>`

Uploads a file to the specified URL.

- `file`: The file to be uploaded (as a `File` or `Blob` object).
- `fileName`: The name of the file.
- `folder` (optional): The folder where the file should be uploaded.

Returns: A `Promise` that resolves with the server's response or rejects with an error.

#### `downloadFile(url: string): Promise<File>`

Downloads a file from the specified URL.

- `url`: The url of the file to download.

Returns: A `Promise` that resolves with the downloaded file.

#### `mergeFiles(files: (File | Blob)[], mergedFileName: string): Promise<File>`

Merges multiple files into a single file.

- `files`: An array of files (`File` or `Blob` objects) to be merged.
- `mergedFileName`: The name of the merged file.

Returns: A `Promise` that resolves with the merged file.

## Development

### Setting Up the Project

To set up the development environment, clone the repository and install the dependencies:

```bash
git clone https://github.com/magnavisio/taficloud-js-sdk.git
cd taficloud-js
npm install
```

### Running Tests

To run the tests, use the following command:

```bash
npm test
```

The tests are located in the `__tests__` folder, and they use **Jest** as the testing framework.

### Build the Library

To build the library for production, use the following command:

```bash
npm run build
```

This will generate a compiled version of the library in the `dist` folder, which can be published to npm or used in other projects.

## Contributing

If you would like to contribute to this project, feel free to fork the repository and submit a pull request. All contributions are welcome!

1. Fork the project
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
