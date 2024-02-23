import "./index.css";
import AddTask from "./components/AddTask";
import Task from "./components/Task";

function App() {
	return (
		<main className="container mx-auto">
			<section className="max-w-5xl mx-auto m-12 p-0 md:p-16">
				<h1 className="text-5xl md:text-6xl font-bold text-center py-3">
					Taskwrite - Manage your tasks
				</h1>
				<AddTask task={null} isEdit={false} />
				<hr />
				<Task />
			</section>
		</main>
	);
}

export default App;
