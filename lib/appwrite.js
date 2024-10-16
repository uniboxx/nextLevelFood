import { Client, Storage } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.APPWRITE_PROJECT_ID);

export const storage = new Storage(client);

// const result = storage.getFileDownload('[BUCKET_ID]', '[FILE_ID]');

const result = storage.getFileDownload(
  '66e5ef2e0033280ac5af',
  '670f5ed6003bad5249ca'
);

console.log(result);
