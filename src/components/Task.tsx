import { useState, useEffect } from "react";
import { deleteDocument, readDocuments } from "../db/db";
import { Models } from "appwrite";
import { ITask } from "../models/interface";
// import { ArrowDown } from "@appwrite.io/pink-icons";

const Task = () => {
	const [tasks, setTasks] = useState<ITask[]>([]);

	const getTasks = async () => {
		const { documents } = await readDocuments();
		console.log("ALL TASKS", documents);

		return documents as ITask[];
	};

	const handleEdit = () => {
		console.log("Edit");
	};

	const handleDelete = async (currentTaskId: string) => {
		console.log("Delete", currentTaskId);
		const res = await deleteDocument(currentTaskId);
		console.log("DELETE RES", res);
	};

	useEffect(() => {
		getTasks()
			.then((res) => {
				setTasks(res);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);
	return (
		<div>
			{tasks!.map((task: ITask) => {
				return (
					<section key={task.$id}>
						<h2>{task.title}</h2>
						<p>{task.description}</p>
						<span>{task.due_date}</span>
						<button onClick={handleEdit}>Edit</button>
						<button onClick={() => handleDelete(task.$id)}>Delete</button>
					</section>
				);
			})}
		</div>
	);
};

export default Task;
