// import axios from 'axios';
// import {Taficloud} from "../src/taficloud";
// import MockAdapter from "axios-mock-adapter";
//
// describe('Taficloud Class', () => {
//     let mock: MockAdapter;
//     let uploader: Taficloud;
//     const apiKey = 'test-api-key';
//     const file = new File([new Blob(['file content'])], 'example.txt'); // Sample file
//
//     beforeEach(() => {
//         // Initialize axios mock adapter
//         mock = new MockAdapter(axios);
//         // Create an instance of the Upload class
//         uploader = new Taficloud(apiKey);
//     });
//
//     afterEach(() => {
//         mock.restore(); // Reset the mock after each test
//     });
//
//     it('should upload a file successfully with the correct headers', async () => {
//         // Mock the POST request to return success
//         mock.onPost("upload").reply(200, {success: true, data: {id: 1}});
//
//         // Call the uploadFile function
//         const response = await uploader.uploadFile(file, 'example.txt');
//
//         // Check that the request was made with the correct headers
//         const request = mock.history.post[0];
//         expect(request.headers['Authorization']).toBe(`Bearer ${apiKey}`);
//         expect(request.headers['Content-Type']).toContain('multipart/form-data');
//
//         // Check that the response is correct
//         expect(response.id).toBe(1);
//     });
//
//     it('should include the folder in the request if provided', async () => {
//         const folderName = 'my-folder';
//
//         // Mock the POST request
//         mock.onPost("upload").reply(200, {success: true, data: {id: 1, folderId: 4}});
//
//         // Call the uploadFile function with a folder
//         const response = await uploader.uploadFile(file, 'example.txt', folderName);
//
//         // Check that the folder was included in the form data
//         const request = mock.history.post[0];
//         const formData = new FormData();
//         formData.append('file', file, 'example.txt');
//         formData.append('folder', folderName);
//
//         expect(request.data).toContain(folderName); // Verify folder was sent
//
//         expect(response.id).toBe(4);
//     });
//
//     it('should throw an error if upload fails', async () => {
//         // Mock the POST request to fail
//         mock.onPost("upload").reply(500);
//
//         // Expect the uploadFile function to throw an error
//         await expect(uploader.uploadFile(file, 'example.txt'))
//             .rejects
//             .toThrow('Failed to upload file');
//     });
// });
