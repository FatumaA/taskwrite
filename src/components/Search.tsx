import { FormEvent, useState } from "react";
import { ITask } from "../models/interface";
import Dialog from "./Dialog";
import TaskItem from "./TaskItem";
import Button from "./Button";
import { searchTasks } from "../utils/db";

const Search = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const [searchedTasks, setSearchedTasks] = useState<ITask[]>([]);
	const [error, setError] = useState("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!searchTerm) {
			setError("No search term entered");
			setTimeout(() => {
				setError("");
			}, 3000);
			return;
		}

		setIsSearching(true);

		const res = await searchTasks(searchTerm);
		console.log("res search: ", res);
		if (res.length === 0) {
			setIsSearching(false);
			setError("No task found");
			setTimeout(() => {
				setSearchTerm("");
				setError("");
			}, 3000);
			return;
		}
		setIsSearching(false);
		setSearchedTasks(res as ITask[]);
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
							<TaskItem key={task.$id} task={task} isViewTask={true} />
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
					extraBtnClasses="bg-primary text-white hover:bg-primaryHover font-medium text-main py-2"
				>
					<span>{isSearching ? "Searching..." : "Search"}</span>
				</Button>
			</form>
			<span className="text-error font-medium mt-1">{error}</span>
		</div>
	);
};

export default Search;
