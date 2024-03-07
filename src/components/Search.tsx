import { FormEvent, useState } from "react";
import { ITask } from "../models/interface";
import Dialog from "./Dialog";
import TaskItem from "./TaskItem";
import Button from "./Button";

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
					className={`bg-inherit w-5/6 border rounded-md p-2 focus:outline-none focus:ring-1 ${
						error
							? "border-error focus:ring-red-500 invalid:focus:ring-red-600"
							: "border-input focus:ring-slate-900"
					}`}
				/>
				<Button
					type="submit"
					content={{ text: "Search" }}
					extraBtnClasses="bg-primary text-white hover:bg-primaryHover font-medium text-main py-2 "
				/>
			</form>
			<span className="text-error font-medium mt-1">{error}</span>
		</div>
	);
};

export default Search;
