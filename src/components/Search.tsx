import { FormEvent, useState } from "react";
import { ITask } from "../models/interface";
import Dialog from "./Dialog";
import TaskItem from "./TaskItem";

interface SearchProps {
	tasks: ITask[];
}

const Search = ({ tasks }: SearchProps) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchedTasks, setSearchedTasks] = useState<ITask[]>([]);
	const [error, setError] = useState("");

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
				setSearchTerm("");
				setError("");
			}, 3000);
			return;
		}
		setSearchedTasks(filteredTasks);
	};
	return (
		<div className="flex flex-col w-full md:w-1/2">
			<form
				className="flex flex-col md:flex-row items-start md:items-center gap-2"
				onSubmit={handleSubmit}
			>
				{searchedTasks.length > 0 && (
					<Dialog setSearchedTasks={setSearchedTasks}>
						{searchedTasks.map((task: ITask) => (
							<TaskItem key={task.$id} task={task} />
						))}
					</Dialog>
				)}
				<input
					aria-roledescription="search"
					type="text"
					id="search"
					placeholder="search your tasks..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className={`w-5/6 border rounded-md p-2 focus:outline-none focus:ring-1 ${
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
	);
};

export default Search;
