import { Client, Databases } from "appwrite";

export const client = new Client();

client
	.setEndpoint(import.meta.env.VITE_APPWRITE_URL)
	.setProject(import.meta.env.VITE_APPWRITE_PROJ_ID);

export const databases = new Databases(client);

export { ID } from "appwrite";
