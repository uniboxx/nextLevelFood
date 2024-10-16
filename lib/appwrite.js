import { Client, Databases, Storage } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.APPWRITE_PROJECT_ID);

export const databases = new Databases(client);
export const storage = new Storage(client);

// const result = storage.getFileDownload('[BUCKET_ID]', '[FILE_ID]');

// console.log(result);
