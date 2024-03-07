import "./index.css";
import AddTask from "./components/AddTask";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ITask } from "./models/interface";

function App() {
	const location = useLocation();

	const taskFromState: ITask = location.state?.task;

	const [taskToEdit, setTaskToEdit] = useState<ITask | null>();

	useEffect(() => {
		setTaskToEdit(taskFromState);
	}, [taskFromState]);
	return (
		<>
			<Navbar />
			<main className="container mx-auto">
				<section className="max-w-5xl mx-auto m-12 p-16">
					<h1 className="text-4xl md:text-7xl font-bold text-center py-3 mb-16">
						AI-enhanced, Voice-enabled, Searchable Task Manager
					</h1>
					<AddTask
						task={taskToEdit ?? null}
						isEdit={taskToEdit ? true : false}
					/>
				</section>
			</main>
		</>
	);
}

export default App;
