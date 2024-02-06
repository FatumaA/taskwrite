import { ID, databases } from "../utils/appwrite";

const dbID = import.meta.env.VITE_APPWRITE_DB_ID;
const collectionID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

interface IPayload {
	title: string;
	description: string;
	due_date: Date;
}

export const createDocument = async (payload: IPayload) => {
	const res = await databases.createDocument(dbID, collectionID, ID.unique(), {
		...payload,
	});

	return res;
};

export const readDocuments = async () => {
	const res = await databases.listDocuments(dbID, collectionID);

	return res;
};

export const updateDocument = async (payload: IPayload, id: string) => {
	const res = await databases.updateDocument(dbID, collectionID, id, {
		...payload,
	});

	return res;
};
export const deleteDocument = async (id: string) => {
	const res = await databases.deleteDocument(dbID, collectionID, id);

	return res;
};
