import { useState, useEffect } from "react";
import { deleteDocument, readDocuments, updateDocument } from "../db/db";
import { IPayload, ITask } from "../models/interface";
import AddTask from "./AddTask";
// import { ArrowDown } from "@appwrite.io/pink-icons";

const Task = () => {
	const [tasks, setTasks] = useState<ITask[]>([]);
	const [isEdit, setIsEdit] = useState(false);
	const [selectedTask, setSelectedTask] = useState<ITask>({});
	const [isDone, setIsDone] = useState(false);

	const closeModal = () => {
		setIsEdit(!isEdit);
	};

	const handleCheckbox = async (currentTask: IPayload, id: string) => {
		if (isDone === false) return;

		const payload: IPayload = {
			title: currentTask.title,
			description: currentTask.description,
			due_date: currentTask.due_date,
			done: isDone,
		};

		await updateDocument(payload, id);
	};

	const getTasks = async () => {
		const { documents } = await readDocuments();
		console.log("ALL TASKS", documents);

		return documents as ITask[];
	};

	const handleEdit = (currentTask: ITask) => {
		console.log("Edit", currentTask);
		setIsEdit(true);
		setSelectedTask(currentTask);
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
			{tasks.map((task: ITask) => {
				return (
					<section key={task.$id}>
						<h2>{task.title}</h2>
						<p>{task.description}</p>
						<span>{task.due_date}</span>
						<button onClick={() => handleEdit(task)}>Edit</button>
						<button onClick={() => handleDelete(task.$id)}>Delete</button>
						<label htmlFor="done">Mark as complete</label>
						<input
							type="checkbox"
							onChange={(e) => {
								setIsDone(e.target.checked);
								handleCheckbox(task, task.$id);
							}}
							checked={task.done}
						/>
					</section>
				);
			})}
			{isEdit && (
				<dialog open={true} id="modal">
					<AddTask key={selectedTask.$id} task={selectedTask} isEdit={true} />
					<button onClick={closeModal} id="closeModal">
						Close
					</button>
				</dialog>
			)}
		</div>
	);
};

export default Task;
