import { useState, useEffect } from "react";
import { ITask } from "../models/interface";
import TaskItem from "../components/TaskItem";
import Button from "../components/Button";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import Search from "../components/Search";
import Select from "../components/Select";
import { getTasks } from "../utils/shared";
import Navbar from "../components/Navbar";

const Task = () => {
	const [tasks, setTasks] = useState<ITask[]>([]);

	const navigate = useNavigate();

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();

		const pendingTasks = tasks.filter((task) => !task.done);

		switch (e.target.value) {
			case "priority - (low - high)":
				setTasks([
					...tasks.filter((task) => task.done),
					...pendingTasks.sort(
						(a, b) =>
							mapPriorityToValue(a.priority) - mapPriorityToValue(b.priority)
					),
				]);
				break;
			case "priority - (high - low)":
				setTasks([
					...tasks.filter((task) => task.done),
					...pendingTasks.sort(
						(a, b) =>
							mapPriorityToValue(b.priority) - mapPriorityToValue(a.priority)
					),
				]);
				break;
			case "due date - (earliest - latest)":
				setTasks([
					...tasks.filter((task) => task.done),
					...pendingTasks.sort(
						(a, b) =>
							new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
					),
				]);
				break;
			case "due date - (latest - earliest)":
				setTasks([
					...tasks.filter((task) => task.done),
					...pendingTasks.sort(
						(a, b) =>
							new Date(b.due_date).getTime() - new Date(a.due_date).getTime()
					),
				]);
				break;
			default:
				break;
		}
	};

	const mapPriorityToValue = (priority: string | undefined): number => {
		const priorityValues: { [key: string]: number } = {
			low: 0,
			medium: 1,
			high: 2,
		};

		return priorityValues[priority || ""] || 0;
	};

	const selectArray = [
		"priority - (low - high)",
		"priority - (high - low)",
		"due date - (earliest - latest)",
		"due date - (latest - earliest)",
	];

	useEffect(() => {
		getTasks()
			.then((res) => {
				setTasks(res.reverse());
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<>
			<Navbar />
			<main className="container mx-auto">
				<section className="max-w-5xl mx-auto m-12 p-16">
					<h1 className="text-4xl md:text-7xl font-bold text-center py-3 mb-16">
						Your Tasks
					</h1>
					<div className="m-8 flex flex-col-reverse md:flex-row gap-8 items-start md:items-center md:justify-between">
						<Search tasks={tasks} />
						<Button
							extraBtnClasses="bg-pink-700 text-white font-medium py-2 hover:bg-pink-800 ml-auto"
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
							<div className="m-8 flex items-start lg:items-center gap-1 justify-between flex-col lg:flex-row">
								<span className="font-medium">Sort Tasks by: </span>
								<Select
									defaultSelectValue={selectArray[0]}
									handleSelectChange={handleSelectChange}
									selectOptions={selectArray}
								/>
							</div>
							<div>
								{tasks.map((task: ITask) => {
									if (!task.done) {
										return (
											<TaskItem
												key={task.$id}
												task={task}
												setTasks={setTasks}
											/>
										);
									}
								})}
							</div>
						</div>
						<div className="flex-1">
							<h3 className="text-2xl font-bold m-8">Completed Tasks</h3>
							<div>
								{tasks.map((task: ITask) => {
									if (task.done === true) {
										return (
											<TaskItem
												key={task.$id}
												task={task}
												setTasks={setTasks}
											/>
										);
									}
								})}
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default Task;
