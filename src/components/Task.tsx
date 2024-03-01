import { useState, useEffect } from "react";
import { deleteDocument, readDocuments, updateDocument } from "../db/db";
import { IPayload, ITask } from "../models/interface";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import AddTask from "./AddTask";
import Button from "./Button";

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
						className="m-8 border border-gray-400 rounded-md p-4 flex justify-between flex-wrap gap-5 hover:shadow-lg transition duration-300 ease-in-out"
					>
						<section className="">
							<h2 className="text-2xl font-medium py-2">{task.title}</h2>
							<p className="py-1 mb-5">{task.description}</p>
							<span className="font-extralight text-gray-600">
								<span className="font-medium">Due on: </span>
								<span className="underline">{`${new Date(
									task.due_date
								).toLocaleDateString()}`}</span>
							</span>
						</section>
						<section className="flex flex-col justify-between">
							<div className="flex gap-2 py-1">
								<Button
									bgColor="bg-green-400"
									text="Edit"
									icon={PencilSquareIcon}
									iconClasses="hidden md:flex"
									handleClick={() => handleEdit(task)}
								/>
								<Button
									bgColor="bg-red-400"
									text="Delete"
									icon={TrashIcon}
									iconClasses="hidden md:flex"
									handleClick={() => handleDelete(task.$id)}
								/>
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
