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
import Dialog from "../components/Dialog";

const Task = () => {
	const [tasks, setTasks] = useState<ITask[]>([]);
	const [tasksError, setTasksError] = useState("");
	const [isViewTask, setIsViewTask] = useState(false);
	const [selectedTask, setSelectedTask] = useState<ITask>();

	const navigate = useNavigate();

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();

		const doneTasks = tasks.filter((task) => task.done);
		const pendingTasks = tasks.filter((task) => !task.done);

		const mapPriorityToValue = (priority: string | undefined): number => {
			const priorityValues: { [key: string]: number } = {
				low: 0,
				medium: 1,
				high: 2,
			};

			if (!priority || !(priority in priorityValues)) {
				return 0;
			}

			return priorityValues[priority];
		};
		const sortTasksByPriority = (isAscending: boolean) => {
			return pendingTasks.sort((a, b) => {
				const aValue = mapPriorityToValue(a.priority);
				const bValue = mapPriorityToValue(b.priority);
				return isAscending ? aValue - bValue : bValue - aValue;
			});
		};

		const sortTasksByDueDate = (isEarly: boolean) => {
			return pendingTasks.sort((a, b) => {
				const aDate = new Date(a.due_date).getTime();
				const bDate = new Date(b.due_date).getTime();
				return isEarly ? aDate - bDate : bDate - aDate;
			});
		};

		switch (e.target.value) {
			case "priority - (low - high)":
				setTasks([...doneTasks, ...sortTasksByPriority(true)]);
				break;
			case "priority - (high - low)":
				setTasks([...doneTasks, ...sortTasksByPriority(false)]);
				break;
			case "due date - (earliest - latest)":
				setTasks([...doneTasks, ...sortTasksByDueDate(true)]);
				break;
			case "due date - (latest - earliest)":
				setTasks([...doneTasks, ...sortTasksByDueDate(false)]);
				break;
			default:
				break;
		}
	};

	const selectArray = [
		"priority - (low - high)",
		"priority - (high - low)",
		"due date - (earliest - latest)",
		"due date - (latest - earliest)",
	];

	const handleViewTask = (
		e: React.MouseEvent<HTMLDivElement>,
		activeTask: ITask
	) => {
		e.preventDefault();
		console.log("ACTIVE TASK" + activeTask);
		setIsViewTask(true);
		setSelectedTask(activeTask);
	};

	useEffect(() => {
		getTasks()
			.then((res) => {
				setTasks(res.reverse());
			})
			.catch((err) => {
				console.error(err);
				setTasksError("Error fetching tasks, please try again");
			});
	}, []);

	return (
		<>
			<Navbar />
			<main className="container mx-auto">
				<section className="max-w-5xl mx-auto m-12 p-16">
					{isViewTask && selectedTask && (
						<Dialog key={selectedTask.$id} setIsViewTask={setIsViewTask}>
							<TaskItem
								task={selectedTask}
								handleViewTask={(e) => handleViewTask(e, selectedTask!)}
								isViewTask={isViewTask}
							/>
						</Dialog>
					)}
					<h1 className="text-4xl md:text-7xl font-bold text-center py-3 mb-16">
						Your Tasks
					</h1>
					<div className="m-8 flex flex-col-reverse md:flex-row gap-8 items-start md:items-center md:justify-between">
						<Search tasks={tasks} />
						<Button
							extraBtnClasses="bg-primary text-white font-medium py-2 hover:bg-primaryHover ml-auto"
							content={{ text: "Add Task", icon: PlusIcon }}
							iconClasses="hidden md:flex "
							handleClick={(e) => {
								e.preventDefault();
								navigate("/");
							}}
						/>
					</div>
					{tasksError ? (
						<span className="m-8 text-error">{tasksError}</span>
					) : (
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
									{tasks
										.filter((task) => !task.done)
										.map((task) => (
											<TaskItem
												key={task.$id}
												task={task}
												setTasks={setTasks}
												handleViewTask={(e) => handleViewTask(e, task)}
												isViewTask={isViewTask}
											/>
										))}
								</div>
							</div>
							<div className="flex-1">
								<h3 className="text-2xl font-bold m-8">Completed Tasks</h3>
								<div>
									{tasks
										.filter((task) => task.done)
										.map((task) => (
											<TaskItem
												key={task.$id}
												task={task}
												setTasks={setTasks}
												handleViewTask={(e) => handleViewTask(e, task)}
												isViewTask={isViewTask}
											/>
										))}
								</div>
							</div>
						</div>
					)}
				</section>
			</main>
		</>
	);
};

export default Task;
