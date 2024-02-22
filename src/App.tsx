import "./index.css";
import AddTask from "./components/AddTask";
import Task from "./components/Task";

function App() {
	return (
		<main className="container mx-auto border border-red-500">
			<section className="max-w-5xl mx-auto m-24 p-16 border border-purple-500">
				<h1 className=" text-6xl text-center py-8">
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
