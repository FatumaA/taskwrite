import { readDocuments } from "../db/db";
import { ITask } from "../models/interface";

export const getTasks = async () => {
	const { documents } = await readDocuments();
	console.log("ALL TASKS", documents);

	return documents as ITask[];
};
