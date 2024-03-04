import { useState, useEffect } from "react";
import { readDocuments } from "../db/db";
import { ITask } from "../models/interface";
import TaskItem from "./TaskItem";
import Button from "./Button";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import Search from "./Search";

const Task = () => {
	const [tasks, setTasks] = useState<ITask[]>([]);

	const navigate = useNavigate();

	const getTasks = async () => {
		const { documents } = await readDocuments();
		console.log("ALL TASKS", documents);

		return documents as ITask[];
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
			<section className="max-w-7xl mx-auto m-12 p-0 md:p-16">
				<h1 className="text-3xl md:text-6xl font-bold text-center py-3">
					Your Tasks
				</h1>
				<div className="m-8 flex justify-between items-center">
					<div className="flex flex-col">
						<Search tasks={tasks} />
					</div>
					<Button
						bgColor="bg-pink-700 text-white font-medium py-2 hover:bg-pink-800"
						text="Add Task"
						icon={PlusIcon}
						iconClasses="hidden md:flex "
						handleClick={(e) => {
							e.preventDefault();
							navigate("/");
						}}
					/>
				</div>
				<div className="flex flex-col md:flex-row justify-between">
					<div className="flex-1">
						<h3 className="text-2xl font-bold m-8">Pending Tasks</h3>
						{tasks.map((task: ITask) => {
							if (!task.done) {
								return <TaskItem key={task.$id} task={task} />;
							}
						})}
					</div>
					<div className="flex-1">
						<h3 className="text-2xl font-bold m-8">Completed Tasks</h3>
						{tasks.map((task: ITask) => {
							if (task.done === true) {
								return <TaskItem key={task.$id} task={task} />;
							}
						})}
					</div>
				</div>
			</section>
		</main>
	);
};

export default Task;
