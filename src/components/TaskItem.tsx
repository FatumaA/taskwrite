import { useState } from "react";
import Button from "./Button";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { IPayload, ITask } from "../models/interface";
import { deleteDocument, updateDocument } from "../utils/db";
import { getTasks } from "../utils/shared";
import { useNavigate } from "react-router-dom";

interface TaskItemProps {
	task: ITask;
	setTasks?: (tasks: ITask[]) => void;
	isViewTask: boolean;
	handleViewTask?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function TaskItem({
	task,
	setTasks,
	isViewTask = false,
	handleViewTask,
}: TaskItemProps) {
	const navigate = useNavigate();

	const [isDone, setIsDone] = useState(false);

	const updateTasks = async () => {
		try {
			const allTasks = await getTasks();
			if (setTasks) setTasks(allTasks.reverse());
		} catch (error) {
			console.error(error);
		}
	};

	const handleEdit = async (
		e: React.MouseEvent<HTMLButtonElement>,
		currentTask: ITask
	) => {
		e.preventDefault();
		navigate("/", { state: { task: currentTask } });
	};

	const handleDelete = async (
		e: React.MouseEvent<HTMLButtonElement>,
		currentTaskId: string
	) => {
		e.preventDefault();
		e.stopPropagation();
		try {
			await deleteDocument(currentTaskId);
			updateTasks();
		} catch (error) {
			console.error(error);
		}
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

		try {
			await updateDocument(payload, id);
			updateTasks();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div
				className="m-8 cursor-pointer border border-container rounded-md p-4 hover:shadow-lg transition duration-300 ease-in-out max-h-96"
				onClick={handleViewTask}
			>
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
											? "bg-lowPriority text-iconColor"
											: task.priority === "medium"
											? "bg-mediumPriority text-iconColor"
											: "bg-highPriority text-iconColor"
									} py-1 px-2 rounded-md`}
								>
									{task.priority}
								</span>
							</span>
						)}
						<div className="flex gap-2 py-1 ml-auto">
							{!task.done && (
								<Button
									extraBtnClasses="bg-ok"
									content={{ text: "Edit", icon: PencilSquareIcon }}
									iconClasses="hidden lg:flex"
									handleClick={(e) => handleEdit(e, task)}
								/>
							)}

							<Button
								extraBtnClasses="bg-highPriority"
								content={{ text: "Delete", icon: TrashIcon }}
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
							{task.description.length > 70 && !isViewTask
								? task.description.substring(0, 70) + "..."
								: task.description}
						</p>
						<span className="font-extralight mt-2">
							<span className="font-medium">Due on: </span>
							<span className="underline">{`${new Date(
								task.due_date
							).toLocaleDateString()}`}</span>
						</span>
					</section>
					<section className="flex justify-between">
						{task.done ? (
							<span className="items-center text-ok font-bol ml-auto">
								Completed
							</span>
						) : (
							<div className="flex items-center ml-auto hover:scale-105 transition duration-300 ease-in-out">
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
