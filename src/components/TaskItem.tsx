import { useState } from "react";
import Button from "./Button";
import {
	PencilSquareIcon,
	TrashIcon,
	XMarkIcon,
} from "@heroicons/react/24/solid";
import { IPayload, ITask } from "../models/interface";
import { deleteDocument, updateDocument } from "../db/db";
import AddTask from "./AddTask";

interface TaskItemProps {
	task: ITask;
}

function TaskItem({ task }: TaskItemProps) {
	const [isEdit, setIsEdit] = useState(false);
	const [selectedTask, setSelectedTask] = useState<ITask>();
	const [isDone, setIsDone] = useState(false);

	const closeModal = () => {
		setIsEdit(!isEdit);
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

	return (
		<>
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
					<AddTask
						key={selectedTask!.$id}
						task={selectedTask!}
						isEdit={true}
						setIsEdit={setIsEdit}
					/>
				</dialog>
			)}
			<div className="m-8 border border-gray-400 rounded-md p-4 hover:shadow-lg transition duration-300 ease-in-out h-full max-h-80 md:max-h-[380px] lg:max-h-72">
				{task.priority && (
					<span className="">
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
					className="flex flex-col md:flex-row justify-between gap-2 my-4"
				>
					<section>
						<h2 className="text-xl font-medium py-2">{task.title}</h2>
						<p className="py-1 flex">
							{task.description.length > 70
								? task.description.substring(0, 70) + "..."
								: task.description}
						</p>

						<span className="font-extralight text-gray-600 flex flex-end">
							<span className="font-medium">Due on: </span>
							<span className="underline">{`${new Date(
								task.due_date
							).toLocaleDateString()}`}</span>
						</span>
					</section>
					<section className="flex flex-row md:flex-col justify-between">
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
						{!task.done && (
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
									checked={isDone}
									className="size-5 accent-pink-600 rounded-sm"
								/>
							</div>
						)}
						{isDone}
						{task.done}
					</section>
				</section>
			</div>
		</>
	);
}

export default TaskItem;
