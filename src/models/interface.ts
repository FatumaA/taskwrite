import { Models } from "appwrite";

export interface IPayload {
	title: string;
	description: string;
	due_date: Date;
	priority?: string;
	done?: boolean;
}

export interface ITask extends Models.Document {
	title: string;
	description: string;
	due_date: Date;
	priority?: string;
	done: boolean;
}
