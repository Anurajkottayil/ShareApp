import { Client,Databases } from 'appwrite';

export const PROJECT_ID = '655dc4c606cd31853f3a'
export const DATABASE_ID = '655dd7e2cc5bd27f78e4'
export const COLLECTION_ID_MESSAGES = '655dd7f1579634b6b7a3'
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('655dc4c606cd31853f3a');
export const databases = new Databases(client);

export default client;