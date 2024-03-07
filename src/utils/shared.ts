import { readDocuments } from "./db";
import { ITask } from "../models/interface";

export const getTasks = async () => {
	const { documents } = await readDocuments();

	return documents as ITask[];
};
