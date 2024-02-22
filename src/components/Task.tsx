import { useState, useEffect } from "react";
import { deleteDocument, readDocuments, updateDocument } from "../db/db";
import { IPayload, ITask } from "../models/interface";
import AddTask from "./AddTask";

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
					<section
						key={task.$id}
						className="m-8 border border-gray-400 rounded-md p-4 flex justify-between"
					>
						<section className="w-4/6">
							<h2 className="text-2xl font-medium py-2">{task.title}</h2>
							<p className="py-1 mb-5">{task.description}</p>
							<span className=" font-extralight text-gray-600">{`Due date: ${task.due_date}`}</span>
						</section>
						<section className="flex flex-col justify-between">
							<div className="flex justify-between py-1">
								<button onClick={() => handleEdit(task)} className="py-2">
									Edit
								</button>
								<button onClick={() => handleDelete(task.$id)}>Delete</button>
							</div>
							<div className="flex justify-center items-center">
								<label htmlFor="done" className="mr-2 font-light">
									Mark as complete
								</label>
								<input
									type="checkbox"
									onChange={(e) => {
										setIsDone(e.target.checked);
										handleCheckbox(task, task.$id);
									}}
									checked={task.done}
									className="size-5 accent-pink-600 rounded-sm"
								/>
							</div>
						</section>
					</section>
				);
			})}
			{isEdit && (
				// <AddTask key={selectedTask.$id} task={selectedTask} isEdit={true} />
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
