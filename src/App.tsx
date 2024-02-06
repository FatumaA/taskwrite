import "./App.css";
import AddTask from "./components/AddTask";
import Task from "./components/Task";

function App() {
	return (
		<>
			<h1>Task App</h1>
			<AddTask />
			<hr />
			<Task />
		</>
	);
}

export default App;
