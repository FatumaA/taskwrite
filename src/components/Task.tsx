import { useState, useEffect } from "react";
import { deleteDocument, readDocuments, updateDocument } from "../db/db";
import { IPayload, ITask } from "../models/interface";
import {
	PencilSquareIcon,
	TrashIcon,
	XMarkIcon,
} from "@heroicons/react/24/solid";
import AddTask from "./AddTask";
import Button from "./Button";

const Task = () => {
	const [tasks, setTasks] = useState<ITask[]>([]);
	const [isEdit, setIsEdit] = useState(false);
	const [selectedTask, setSelectedTask] = useState<ITask>();
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
			priority: currentTask.priority,
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
		// return <AddTask key={currentTask.$id} task={currentTask} isEdit={true} />;
		// navigate("/", { state: { isEdit: true, task: selectedTask } });
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
		<main className="container mx-auto">
			{isEdit && (
				<dialog
					open={true}
					id="modal"
					className="p-8 fixed inset-0 backdrop-filter backdrop-blur-md backdrop-brightness-50 w-4/6 border border-gray-400 rounded-md"
				>
					<button
						onClick={closeModal}
						id="closeModal"
						className="flex gap-2 ml-auto font-medium hover:text-red-500"
					>
						<span>Close </span>
						<XMarkIcon height={25} />
					</button>
					<AddTask key={selectedTask!.$id} task={selectedTask!} isEdit={true} />
				</dialog>
			)}
			<section className="max-w-5xl mx-auto m-12 p-0 md:p-16">
				{tasks.map((task: ITask) => {
					return (
						<div className="m-8 border border-gray-400 rounded-md p-4 hover:shadow-lg transition duration-300 ease-in-out">
							{task.priority && (
								<span>
									<span className="font-medium">Task priority: </span>
									<span
										className={`${
											task.priority === "low"
												? "bg-yellow-400"
												: task.priority === "medium"
												? "bg-orange-400"
												: "bg-red-400"
										} py-1 px-2 rounded-md`}
									>
										{task.priority}
									</span>
								</span>
							)}

							<section
								key={task.$id}
								className="flex flex-col md:flex-row justify-between gap-5"
							>
								<section>
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
									<div className="flex items-center">
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
						</div>
					);
				})}
			</section>
		</main>
	);
};

export default Task;
