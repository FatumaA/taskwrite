import { useState } from "react";
import Button from "./Button";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { IPayload, ITask } from "../models/interface";
import { deleteDocument, updateDocument } from "../db/db";
import Dialog from "./Dialog";
import AddTask from "./AddTask";
import { getTasks } from "../utils/shared";

interface TaskItemProps {
	task: ITask;
	setTasks: (tasks: ITask[]) => void;
}

function TaskItem({ task, setTasks }: TaskItemProps) {
	const [isEdit, setIsEdit] = useState(false);
	const [selectedTask, setSelectedTask] = useState<ITask>();
	const [isDone, setIsDone] = useState(false);

	const handleEdit = (
		e: React.MouseEvent<HTMLButtonElement>,
		currentTask: ITask
	) => {
		e.preventDefault();
		console.log("Edit", currentTask);
		setIsEdit(true);
		setSelectedTask(currentTask);
	};

	const handleDelete = async (
		e: React.MouseEvent<HTMLButtonElement>,
		currentTaskId: string
	) => {
		e.preventDefault();
		console.log("Delete", currentTaskId);
		const res = await deleteDocument(currentTaskId);
		console.log("DELETE RES", res);
		const allTaks = await getTasks();
		return setTasks(allTaks);
	};

	const handleCheckbox = async (
		currentTask: IPayload,
		id: string,
		checkedVal: boolean
	) => {
		if (!checkedVal) return;

		const payload: IPayload = {
			title: currentTask.title,
			description: currentTask.description,
			due_date: currentTask.due_date,
			priority: currentTask.priority,
			done: checkedVal,
		};

		await updateDocument(payload, id);
		const allTaks = await getTasks();
		return setTasks(allTaks);
	};

	return (
		<>
			{isEdit && (
				<Dialog setIsEdit={setIsEdit} isEdit>
					<AddTask task={selectedTask!} isEdit={true} setIsEdit={setIsEdit} />
				</Dialog>
			)}
			<div className="m-8 border border-gray-400 rounded-md p-4 hover:shadow-lg transition duration-300 ease-in-out max-h-96">
				<section
					key={task.$id}
					className="flex flex-col justify-between gap-2 my-4 h-full"
				>
					<section className="flex gap-4 items-center justify-between flex-wrap">
						{task.priority && (
							<span>
								<span className="font-medium">Priority: </span>
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
						<div className="flex gap-2 py-1 ml-auto">
							{!task.done && (
								<Button
									extraBtnClasses="bg-green-400"
									text="Edit"
									icon={PencilSquareIcon}
									iconClasses="hidden lg:flex"
									handleClick={(e) => handleEdit(e, task)}
								/>
							)}

							<Button
								extraBtnClasses="bg-red-400"
								text="Delete"
								icon={TrashIcon}
								iconClasses="hidden lg:flex"
								handleClick={(e) => handleDelete(e, task.$id)}
							/>
						</div>
					</section>
					<section className="">
						<h2 className="text-xl font-medium py-2 break-words">
							{task.title}
						</h2>
						<p className="py-1 mb-4 min-h-16 break-words">
							{task.description.length > 70
								? task.description.substring(0, 70) + "..."
								: task.description}
						</p>
						<span className="font-extralight text-gray-600 mt-2">
							<span className="font-medium">Due on: </span>
							<span className="underline">{`${new Date(
								task.due_date
							).toLocaleDateString()}`}</span>
						</span>
					</section>
					<section className="flex justify-between">
						{task.done ? (
							<span className="items-center text-green-600 font-bol ml-auto">
								Completed
							</span>
						) : (
							<div className="flex items-center ml-auto">
								<label htmlFor="done" className="mr-2 font-light">
									Mark as complete
								</label>
								<input
									type="checkbox"
									checked={isDone}
									onChange={(e) => {
										setIsDone(e.target.checked);
										handleCheckbox(task, task.$id, e.target.checked);
									}}
									className="size-5 accent-pink-600 rounded-sm"
								/>
							</div>
						)}
					</section>
				</section>
			</div>
		</>
	);
}

export default TaskItem;
