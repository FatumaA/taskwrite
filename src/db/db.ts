import { ID, databases } from "../utils/appwrite";
import { IPayload } from "../models/interface";

const dbID: string = import.meta.env.VITE_APPWRITE_DB_ID;
const collectionID: string = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const createDocument = async (payload: IPayload) => {
	const res = await databases.createDocument(dbID, collectionID, ID.unique(), {
		...payload,
	});

	return res;
};

const readDocuments = async () => {
	const res = await databases.listDocuments(dbID, collectionID);

	return res;
};

const updateDocument = async (payload: IPayload, id: string) => {
	const res = await databases.updateDocument(dbID, collectionID, id, {
		...payload,
	});

	return res;
};
const deleteDocument = async (id: string) => {
	const res = await databases.deleteDocument(dbID, collectionID, id);

	return res;
};

export { createDocument, readDocuments, updateDocument, deleteDocument };
