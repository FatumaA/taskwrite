import { Client } from "appwrite";

export const client = new Client();

client
	.setEndpoint(import.meta.env.VITE_APPWRITE_URL)
	.setProject(import.meta.env.VITE_APPWRITE_PROJ_ID);

export { ID } from "appwrite";
