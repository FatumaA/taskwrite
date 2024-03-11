//

import { useEffect, useState } from "react";
import AddTask from "../components/AddTask";
import { useLocation, useNavigate } from "react-router-dom";
import { ITask } from "../models/interface";

const Index = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const taskFromState: ITask = location.state?.task;

	const [taskToEdit] = useState<ITask | null>(taskFromState ?? null);

	useEffect(() => {
		if (taskFromState) {
			navigate(location.pathname, {});
		}
	}, [taskFromState, location.pathname, navigate]);

	return (
		<main className="container mx-auto">
			<section className="max-w-5xl mx-auto m-12 p-16">
				<h1 className="text-4xl md:text-7xl font-bold text-center py-3 mb-16">
					AI-enhanced, Voice-enabled, Searchable Task Manager
				</h1>
				<AddTask task={taskToEdit} isEdit={taskToEdit ? true : false} />
			</section>
		</main>
	);
};

export default Index;
