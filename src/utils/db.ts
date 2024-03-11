import { ID, databases } from "./appwrite";
import { IPayload } from "../models/interface";
import { Query } from "appwrite";

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

const searchTasks = async (searchTerm: string) => {
	const resTitle = await databases.listDocuments(dbID, collectionID, [
		Query.search("title", searchTerm),
	]);
	const resDesc = await databases.listDocuments(dbID, collectionID, [
		Query.search("description", searchTerm),
	]);

	const res = [...resTitle.documents, ...resDesc.documents];

	// remove duplicate tasks
	const uniqueRes = res.filter(
		(task, index, self) => index === self.findIndex((t) => t.$id === task.$id)
	);

	return uniqueRes;
};
const sortByDueDate = async (isEarliestToLatest: boolean) => {
	const orderQuery = isEarliestToLatest
		? Query.orderAsc("due_date")
		: Query.orderDesc("due_date");
	const res = await databases.listDocuments(dbID, collectionID, [orderQuery]);
	return res;
};

export {
	createDocument,
	readDocuments,
	updateDocument,
	deleteDocument,
	searchTasks,
	sortByDueDate,
};
