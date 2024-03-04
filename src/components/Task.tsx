import { useState, useEffect, FormEvent } from "react";
import { readDocuments } from "../db/db";
import { ITask } from "../models/interface";
import TaskItem from "./TaskItem";
import Button from "./Button";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import Dialog from "./Dialog";

const Task = () => {
	const [tasks, setTasks] = useState<ITask[]>([]);
	const [searchedTasks, setSearchedTasks] = useState<ITask[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const getTasks = async () => {
		const { documents } = await readDocuments();
		console.log("ALL TASKS", documents);

		return documents as ITask[];
	};

	const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!searchTerm) {
			setError("No search term entered");
			setTimeout(() => {
				setError("");
			}, 3000);
			return;
		}

		const filteredTasks = tasks.filter(
			(task) =>
				task.title.includes(searchTerm) || task.description.includes(searchTerm)
		);
		if (filteredTasks.length === 0) {
			setError("No task found");
			setTimeout(() => {
				setError("");
			}, 3000);
			return;
		}
		setSearchedTasks(filteredTasks);
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
						<form
							className="flex items-center gap-2 w-1/2"
							onSubmit={handleSubmit}
						>
							<input
								aria-roledescription="search"
								type="text"
								id="search"
								placeholder="search your tasks..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className={`border rounded-md p-2 focus:outline-none focus:ring-1 ${
									error
										? "border-red-600 focus:ring-red-500 invalid:focus:ring-red-600"
										: "border-slate-800 focus:ring-slate-900"
								}`}
							/>
							<button
								className="rounded-md px-2 py-2 hover:scale-105 transition duration-300 ease-in-out bg-pink-700 text-white hover:bg-pink-800 font-medium"
								type="submit"
							>
								Search
							</button>
						</form>
						<span className="text-red-500 font-medium mt-1">{error}</span>
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
					{searchedTasks.length > 0 && (
						<Dialog setSearchedTasks={setSearchedTasks}>
							{searchedTasks.map((task: ITask) => (
								<TaskItem key={task.$id} task={task} />
							))}
						</Dialog>
					)}
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
